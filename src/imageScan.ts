// 插图检查。
//
// 目录接口里没有「这章有没有图」的字段（只有 itemId / title / 字数等），
// 图片信息只能从章节正文里看：
// - 漫画章：chapter.content 是个对象，带 picInfos；
// - 文字章内插图：正文 HTML 里有 <img>、data-fanqie-type="image" 或 .picture。
//
// 所以这里按批调 /reader/batch_full/v（getChapters）取正文，只判断不渲染，
// 结果按书缓存在内存里。只在用户点「检查插图」时触发，绝不自动跑。

import { getChapters } from './api/content'
import { getCatalog, getCatalogRaw, webCatalog } from './api/catalog'
import { del, read, write } from './localStorage'
import type { ChapterItem } from './types'

/** 每批取多少章。批量接口按逗号拼 id，40 章实测没顶到长度限制 */
const BATCH_SIZE = 40
/** 同时在飞的批次数。太高容易触发限流（服务端背靠背请求会只回 1 章） */
const CONCURRENCY = 3
/** 单章结果持久化的 key 前缀：fqa:img:<bookId> */
const STORE_PREFIX = 'fqa:img:'

export interface ImageScanProgress {
    done: number
    total: number
    /** 已确认含插图的章节 id */
    hits: string[]
    /** scan=正常扫描，retry=失败重试阶段 */
    phase?: 'scan' | 'retry'
    /** 重试阶段：已完成 / 总需重试 */
    retryDone?: number
    retryTotal?: number
}

export interface ImageScanResult {
    bookId: string
    /** 有插图的章节 id 集合 */
    hits: string[]
    /** 扫了多少章 / 一共多少章 */
    scanned: number
    total: number
    /** 取失败的章节 id（网络/风控/密钥等），不算「无图」 */
    failed: string[]
    /** 付费或锁定、根本没给正文的章节（不是失败） */
    skipped: string[]
    /** 失败原因归类，形如 { 'Invalid content': 12, 'code 1040': 3 } */
    reasons: Record<string, number>
}

/** bookId -> 上次扫描结果，切回详情页时可以直接复用 */
const cache = new Map<string, ImageScanResult>()

/**
 * 持久化：只存结论（哪些章有图、哪些已查），不存正文。
 *
 * 为了省空间，不再逐个存「已检查」的 id，而是存一个连续前缀长度 through
 * （第 0..through-1 章都查过）+ 少量散点 partial（并发/失败拆分造成的空洞，
 * 通常很小）。3000 章的书体积从 ~200KB 降到几十 KB。
 */
interface PersistedScan {
    hits: string[]
    /** 已连续检查过的章节数（按目录顺序的前缀长度） */
    through: number
    /** 前缀之外、单独查过的章节 id */
    partial: string[]
    skipped: string[]
    /** 写入时间，做容量清理时按它淘汰最旧的 */
    t: number
}

/** 最多保留多少本书的检查结果 */
const MAX_BOOKS = 20
/** 记录各书写入时间的索引键（GM 没给 listValues 权限，只能自己维护） */
const INDEX_KEY = 'fqa:img:_index'

/**
 * 读取某本书的检查结论，并还原成「已检查的 id 集合」。
 * 需要 ids 才能把 through / partial 展开成具体章节。
 */
function loadPersisted(bookId: string, ids: string[]): {
    hits: string[]
    checked: Set<string>
    skipped: string[]
    through: number
} {
    const v = read(`${STORE_PREFIX}${bookId}`) as PersistedScan | null
    const through = Number.isInteger(v?.through) ? Math.max(0, Math.min(v!.through, ids.length)) : 0
    const checked = new Set<string>(ids.slice(0, through))
    for (const id of v?.partial ?? []) checked.add(id)
    // 兼容老格式（checked 数组）：读到就当作散点
    for (const id of (v as any)?.checked ?? []) checked.add(id)
    return {
        hits: Array.isArray(v?.hits) ? v.hits : [],
        checked,
        skipped: Array.isArray(v?.skipped) ? v.skipped : [],
        through,
    }
}

/** 更新索引并淘汰最旧的书，避免无限增长 */
function touchIndex(bookId: string): void {
    const now = Date.now()
    const list = ((read(INDEX_KEY) as Array<{ id: string; t: number }> | null) ?? [])
        .filter(x => x && typeof x.id === 'string')
    const next = list.filter(x => x.id !== bookId)
    next.push({ id: bookId, t: now })
    // 按时间倒序保留最近 MAX_BOOKS 本，其余连同数据一起删掉
    next.sort((a, b) => b.t - a.t)
    const keep = next.slice(0, MAX_BOOKS)
    for (const drop of next.slice(MAX_BOOKS)) {
        try {
            del(`${STORE_PREFIX}${drop.id}`)
            cache.delete(drop.id)
        } catch (err) {
            console.warn('[fqa:images] 清理旧缓存失败:', err)
        }
    }
    try {
        write(INDEX_KEY, keep)
    } catch (err) {
        console.warn('[fqa:images] 写入索引失败:', err)
    }
}

