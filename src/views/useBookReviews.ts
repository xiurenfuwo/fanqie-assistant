// 书评列表的状态与动作。
//
// 接口层在 api/comment.ts（已经写全，只是一直没有界面）。这里只负责：
//   - 首页 / 翻页 / 换排序 / 换标签；
//   - 楼中楼：展开一级回复，再展开二级回复；
//   - 点赞、点踩、打分 / 写书评；
//   - 把「未登录」这类业务错误转成一句能显示的话。
//
// 列表接口的语义要点（见 api/comment.ts 顶部注释）：
//   - 登录后「自己写的那条」不在 data_list 里，而是 extra.user_comment，
//     所以列表条数会比 total 少 1，不是分页错误；
//   - user_digg 只有带 sessionid 才准，未授权 GM_cookie 时恒为 false。

import { computed, ref } from 'vue'
import {
    getComments,
    getReplies,
    getSubReplies,
    submitReview,
    toggleLike,
    toggleDislike,
    NotLoggedInError,
    scoreToStars,
    starToScore,
    MAX_REVIEW_STARS,
    MIN_REVIEW_STARS,
} from '../api/comment'
import type { BookComment, CommentFilterTag, CommentReply, CommentSort } from '../types'

/** 一级回复的状态（按书评 id 存） */
export interface ReplyState {
    loaded: boolean
    loading: boolean
    error: string | null
    replies: CommentReply[]
    cursor: string
    hasMore: boolean
    total: number
}

function emptyReplyState(): ReplyState {
    return { loaded: false, loading: false, error: null, replies: [], cursor: '', hasMore: false, total: 0 }
}

/** 把异常翻成一句人话；未登录单独给提示 */
function describeError(err: unknown): string {
    if (err instanceof NotLoggedInError) return '需要登录后才能操作（未登录或未授权读取 Cookie）'
    if (err instanceof Error && err.message) return err.message
    return '操作失败，请稍后重试'
}

