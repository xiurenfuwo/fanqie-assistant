// 段评（段落评论）。
//
// 与书评（src/api/comment.ts）同属一套评论系统，但走两条不同的通道：
//   - 段评列表/概览：/reading/ugc/idea/*，挂在 appBaseUrl 下，走 appGet（免登录）
//   - 段评回复：    /novel/commentapi/reply/list/*，挂在网关根路径，走 appRootPost
//
// 实测要点：
//   - idea/list 一次返回整章「哪些段有评论、各多少条」，key 是段落下标（0 起）。
//   - idea/comment_list 取某段的评论，offset/count 翻页，单页上限 50。
//   - reply/list 的 comment_source 必须是 502，填 501 会被网关判 comment_type invalid；
//     group_id 传章节 item_id，group_type=15（书评那边是 book_id + 1）。
//   - 段评里的图片/表情是评论另行附加的（image_data / image_url），与正文里的
//     系统表情 [名字] 无关，不要混为一谈。

import { appGet, appRootPost } from './app'
import type {
    ParaComment,
    ParaCommentImage,
    ParaCommentListResult,
    ParaCommentReply,
    ParaCommentUser,
    ParaIdeaResult,
    ParaReplyListResult,
} from '../types'

/** idea/comment_list 单页上限，再大服务端也只回 50 */
export const PARA_PAGE_SIZE = 50

/** reply/list 单页条数 */
export const PARA_REPLY_PAGE_SIZE = 10

/** 段评的评论 source。502 = 小说段落评论 */
const SOURCE_PARA = 502

/** 段评的评论类型，固定 1 */
const COMMENT_TYPE = 1

/** group_type=15 表示 group_id 是章节 item_id（书评那边是 1 = book_id） */
const GROUP_TYPE_ITEM = 15

function str(v: unknown): string {
    return typeof v === 'string' ? v : v == null ? '' : String(v)
}

function int(v: unknown): number {
    const n = Number(v)
    return Number.isFinite(n) ? Math.trunc(n) : 0
}

/** 老评论接口的 user_info 是扁平的；回复那套又套了一层 base_info，两种都兼容 */
function parseUser(raw: any): ParaCommentUser {
    const base = raw?.base_info ?? {}
    return {
        user_id: str(raw?.user_id || base.user_id),
        name: str(raw?.user_name || base.user_name),
        avatar: str(raw?.user_avatar || base.user_avatar),
    }
}

/**
 * 评论附带的图。image_data 是主字段（带尺寸/类型），image_url 是 URL 列表，
 * 二者指向同一张图，按去掉 query 的路径去重。
 */
function parseImages(raw: any): ParaCommentImage[] {
    const out: ParaCommentImage[] = []
    const seen = new Set<string>()
    const push = (url: unknown, type: unknown, w: unknown, h: unknown) => {
        const s = str(url)
        if (!s) return
        const key = s.split('?')[0] ?? s
        if (seen.has(key)) return
        seen.add(key)
        out.push({ url: s, width: int(w), height: int(h), emoji: int(type) === 2 })
    }
    if (Array.isArray(raw?.image_data)) {
        for (const d of raw.image_data) {
            push(d?.web_uri || d?.dynamic_url || d?.url, d?.image_type, d?.width, d?.height)
        }
    }
    if (Array.isArray(raw?.image_url)) {
        for (const u of raw.image_url) push(u, 0, 0, 0)
    }
    return out
}

/** idea/comment_list 的评论：扁平结构 */
function parseParaComment(raw: any): ParaComment | null {
    const id = str(raw?.comment_id)
    if (!id) return null
    return {
        id,
        text: str(raw?.text),
        create_time: int(raw?.create_timestamp),
        user: parseUser(raw?.user_info),
        digg_count: int(raw?.digg_count),
        reply_count: int(raw?.reply_count),
        images: parseImages(raw),
    }
}

/** reply/list 的回复：common/Common + content.text + stat 那套 */
function parseReply(raw: any): ParaCommentReply | null {
    const id = str(raw?.reply_id)
    if (!id) return null
    const common = raw?.common ?? raw?.Common ?? {}
    const content = common.content ?? {}
    const toUser = raw?.reply_to_user_info ?? {}
    const toBase = toUser.base_info ?? {}
    return {
        id,
        text: str(content.text),
        create_time: int(common.create_timestamp),
        user: parseUser(common.user_info),
        to_name: str(toUser.user_name || toBase.user_name),
        images: parseImages(content.image_data_list ? { image_data: Object.values(content.image_data_list) } : {}),
    }
}

