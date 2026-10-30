// 阅读历史。
//
// 两条通道，按能不能读到登录态自动分级（抓包核对过，包在 temp 里）：
//
//   1. APP 通道（有 sessionid 时优先）
//      GET /reading/bookapi/read_history/list/v
//          ?book_type=0&offset=0&limit=0&query_soft_deleted=false
//          &is_first_load=false&last_min_read_timestamp_ms=0&full_field=false
//        真·历史列表，分页返回 { data_list, next_offset, has_more }，
//        实测一份账号能拉到 1499 条（book_type=0 小说；1 是出版物、2 是漫剧类）。
//
//      GET /reading/bookapi/read_progress/list/v?book_types=0,1&limit=0
//        最近阅读，一次约 100 条，**每条都带章节标题 / 章节序号 / 进度百分比**，
//        有它就不必为了显示「第182章 xxx」去等 multi-detail。
//
//   2. 网页通道（读不到 sessionid 时的兜底）
//      GET /api/reader/book/progress
//        同源、无需签名，书架页本来就在用它。条数不保证完整，但能保证有内容。
//
// 字段语义（抓包实测，两条通道同后端）：
//   · read_timestamp 是**秒**、read_timestamp_ms 是毫秒；
//   · 同一本书可能有多条记录，需要按 book_id 归并；
//   · 响应不保证按时间排序，必须自己排。
//
// 只读实现：清空 / 删除历史属于写操作，本脚本不做。

import { appGet } from './app'
import { fetch } from '../config'
import { getSessionId } from '../utils/cookie'
import type { BookShelfBookInfo, BookShelfEntry, BookShelfItem } from '../types'

export interface HistoryEntry {
    bookId: string
    /** 最后读到的章节；APP 通道拿不到时为空串，交给详情补全 */
    itemId: string
    /** 最后阅读时间，毫秒 */
    readAt: number
    /** 章节标题（read_progress/list 才有） */
    chapterTitle?: string
    /** 章节序号（read_progress/list 才有） */
    chapterOrder?: number
    /** 章节内进度 0~1（read_progress/list 才有） */
    progressRate?: number
    /** 阅读来源，如「猜你喜欢」「书架」 */
    readSource?: string
    /** 数据来自哪条通道，便于排查 */
    source: 'app' | 'web'
}

export interface HistoryResult {
    entries: HistoryEntry[]
    /** APP 通道是否可达（false 表示走了网页兜底） */
    fromApp: boolean
    /**
     * APP 通道的分页游标。网页通道没有分页，恒为 null。
     * 有值说明还能继续往后拉。
     */
    nextOffset: number | null
}

/* ------------------------------ 字段解析 ------------------------------ */

/** 秒 / 毫秒都可能来，统一成毫秒；取不到返回 0 */
function normalizeTimestamp(value: unknown): number {
    const n = Number(value)
    if (!Number.isFinite(n) || n <= 0) return 0
    return n < 1e12 ? n * 1000 : n
}

function str(v: unknown): string {
    return v == null ? '' : String(v)
}

function num(v: unknown): number {
    const n = Number(v)
    return Number.isFinite(n) ? n : 0
}

/* ------------------------------ APP 通道 ------------------------------ */

/** read_history/list 的一条 */
interface AppHistoryRow {
    book_id?: number | string
    book_id_str?: string
    book_type?: number | string
    read_timestamp_ms?: number | string
    read_timestamp?: number | string
    read_source?: string
    is_delete?: boolean
}

/** read_progress/list 的一条 */
interface AppProgressRow {
    book_id?: number | string
    item_id?: number | string
    title?: string
    real_chapter_order?: number | string
    progress_rate?: number | string
    read_timestamp_ms?: number | string
    read_timestamp?: number | string
}

/** 带 sessionid 的请求头；拿不到就返回 null，表示不能走 APP 通道 */
async function appAuthHeaders(): Promise<Record<string, string> | null> {
    const sid = await getSessionId()
    if (!sid.value) {
        // reason 能区分「脚本管理器不支持 / 报错 / 确实没有这条 Cookie」
        console.warn('[fqa:history] 读不到 sessionid，走网页兜底。原因:', sid.reason)
        return null
    }
    return { Cookie: `sessionid=${sid.value}` }
}