export function useBookReviews(bookId: string) {
    /* ------------------------------ 列表 ------------------------------ */

    const comments = ref<BookComment[]>([])
    const tags = ref<CommentFilterTag[]>([])
    const scoreText = ref('')
    const scoreCount = ref(0)
    const total = ref(0)
    const cursor = ref('')
    const hasMore = ref(false)
    const sort = ref<CommentSort>(1)
    const tagId = ref('')

    const loading = ref(false)
    const loadingMore = ref(false)
    const error = ref<string | null>(null)
    /** 至少请求过一次，用来区分「空列表」和「还没加载」 */
    const loaded = ref(false)

    /** 登录用户自己那条（含评分），接口单独下发 */
    const userComment = ref<BookComment | null>(null)

    /** 并发保护：换排序 / 换标签时丢弃过期响应 */
    let token = 0

    const stars = computed(() => scoreToStars(userComment.value?.score ?? 0))

    async function load(reset = true): Promise<void> {
        const my = ++token
        if (reset) {
            loading.value = true
            error.value = null
        } else {
            loadingMore.value = true
        }
        try {
            const r = await getComments(bookId, {
                sort: sort.value,
                cursor: reset ? undefined : cursor.value,
                tagId: tagId.value || undefined,
            })
            if (my !== token) return
            comments.value = reset ? r.comments : [...comments.value, ...r.comments]
            tags.value = r.tags.length ? r.tags : tags.value
            scoreText.value = r.score_text || scoreText.value
            scoreCount.value = r.score_count || scoreCount.value
            total.value = r.total
            cursor.value = r.cursor
            hasMore.value = r.has_more
            userComment.value = r.user_comment
            loaded.value = true
        } catch (err) {
            if (my !== token) return
            error.value = describeError(err)
            console.warn('[fqa:review] 取书评失败:', err)
        } finally {
            if (my === token) {
                loading.value = false
                loadingMore.value = false
            }
        }
    }

    function setSort(next: CommentSort): void {
        if (sort.value === next) return
        sort.value = next
        void load(true)
    }

    function setTag(next: string): void {
        if (tagId.value === next) return
        tagId.value = next
        void load(true)
    }

    /* ------------------------------ 回复 ------------------------------ */

    const replyStates = ref<Record<string, ReplyState>>({})

    function stateOf(commentId: string): ReplyState {
        if (!replyStates.value[commentId]) replyStates.value[commentId] = emptyReplyState()
        return replyStates.value[commentId]!
    }

    /** 展开 / 收起一级回复 */
    async function toggleReplies(commentId: string): Promise<void> {
        const st = stateOf(commentId)
        if (st.loaded) {
            st.loaded = false
            return
        }
        st.loading = true
        st.error = null
        try {
            const r = await getReplies(bookId, commentId)
            st.replies = r.replies
            st.cursor = r.cursor
            st.hasMore = r.has_more
            st.total = r.total
            st.loaded = true
        } catch (err) {
            st.error = describeError(err)
        } finally {
            st.loading = false
        }
    }

    async function loadMoreReplies(commentId: string): Promise<void> {
        const st = stateOf(commentId)
        if (!st.hasMore || st.loading) return
        st.loading = true
        try {
            const r = await getReplies(bookId, commentId, { cursor: st.cursor })
            st.replies = [...st.replies, ...r.replies]
            st.cursor = r.cursor
            st.hasMore = r.has_more
        } catch (err) {
            st.error = describeError(err)
        } finally {
            st.loading = false
        }
    }

    /** 展开某条回复下的二级回复 */
    async function expandSubReplies(reply: CommentReply): Promise<void> {
        if (reply.sub.length) {
            reply.sub = []
            return
        }
        // 二级回复接口要求一条已知子回复 id 作 ref_reply_id；手上没有就退回
        // getReplies 打这条回复的 id（source 501 同样能列出子回复）
        const refId = reply.sub[0]?.id ?? reply.to_reply_id ?? ''
        try {
            const r = refId
                ? await getSubReplies(bookId, reply.id, refId)
                : await getReplies(bookId, reply.id)
            reply.sub = r.replies
        } catch (err) {
            console.warn('[fqa:review] 取二级回复失败:', err)
        }
    }

    /* ------------------------------ 互动 ------------------------------ */

    /** 点赞 / 取消赞。失败时回滚并给出提示 */
    async function like(comment: BookComment): Promise<void> {
        const before = comment.digg_count
        const wasLiked = comment.user_digg
        comment.user_digg = !wasLiked
        comment.digg_count = before + (wasLiked ? -1 : 1)
        try {
            await toggleLike(comment.id, wasLiked)
        } catch (err) {
            comment.user_digg = wasLiked
            comment.digg_count = before
            actionError.value = describeError(err)
        }
    }

    /** 点踩 / 取消踩 */
    async function dislike(comment: BookComment): Promise<void> {
        const was = comment.user_disagree
        comment.user_disagree = !was
        try {
            await toggleDislike(comment.id, was)
        } catch (err) {
            comment.user_disagree = was
            actionError.value = describeError(err)
        }
    }

    /** 打分 / 发书评的即时提示 */
    const actionError = ref<string | null>(null)
    const submitting = ref(false)
    const submitOk = ref(false)

    /**
     * 打分 / 写书评。text 为空就是只打分。
     * 成功后把服务端回存的这条直接放进 userComment，立刻回显。
     */
    async function submit(inputStars: number, text: string): Promise<boolean> {
        const clamped = Math.max(MIN_REVIEW_STARS, Math.min(MAX_REVIEW_STARS, inputStars))
        submitting.value = true
        actionError.value = null
        submitOk.value = false
        try {
            const saved = await submitReview(bookId, {
                score: starToScore(clamped),
                text: text.trim(),
            })
            if (saved) userComment.value = saved
            submitOk.value = true
            // 刷新一次列表，让新书评出现在「最热 / 最新」里
            void load(true)
            return true
        } catch (err) {
            actionError.value = describeError(err)
            return false
        } finally {
            submitting.value = false
        }
    }

    return {
        // 列表
        comments,
        tags,
        scoreText,
        scoreCount,
        total,
        hasMore,
        sort,
        tagId,
        loading,
        loadingMore,
        error,
        loaded,
        load,
        loadMore: () => load(false),
        setSort,
        setTag,
        // 我的
        userComment,
        stars,
        // 回复
        replyStates,
        stateOf,
        toggleReplies,
        loadMoreReplies,
        expandSubReplies,
        // 互动
        like,
        dislike,
        actionError,
        submitting,
        submitOk,
        submit,
    }
}