/**
 * 保存结论。把「已检查」压成「连续前缀 + 散点」：
 * 从第 0 章开始数到第一个没查过的位置就是 through，之后的零散章进 partial。
 */
function savePersisted(
    bookId: string,
    ids: string[],
    hits: string[],
    checked: Set<string>,
    skipped: string[],
): void {
    let through = 0
    while (through < ids.length && checked.has(ids[through]!)) through += 1
    const partial: string[] = []
    for (let i = through; i < ids.length; i++) {
        const id = ids[i]!
        if (checked.has(id)) partial.push(id)
    }
    try {
        write(`${STORE_PREFIX}${bookId}`, { hits, through, partial, skipped, t: Date.now() } as PersistedScan)
        touchIndex(bookId)
    } catch (err) {
        console.warn('[fqa:images] 写入扫描缓存失败:', err)
    }
}

/** 清空插图检查缓存；传 bookId 只清一本 */
export function clearImageScanCache(bookId?: string): number {
    const list = ((read(INDEX_KEY) as Array<{ id: string; t: number }> | null) ?? []).filter(
        x => x && typeof x.id === 'string',
    )
    const targets = bookId ? list.filter(x => x.id === bookId) : list
    let cleared = 0
    for (const item of targets) {
        try {
            del(`${STORE_PREFIX}${item.id}`)
            cache.delete(item.id)
            cleared += 1
        } catch (err) {
            console.warn('[fqa:images] 删除缓存失败:', err)
        }
    }
    // 传了 bookId 但索引里没有（老数据），也直接试删一次
    if (bookId && cleared === 0) {
        try {
            del(`${STORE_PREFIX}${bookId}`)
            cache.delete(bookId)
            cleared = 1
        } catch { /* 忽略 */ }
    }
    try {
        write(INDEX_KEY, bookId ? list.filter(x => x.id !== bookId) : [])
    } catch { /* 忽略 */ }
    return cleared
}

export function getCachedImageScan(bookId: string): ImageScanResult | undefined {
    return cache.get(bookId)
}

/** 正文里是否包含图片 */
export function chapterHasImage(chapter: any): boolean {
    const content = chapter?.content
    if (!content) return false
    // 漫画章
    if (typeof content === 'object') {
        return Array.isArray(content.picInfos) ? content.picInfos.length > 0 : Boolean(content.picInfos)
    }
    if (typeof content !== 'string') return false
    return /<img[\s>]/i.test(content)
        || /data-fanqie-type\s*=\s*["']?image/i.test(content)
        || /class\s*=\s*["'][^"']*\bpicture\b/i.test(content)
}

function chunk<T>(list: T[], size: number): T[][] {
    const out: T[][] = []
    for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size))
    return out
}

/** 目录里被打上「含插图」标记的元素 */
export const CATALOG_MARK_CLASS = 'fqa-has-image'

/**
 * 从持久化记录里取命中章节。
 *
 * 注意：持久化结构里 `hits` 本身就是完整数组，**不需要**像 through/partial 那样
 * 配合章节 id 展开，所以这里可以直接读，不用先请求目录。
 */
function persistedHits(bookId: string): string[] {
    const v = read(`${STORE_PREFIX}${bookId}`) as PersistedScan | null
    return Array.isArray(v?.hits) ? v.hits.map(String) : []
}

/**
 * 某本书「含插图的章节」。
 *
 * 先看本次会话内存（刚扫完最准），没有再读持久化缓存 —— 这样换页面 / 重开浏览器
 * 之后依然能自动补标记，不必重新检查一遍。
 */
export function getImageHits(bookId: string): string[] {
    return cache.get(bookId)?.hits ?? persistedHits(bookId)
}

/**
 * 把扫描结果标到**详情页**目录上。
 *
 * 详情页目录结构（实测）：
 *   <div class="page-directory-content">
 *     <div class="volume volume_first">第一卷：…共40章</div>
 *     <div class="chapter">
 *       <div class="chapter-item">
 *         <a href="/reader/<itemId>" class="chapter-item-title">第1章 …</a>
 *
 * 章节 id 在 href 里，不需要额外映射。没扫过就什么都不做，绝不自动触发扫描。
 * 幂等：状态没变时不碰 DOM，可以直接在 MutationObserver 里反复调。
 */