/**
 * 整章段评概览。
 *
 * @param itemId 章节 id
 * @param bookId 书 id
 * @returns 段落下标 -> 条数；本章没有段评时 counts 为空 Map
 */
export async function getParaIdeaList(itemId: string, bookId: string, itemVersion = '0'): Promise<ParaIdeaResult> {
    const res = await appGet('/ugc/idea/list/v', {
        item_id: itemId,
        book_id: bookId || '0',
        item_version: itemVersion,
    })
    const counts = new Map<number, number>()
    let data: any = null
    try {
        data = res.json()?.data
    } catch {
        // 空响应体（设备被作废）当作「本章无段评」，换设备的逻辑在 appGet 里
    }
    if (!data) return { counts, item_version: '0', total: 0 }

    const ideaData: Record<string, any> = data.idea_data ?? {}
    let total = 0
    for (const [k, v] of Object.entries(ideaData)) {
        const idx = Number(k)
        const count = int(v?.idea_count)
        if (Number.isFinite(idx) && idx >= 0 && count > 0) {
            counts.set(idx, count)
            total += count
        }
    }
    return { counts, item_version: str(data.newest_item_version || '0'), total }
}

/**
 * 某段的段评列表，按点赞降序。
 *
 * @param paraIndex 段落下标（0 起，与正文段落顺序一致）
 * @param offset 已加载条数，翻页时传上一页的 next_offset
 */
export async function getParaComments(
    itemId: string,
    bookId: string,
    paraIndex: number,
    itemVersion: string,
    offset = 0,
    count = PARA_PAGE_SIZE,
): Promise<ParaCommentListResult> {
    const res = await appGet('/ugc/idea/comment_list/v', {
        item_id: itemId,
        book_id: bookId || '0',
        item_version: itemVersion || '0',
        para_index: String(paraIndex),
        offset: String(offset),
        count: String(count),
        sort: '0',
        query_type: '0',
    })
    let data: any = null
    try {
        data = res.json()?.data
    } catch {
        // 同 getParaIdeaList
    }
    const list: any[] = Array.isArray(data?.comments) ? data.comments : []
    const comments = list
        .map(parseParaComment)
        .filter((c: ParaComment | null): c is ParaComment => !!c)
        .sort((a: ParaComment, b: ParaComment) => b.digg_count - a.digg_count)
    return {
        comments,
        has_more: Boolean(data?.has_more),
        next_offset: int(data?.next_offset) || offset + comments.length,
        para_src_content: str(data?.para_src_content),
    }
}

/**
 * 某条段评下的回复。
 *
 * @param commentId 一级评论 id
 * @param cursor 上一页返回的 cursor，首页传 '0'
 */
export async function getParaReplies(
    itemId: string,
    bookId: string,
    commentId: string,
    cursor = '0',
    count = PARA_REPLY_PAGE_SIZE,
): Promise<ParaReplyListResult> {
    if (!commentId) return { replies: [], total: 0, has_more: false, cursor: '' }
    const res = await appRootPost(
        `/novel/commentapi/reply/list/${commentId}/v1`,
        JSON.stringify({
            business_param: { book_id: bookId, need_count: true },
            comment_id: commentId,
            comment_source: SOURCE_PARA,
            comment_type: COMMENT_TYPE,
            count,
            cursor: String(cursor || '0'),
            group_id: itemId,
            group_type: GROUP_TYPE_ITEM,
        }),
    )
    let data: any = null
    try {
        data = res.json()?.data
    } catch {
        // 同 getParaIdeaList
    }
    const list: any[] = Array.isArray(data?.reply_list) ? data.reply_list : []
    const info = data?.comment_list_info ?? {}
    return {
        replies: list.map(parseReply).filter((r: ParaCommentReply | null): r is ParaCommentReply => !!r),
        total: int(info.total),
        has_more: Boolean(info.has_more),
        cursor: str(info.cursor),
    }
}
