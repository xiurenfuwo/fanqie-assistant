// 阅读历史的视图状态。
//
// 数据来自 api/history.ts（APP 通道优先、网页通道兜底），展示结构复用书架的
// BookShelfEntry / multidetail，所以卡片可以直接用 BookCard.vue。
//
// 与书架的差别：
//   - 没有分组、没有 tab，就是一条按最后阅读时间倒序的列表；
//   - APP 通道带分页，滚到底部继续拉；网页通道一次拿全，没有下一页。

import { computed, ref } from 'vue'
import { multidetail } from '../api/bookshelf'
import {
    getMoreReadHistory,
    getReadHistory,
    historyToShelfEntry,
    type HistoryEntry,
} from '../api/history'
import type { BookShelfBookInfo, BookShelfEntry } from '../types'
import { chunk } from '../utils'

/**
 * 一次补全多少本的详情。
 *
 * 抓包里 APP 的 multi-detail 一次带 100 个 book_id，这里对齐它的量级；
 * 历史较深的账号（上百本）因此只需一两次请求。
 */
const DETAIL_BATCH_SIZE = 100

export function useHistory() {
    /** 原始历史（按阅读时间倒序） */
    const history = ref<HistoryEntry[]>([])
    /** 包装成卡片能吃的结构；detail 先为 null，异步补齐 */
    const entries = ref<BookShelfEntry[]>([])

    const loading = ref(false)
    const loadingMore = ref(false)
    const detailLoading = ref(false)
    const error = ref<string | null>(null)
    /** 至少加载过一次，用来区分「还没加载」和「确实没有历史」 */
    const loaded = ref(false)
    /** 数据是否来自 APP 通道（决定要不要翻页） */
    const fromApp = ref(false)
    /** APP 通道的下一页游标；null 表示到底 */
    const nextOffset = ref<number | null>(null)

    let loadToken = 0
    /** 已拿到的详情，重复进入历史页时复用 */
    let detailCache = new Map<string, BookShelfBookInfo>()
    const inflight = new Set<string>()

    const isEmpty = computed(() => loaded.value && !entries.value.length)
    const hasMore = computed(() => nextOffset.value !== null)

    /** 把详情回填到列表上 */
    function applyDetails(details: BookShelfBookInfo[]): void {
        if (!details.length) return
        const byId = new Map(details.map(d => [d.book_id, d]))
        entries.value = entries.value.map(entry => {
            const detail = byId.get(entry.item.book_id)
            return detail ? { ...entry, detail } : entry
        })
    }

    /**
     * 批量补全详情。
     *
     * 由可见卡片触发（滚动到哪拉到哪），和历史列表的加载互不阻塞：
     * 标题、封面没回来之前卡片显示骨架，不会卡住整页。
     */
    async function ensureDetails(targets: BookShelfEntry[] = entries.value): Promise<void> {
        const token = loadToken
        const pending = targets
            .filter(e => !detailCache.has(e.item.book_id) && !inflight.has(e.item.book_id))
            .map(e => e.item)
        if (!pending.length) return

        detailLoading.value = true
        try {
            for (const batch of chunk(pending, DETAIL_BATCH_SIZE)) {
                const ids = batch.map(b => b.book_id)
                ids.forEach(id => inflight.add(id))
                try {
                    const details = await multidetail(batch)
                    if (token !== loadToken) return
                    details.forEach(d => detailCache.set(d.book_id, d))
                    applyDetails(details)
                } catch (err) {
                    console.warn('[fqa:history] 补全书籍详情失败:', err)
                } finally {
                    ids.forEach(id => inflight.delete(id))
                }
            }
        } finally {
            if (token === loadToken) detailLoading.value = false
        }
    }

    /** 把一批历史合并进列表（翻页时按 book_id 去重，保留更新的那条） */
    function mergeEntries(incoming: HistoryEntry[]): void {
        const byId = new Map(history.value.map(h => [h.bookId, h]))
        for (const h of incoming) {
            const prev = byId.get(h.bookId)
            if (!prev || h.readAt > prev.readAt) byId.set(h.bookId, h)
        }
        history.value = [...byId.values()].sort((a, b) => b.readAt - a.readAt)
        entries.value = history.value.map(h =>
            historyToShelfEntry(h, detailCache.get(h.bookId) ?? null)
        )
    }

    /** 重新拉一次历史；force 为真时连详情缓存一起丢弃 */
    async function load(force = false): Promise<void> {
        const token = ++loadToken
        loading.value = true
        error.value = null
        if (force) detailCache = new Map()

        try {
            const result = await getReadHistory()
            if (token !== loadToken) return
            history.value = []
            mergeEntries(result.entries)
            fromApp.value = result.fromApp
            nextOffset.value = result.nextOffset
            loaded.value = true
        } catch (err) {
            if (token !== loadToken) return
            error.value = err instanceof Error ? err.message : '阅读历史加载失败'
            console.warn('[fqa:history] 取阅读历史失败:', err)
        } finally {
            if (token === loadToken) loading.value = false
        }
    }

    /** 翻下一页（只有 APP 通道有） */
    async function loadMore(): Promise<void> {
        const offset = nextOffset.value
        if (offset === null || loadingMore.value || loading.value) return
        const token = loadToken
        loadingMore.value = true
        try {
            const result = await getMoreReadHistory(offset)
            if (token !== loadToken) return
            nextOffset.value = result.nextOffset
            // 服务端可能返回已经拿过的书，merge 里已按 book_id 去重
            mergeEntries(result.entries)
        } catch (err) {
            console.warn('[fqa:history] 翻页失败:', err)
        } finally {
            if (token === loadToken) loadingMore.value = false
        }
    }

    return {
        history,
        entries,
        loading,
        loadingMore,
        detailLoading,
        error,
        loaded,
        isEmpty,
        hasMore,
        fromApp,
        load,
        loadMore,
        ensureDetails,
    }
}