export function markCatalogImages(bookId: string, overrideHits?: string[]): void {
    const hits = new Set(overrideHits ?? getImageHits(bookId))
    const links = document.querySelectorAll<HTMLAnchorElement>(
        '.page-directory-content a.chapter-item-title',
    )
    for (const a of links) {
        const id = a.getAttribute('href')?.match(/\/reader\/(\d+)/)?.[1] ?? ''
        const item = a.closest<HTMLElement>('.chapter-item')
        if (!item) continue
        applyMark(item, Boolean(id) && hits.has(id))
    }
}

/**
 * 把扫描结果标到**阅读页**目录弹窗上。
 *
 * 阅读页目录结构（站点 Reader 组件渲染）：
 *   <div class="reader-catalog-chapters">
 *     <div>                                     <- 卷
 *       <div class="chapter-outer-container">
 *         <div class="chapter" data-item-id="…">
 *           <div class="chapter-text">第1章 …</div>
 *
 * 章节行自带 data-item-id，直接按它匹配。被屏蔽的书由 blockedBook.ts 重建目录时
 * 也写同样的 data-item-id，所以两边都能标上。
 */
export function markReaderCatalogImages(bookId: string, overrideHits?: string[]): void {
    const hits = new Set(overrideHits ?? getImageHits(bookId))
    if (hits.size === 0) return
    const rows = document.querySelectorAll<HTMLElement>(
        '.reader-catalog-chapters .chapter[data-item-id]',
    )
    for (const row of rows) {
        const id = row.dataset.itemId ?? ''
        applyMark(row, Boolean(id) && hits.has(id))
    }
}

/** 给单个目录项加/去标记（幂等，没变化就不碰 DOM） */
function applyMark(el: HTMLElement, hit: boolean): void {
    if (hit) {
        if (el.classList.contains(CATALOG_MARK_CLASS)) return
        el.classList.add(CATALOG_MARK_CLASS)
        el.setAttribute('data-fqa-image', '1')
        if (!el.getAttribute('title')) el.setAttribute('title', '本章含插图')
    } else if (el.classList.contains(CATALOG_MARK_CLASS)) {
        el.classList.remove(CATALOG_MARK_CLASS)
        el.removeAttribute('data-fqa-image')
        // 只清掉我们自己写的提示，别误删站点原有的 title
        if (el.getAttribute('title') === '本章含插图') el.removeAttribute('title')
    }
}

/** 当前在标的书（换书时更新） */
let watchedBookId = ''
let catalogObserver: MutationObserver | null = null
let markScheduled = false

/**
 * 两处目录都试着标一遍；互不干扰（各自的选择器在另一页面下匹配不到任何节点）。
 *
 * 先做一次廉价的存在性检查：正文滚动追加时会持续产生 DOM 变更，
 * 没有目录在屏幕上时直接跳过，别让观察者白白跑两个 querySelectorAll。
 */
function applyAllMarks(bookId: string): void {
    if (!document.querySelector('.reader-catalog-chapters, .page-directory-content')) return
    markCatalogImages(bookId)
    markReaderCatalogImages(bookId)
}

/** 目录会晚挂载 / 懒渲染，用 rAF 合并高频 DOM 变更后再标 */
function scheduleMarks(): void {
    if (markScheduled) return
    markScheduled = true
    requestAnimationFrame(() => {
        markScheduled = false
        if (watchedBookId) applyAllMarks(watchedBookId)
    })
}

/**
 * 自动补标记：**只读持久化结论，绝不触发扫描或网络请求**。
 *
 * 详情页目录、阅读页目录弹窗都可以调用。阅读页目录是 unmountOnExit 的
 * （关掉就从 DOM 卸载），且随滚动懒渲染，所以这里常驻一个观察者反复补。
 * 幂等：已经标过的项不会重复写 DOM。
 */
export function watchCatalogMarks(bookId: string): void {
    if (!bookId) return
    watchedBookId = bookId
    applyAllMarks(bookId)
    if (catalogObserver) return
    catalogObserver = new MutationObserver(scheduleMarks)
    catalogObserver.observe(document.documentElement, { childList: true, subtree: true })
}

/**
 * 扫描整本书，找出含插图的章节。
 *
 * @param onProgress 每批结束后回调一次，用于更新按钮上的进度
 */
/** 目录项是否是付费/锁定章（不同接口字段名不一样，都判一下） */
function isLocked(raw: any): boolean {
    if (!raw) return false
    const pay = raw.needPay ?? raw.need_pay
    return Boolean(raw.isChapterLock ?? raw.is_chapter_lock) || Number(pay) > 0
}

/** 收集失败原因归类 */
function noteReason(reasons: Record<string, number>, reason: string): void {
    const key = reason.length > 40 ? `${reason.slice(0, 40)}…` : reason
    reasons[key] = (reasons[key] ?? 0) + 1
}