/**
 * 取 APP 返回体里的 data。
 *
 * 注意 appGet 返回的是 apiFetch 的响应对象（带 .json()），不是已解析的 JSON ——
 * 其它模块（catalog/book）也都是 `response.json()`。这里两种形态都兼容，
 * 免得调用方各自处理。
 */
function appData(res: any, path: string): any {
    if (!res) return null
    let body: any = res
    if (typeof res.json === 'function') {
        try {
            body = res.json()
        } catch (err) {
            console.warn(`[fqa:history] ${path} 响应不是合法 JSON:`, err)
            return null
        }
    }
    if (!body) return null
    if (body.code !== undefined && body.code !== 0) {
        console.warn(`[fqa:history] ${path} 返回错误码:`, body.code, body.message)
        return null
    }
    const data = body.data ?? null
    if (data === null) console.warn(`[fqa:history] ${path} 没有 data 字段`)
    return data
}

/**
 * 拉一页 APP 历史。
 *
 * @param offset 上一页返回的 next_offset；首页传 0
 * @param bookType 0=小说 1=出版物 2=漫剧类，默认只拉小说（与 APP 首页一致）
 */
async function fetchAppHistoryPage(
    offset: number,
    bookType = 0,
): Promise<{ rows: AppHistoryRow[]; nextOffset: number | null } | null> {
    const headers = await appAuthHeaders()
    if (!headers) return null
    try {
        const res = await appGet(
            '/bookapi/read_history/list/v',
            {
                book_type: String(bookType),
                offset: String(offset),
                limit: '0',
                query_soft_deleted: 'false',
                is_first_load: 'false',
                last_min_read_timestamp_ms: '0',
                full_field: 'false',
            },
            headers,
        )
        const data = appData(res, 'read_history/list')
        if (!data) return null
        const rows: AppHistoryRow[] = Array.isArray(data.data_list) ? data.data_list : []
        const next = num(data.next_offset)
        return {
            rows,
            // has_more 为假时不再给游标，调用方据此停止翻页
            nextOffset: data.has_more ? next : null,
        }
    } catch (err) {
        console.warn('[fqa:history] APP 历史接口失败，回落到网页通道:', err)
        return null
    }
}

/** 拉最近阅读（带章节标题 / 序号 / 进度），失败返回空数组 */
async function fetchAppProgress(): Promise<Map<string, AppProgressRow>> {
    const out = new Map<string, AppProgressRow>()
    const headers = await appAuthHeaders()
    if (!headers) return out
    try {
        const res = await appGet(
            '/bookapi/read_progress/list/v',
            { book_types: '0,1', limit: '0' },
            headers,
        )
        const data = appData(res, 'read_progress/list')
        const rows: AppProgressRow[] = Array.isArray(data) ? data : []
        for (const row of rows) {
            const id = str(row?.book_id)
            if (id) out.set(id, row)
        }
    } catch (err) {
        console.warn('[fqa:history] APP 最近阅读接口失败（不影响列表）:', err)
    }
    return out
}

/** 把 APP 的两份数据合成 HistoryEntry[] */
function mergeAppRows(history: AppHistoryRow[], progress: Map<string, AppProgressRow>): HistoryEntry[] {
    const byBook = new Map<string, HistoryEntry>()
    for (const row of history) {
        const bookId = str(row.book_id_str) || str(row.book_id)
        if (!bookId) continue
        // 软删除的记录不展示
        if (row.is_delete) continue

        const p = progress.get(bookId)
        const entry: HistoryEntry = {
            bookId,
            itemId: str(p?.item_id),
            readAt: normalizeTimestamp(row.read_timestamp_ms ?? row.read_timestamp),
            chapterTitle: p?.title || undefined,
            chapterOrder: p ? num(p.real_chapter_order) || undefined : undefined,
            progressRate: p ? num(p.progress_rate) || undefined : undefined,
            readSource: row.read_source || undefined,
            source: 'app',
        }
        // 同一本书可能有多条，保留最后一次
        const prev = byBook.get(bookId)
        if (!prev || entry.readAt > prev.readAt) byBook.set(bookId, entry)
    }
    return [...byBook.values()].sort((a, b) => b.readAt - a.readAt)
}

/* ------------------------------ 网页通道 ------------------------------ */

interface WebProgressRow {
    book_id?: number | string
    item_id?: number | string
    read_timestamp?: number | string
    read_timestamp_ms?: number | string
}

async function fetchWebHistory(): Promise<HistoryEntry[]> {
    const res = await fetch('https://fanqienovel.com/api/reader/book/progress', {
        credentials: 'include',
    })
    if (!res.ok) throw new Error(`阅读历史请求失败(HTTP ${res.status})`)
    const json = await res.json().catch(() => null)
    const list: WebProgressRow[] = Array.isArray(json?.data) ? json.data : []

    const byBook = new Map<string, HistoryEntry>()
    for (const row of list) {
        const bookId = str(row?.book_id)
        const itemId = str(row?.item_id)
        // 没有读到具体章节的不算历史（进度 0 的记录对用户没意义）
        if (!bookId || !itemId || itemId === '0') continue

        const entry: HistoryEntry = {
            bookId,
            itemId,
            readAt: normalizeTimestamp(row?.read_timestamp_ms ?? row?.read_timestamp),
            source: 'web',
        }
        const prev = byBook.get(bookId)
        if (!prev || entry.readAt > prev.readAt) byBook.set(bookId, entry)
    }
    return [...byBook.values()].sort((a, b) => b.readAt - a.readAt)
}

/* ------------------------------ 对外接口 ------------------------------ */

/**
 * 拉取阅读历史（第一页）。
 *
 * 有 sessionid 走 APP 通道（完整、带章节信息），否则回落到网页通道。
 * APP 通道失败（签名 / 设备 / 网络）也会自动回落，不会让历史页空掉。
 */
export async function getReadHistory(): Promise<HistoryResult> {
    // 两条 APP 请求并行：列表 + 最近阅读（后者只用来补章节信息）
    const page = await fetchAppHistoryPage(0)
    if (page && page.rows.length) {
        const progress = await fetchAppProgress()
        return {
            entries: mergeAppRows(page.rows, progress),
            fromApp: true,
            nextOffset: page.nextOffset,
        }
    }

    const entries = await fetchWebHistory()
    return { entries, fromApp: false, nextOffset: null }
}

/**
 * 继续翻页（只有 APP 通道有）。
 *
 * 网页通道没有分页语义，返回空数组表示到底了。
 */
export async function getMoreReadHistory(offset: number): Promise<HistoryResult> {
    const page = await fetchAppHistoryPage(offset)
    if (!page) return { entries: [], fromApp: false, nextOffset: null }
    const progress = await fetchAppProgress()
    return {
        entries: mergeAppRows(page.rows, progress),
        fromApp: true,
        nextOffset: page.nextOffset,
    }
}

/* ------------------------------ 卡片适配 ------------------------------ */

/**
 * 历史条目 -> 书架条目的形状。
 *
 * 卡片（BookCard.vue）吃的是 BookShelfEntry，所以历史也包装成同样的结构：
 * `detail` 由调用方用 multidetail 批量补齐，补齐前为 null（卡片显示骨架）。
 */
function toShelfItem(h: HistoryEntry): BookShelfItem {
    return {
        book_id: h.bookId,
        // 历史没有「加入书架时间」，用阅读时间占位
        last_operate_time: h.readAt,
        add_shelf_time: 0,
        last_read_timestamp: h.readAt,
        last_read_chapter_id: h.itemId,
        is_publish: false,
    }
}

export function historyToShelfEntry(
    h: HistoryEntry,
    detail: BookShelfBookInfo | null = null,
): BookShelfEntry {
    return {
        item: toShelfItem(h),
        detail,
        // 带上历史自带的章节信息：卡片不必等详情回来就能显示进度
        historyChapterOrder: h.chapterOrder,
        historyProgressRate: h.progressRate,
        historyChapterTitle: h.chapterTitle,
    }
}

/** 网页通道下没有章节 id 时，指向详情页而不是阅读页 */
export function historyReaderTarget(h: HistoryEntry): 'reader' | 'page' {
    return h.itemId && h.itemId !== '0' ? 'reader' : 'page'
}