export async function scanBookImages(
    bookId: string,
    onProgress?: (p: ImageScanProgress) => void,
): Promise<ImageScanResult> {
    const catalog = await getCatalog(bookId)
    const items: ChapterItem[] = catalog?.chapter_list ?? []
    const ids = items.map(it => it.item_id)

    // 付费/锁定章根本不会给正文，先把它们摘出来，别混进「失败」里
    const lockedIds = new Set<string>()
    try {
        let raw = (await getCatalogRaw(bookId))[0] as any[] | null
        if (!raw || raw.length === 0) raw = ((await webCatalog(bookId))[0] as any[]) ?? null
        for (const it of raw ?? []) {
            const id = String(it?.item_id ?? it?.itemId ?? '')
            if (id && isLocked(it)) lockedIds.add(id)
        }
    } catch (err) {
        console.warn('[fqa:images] 读取目录锁定状态失败，按可读处理:', err)
    }

    const skipped: string[] = []
    const scannable: string[] = []
    for (const id of ids) (lockedIds.has(id) ? skipped : scannable).push(id)

    // 已查过的章节直接跳过（追更的书只补新章）
    const persisted = loadPersisted(bookId, ids)
    const checkedBefore = persisted.checked
    const scannableSet = new Set(scannable)
    const hitsBefore = persisted.hits.filter((id: string) => scannableSet.has(id))
    const hitSet = new Set(hitsBefore)
    const todo = scannable.filter(id => !checkedBefore.has(id))

    const hits: string[] = [...hitsBefore]
    let failed: string[] = []
    const reasons: Record<string, number> = {}
    let done = ids.length - todo.length // 跳过 + 已查过的直接算进进度

    // 持久化节流：没必要每批都写
    let saveTimer = 0
    // 已检查集合随扫描累积（前缀之外的就是散点）
    const checkedNow = new Set<string>(checkedBefore)
    const persistSoon = (): void => {
        if (saveTimer) return
        saveTimer = window.setTimeout(() => {
            saveTimer = 0
            savePersisted(bookId, ids, [...hits], checkedNow, skipped)
        }, 500)
    }

    onProgress?.({ done, total: ids.length, hits: [...hits] })

    /** 单批请求；失败时二分重试，避免一个小问题毁掉整批 */
    const fetchGroup = async (group: string[]): Promise<void> => {
        try {
            const map = await getChapters(group, bookId)
            let missing: string[] = []
            for (const id of group) {
                const ch = map[id]
                if (!ch || ch.error) {
                    missing.push(id)
                    continue
                }
                if (chapterHasImage(ch) && !hitSet.has(id)) {
                    hitSet.add(id)
                    hits.push(id)
                }
            }
            if (missing.length && missing.length < group.length && group.length > 1) {
                // 部分缺失：只对缺失的再请求一次
                await fetchGroup(missing)
            } else if (missing.length === group.length) {
                if (group.length > 1) {
                    // 整批都没回来：拆成两半再试（多半是批量上限/限流）
                    const mid = Math.ceil(group.length / 2)
                    await fetchGroup(group.slice(0, mid))
                    await fetchGroup(group.slice(mid))
                } else {
                    failed.push(group[0]!)
                    noteReason(reasons, '接口未返回该章')
                }
            }
        } catch (err) {
            if (group.length > 1) {
                const mid = Math.ceil(group.length / 2)
                await fetchGroup(group.slice(0, mid))
                await fetchGroup(group.slice(mid))
            } else {
                failed.push(group[0]!)
                noteReason(reasons, `整批请求失败：${String(err).slice(0, 30)}`)
            }
        }
    }

    // 并发跑批：CONCURRENCY 个 worker 各自从队列里取，进度按完成章数累计
    const groups = chunk(todo, BATCH_SIZE)
    let nextGroup = 0
    const worker = async (): Promise<void> => {
        for (;;) {
            const idx = nextGroup++
            const group = groups[idx]
            if (!group) return
            await fetchGroup(group)
            for (const id of group) checkedNow.add(id)
            done += group.length
            onProgress?.({ done, total: ids.length, hits: [...hits] })
            if (idx % 3 === 0) markCatalogImages(bookId, hits)
            persistSoon()
        }
    }
    await Promise.all(Array.from({ length: Math.min(CONCURRENCY, groups.length) }, () => worker()))

    // 失败的重试已内置到 fetchGroup（整批失败会二分拆小再试），
    // 这里只需要收尾：补标目录 + 落盘
    if (failed.length) {
        console.warn(
            `[fqa:images] ${failed.length} 章最终未取到：`,
            Object.entries(reasons).map(([r, n]) => `${r}×${n}`).join(', '),
        )
    }
    markCatalogImages(bookId, hits)
    savePersisted(bookId, ids, [...hits], checkedNow, skipped)

    const result: ImageScanResult = {
        bookId,
        hits,
        scanned: done,
        total: ids.length,
        failed,
        skipped,
        reasons,
    }
    cache.set(bookId, result)
    return result
}
