import type { Book } from '../types'
import { fetch as pageFetch } from '../config'
import { decryptText } from '../fontDecrypt'
import { appGet } from './app'
import { getCatalog } from './catalog'
import moment from 'moment'

export function mappingCreationStatus(status: string): string {
    switch (status) {
        case '0':
            return '完结'
        case '1':
            return '连载'
        case '4':
            return '断更'
        default:
            return '未知'
    }
}

/**
 * 书籍详情，对应 APP 的 /bookapi/detail/v。
 * 响应字段与红烛接口一致，签名通用。
 */
export async function getBookInfoRaw(bookId: string): Promise<any> {
    const response = await appGet('/bookapi/detail/v', { book_id: bookId })
    const j: any = response.json()
    console.log('Book Info:', j)
    return j.data
}

/**
 * 作者头像：接口各版本字段不统一，按常见几个位置挨个找。
 * 都取不到就返回 undefined，详情页那边会跳过 <img>（整块仍然居中）。
 */
function pickAvatar(bookInfo: any): string | undefined {
    const candidates = [
        bookInfo?.author_info?.user_avatar,
        bookInfo?.author_info?.expand_user_avatar,
        bookInfo?.author_avatar,
        bookInfo?.author_avatar_uri,
        bookInfo?.authorAvatar,
        bookInfo?.author_info?.avatar,
        bookInfo?.author_info?.avatar_uri,
        bookInfo?.author_info?.avatar_url,
    ]
    for (const v of candidates) {
        if (typeof v === 'string' && v.trim()) {
            return v.startsWith('//') ? `https:${v}` : v
        }
    }
    return undefined
}

/**
 * 作者 id。
 *
 * 详情接口的 originalAuthors 是**字符串化的 JSON 数组**，形如
 *   [{"AuthorId":7636702241730090265,"AuthorName":"我想下海"}]
 * 站点目录弹窗点作者名时用的就是其中的 authorId。
 * 兜底几个位置：creator_id / author_id，最后退回 author_info。
 */
/**
 * 作者 id。
 *
 * 详情接口的 originalAuthors / original_authors 是**字符串化的 JSON 数组**，形如
 *   [{"AuthorId":7256823375866107172,"AuthorName":"雾山忘白"}]
 *
 * 注意里面的 AuthorId 是 19 位数字。直接 JSON.parse 会变成 JS number，
 * 超过 2^53 就丢精度（实测 7256823375866107172 会被读成 …107000），
 * 所以这里用正则从原文里抠数字字符串，不经过数值转换。
 *
 * 兜底顺序：author_info.user_id（形如 "2_7256823375866107172"）→ creator_id → author_id。
 */
export function pickAuthorId(bookInfo: any): string | undefined {
    const raw = bookInfo?.originalAuthors ?? bookInfo?.original_authors
    if (typeof raw === 'string' && raw.includes('[')) {
        const m = /"AuthorId"\s*:\s*"?(\d+)"?/i.exec(raw)
        if (m?.[1]) return m[1]
    }
    const candidates = [
        bookInfo?.author_info?.user_id,
        bookInfo?.creator_id,
        bookInfo?.author_id,
        bookInfo?.author_info?.author_id,
    ]
    for (const v of candidates) {
        if (v != null && String(v).trim()) return String(v).trim()
    }
    return undefined
}

/**
 * 作者简介。详情页作者名下面那行灰字，站点取自 page.description；
 * App 接口里常见的是 author_desc / description / author_info.description。
 * 取不到就返回空串，兜底页会渲染一个空的 .author-desc（站点结构本来就有这一行）。
 */
function pickAuthorDesc(bookInfo: any): string {
    const candidates = [
        bookInfo?.author_info?.description,
        bookInfo?.author_info?.desc,
        bookInfo?.author_desc,
        bookInfo?.author_description,
        bookInfo?.description,
    ]
    for (const v of candidates) {
        if (typeof v === 'string' && v.trim()) return v.trim()
    }
    return ''
}

/**
 * 平台给作者资料填的默认简介，不是作者本人写的内容。
 *
 * 实测：详情接口 author_info.description 对很多作者都是这一句，
 * 而作者主页里显示的是作者自己填的（例：「企鹅1076305461，感谢支持。」）。
 */
const DEFAULT_AUTHOR_DESC = '关注我，掌握书籍最新动态'

/** 这个简介是不是平台的默认话术 */
export function isDefaultAuthorDesc(text?: string): boolean {
    return (text ?? '').trim() === DEFAULT_AUTHOR_DESC
}

/** author-page 抓取结果缓存：同一作者只抓一次 */
const authorBioCache = new Map<string, string>()

/**
 * 作者真正的自我介绍。
 *
 * 详情接口里没有这个字段（author_info.description 是平台默认话术），
 * 作者主页的数据是服务端渲染进 `__INITIAL_STATE__.author.userInfo` 的，
 * 客户端没有独立的 JSON 接口，所以这里直接取作者主页 HTML 再解析。
 *
 * 只在兜底详情页调用，正常详情页由站点自己渲染，不必多这一次请求。
 */
export async function getAuthorBioFromHomepage(
    authorUid: string,
    authorId: string,
): Promise<string | undefined> {
    const aid = authorId.trim()
    if (!aid) return undefined
    const uid = authorUid.trim()
    const key = `${uid}-${aid}`
    if (authorBioCache.has(key)) return authorBioCache.get(key)

    const path = uid ? `/author-page/${uid}-${aid}` : `/author-page/${aid}`
    try {
        const res = await pageFetch(path, { credentials: 'same-origin' })
        if (!res.ok) return undefined
        const html = await res.text()
        const raw = extractAuthorBio(html)
        if (raw === undefined) return undefined
        const bio = decodeAuthorBio(html, raw)
        authorBioCache.set(key, bio)
        return bio
    } catch (err) {
        console.warn('[fqa:author] 读取作者主页失败:', err)
        return undefined
    }
}

/**
 * 作者简介是**字体混淆**过的文本（私有区码点），需要按页面字体还原。
 *
 * 作者主页的简介节点是 `<div class="desc font-XXXXXXXX">…</div>`，
 * 字体 id 就从它自己的 class 上取，再交给通用的 decryptText（码表在 fontDecrypt.ts）。
 * 取不到字体 class 说明这段没混淆，原样返回。
 */
function decodeAuthorBio(html: string, raw: string): string {
    const fontId = /class="desc[^"]*\bfont-([A-Za-z0-9]+)\b/.exec(html)?.[1]
    if (!fontId) return raw
    const decoded = decryptText(raw, fontId)
    if (decoded === raw) {
        console.warn('[fqa:author] 作者简介疑似未知字体，未能还原:', fontId)
    }
    return decoded
}

/** 从作者主页 HTML 里抠出 userInfo.description */
function extractAuthorBio(html: string): string | undefined {
    const marker = /"userInfo"\s*:\s*\{/.exec(html)
    const brace = marker ? html.indexOf('{', marker.index) : -1
    if (brace >= 0) {
        const raw = sliceObject(html, brace)
        if (raw) {
            try {
                const info = JSON.parse(raw) as { description?: unknown }
                if (typeof info.description === 'string') return info.description.trim()
            } catch {
                /* 整段不是合法 JSON（可能含 undefined），退到下面的正则 */
            }
            const m = /"description"\s*:\s*("(?:[^"\\]|\\.)*")/.exec(raw)
            if (m?.[1]) {
                try {
                    return (JSON.parse(m[1]) as string).trim()
                } catch {
                    /* 忽略 */
                }
            }
        }
    }
    return undefined
}

/**
 * 从 start（指向 '{'）开始截出一个完整的对象字面量。
 *
 * 手写而不是正则：简介里可能出现 `}`、`"`，必须按字符串边界和括号深度判断。
 */
function sliceObject(text: string, start: number): string | null {
    let depth = 0
    let inStr = false
    let esc = false
    for (let i = start; i < text.length; i++) {
        const ch = text[i]
        if (inStr) {
            if (esc) esc = false
            else if (ch === '\\') esc = true
            else if (ch === '"') inStr = false
            continue
        }
        if (ch === '"') inStr = true
        else if (ch === '{') depth += 1
        else if (ch === '}') {
            depth -= 1
            if (depth === 0) return text.slice(start, i + 1)
        }
    }
    return null
}

/**
 * 作者主页链接的前缀。
 *
 * 站点详情页用的是 page.authorId（网页端体系的作者 id，实测是 15 位：
 * 902012776743528），与 originalAuthors 里的 AuthorId（19 位）**不是一个值**。
 * 兜底页拿不到页面状态，用 App 接口的 author_info.user_id（16 位：
 * 1477356206951575）代替，它是这一组里唯一形态接近「网页端用户 id」的字段。
 * 不要用 bind_author_ids / original_authors.AuthorId，那两个是 19 位的另一套 id。
 *
 * 接口偶尔会下发 "2_xxxx" 这种带平台前缀的形态，只取数字部分。
 */
function pickAuthorUid(bookInfo: any): string | undefined {
    const raw = bookInfo?.author_info?.user_id ?? bookInfo?.creator_id
    if (raw == null) return undefined
    const s = String(raw).trim()
    if (!s) return undefined
    const digits = s.split('_').pop() ?? s
    return digits.trim() || undefined
}

export async function multiDetailRaw() {}
export async function getBookInfo(bookId: string): Promise<Book> {
    const bookInfo = await getBookInfoRaw(bookId)
    if (!bookInfo) {
        throw new Error('Book not found')
    }
    return {
        book_id: bookInfo.book_id,
        title: bookInfo.book_name || bookInfo.original_book_name,
        author: bookInfo.author,
        // 作者头像字段各版本接口不统一，挨个试，取到就用
        author_avatar: pickAvatar(bookInfo),
        // 作者 id（保留在数据里，站点目录弹窗等地方可能用得到；详情页作者栏不挂链接）
        author_id: pickAuthorId(bookInfo),
        // 作者主页链接的前缀（站点是 page.authorId，App 接口对应 author_info.user_id）
        author_uid: pickAuthorUid(bookInfo),
        // 作者名下面那行简介（站点是 page.description）
        author_desc: pickAuthorDesc(bookInfo),
        cover_url: bookInfo.thumb_url,
        summary: bookInfo.abstract,
        // volume_list: bookInfo.volume_list,
        update_time: moment(bookInfo.last_chapter_first_pass_time * 1000).format('YYYY-MM-DD HH:mm:ss'),
        status: mappingCreationStatus(bookInfo.creation_status),
        // 详情页的灰色分类标签：category / category_v2 形态不稳定，统一归一化
        category: normalizeCategories([bookInfo.category, bookInfo.category_v2]).join(','),
        // chapter_count: bookInfo.chapter_count,
    } as Book
}

/**
 * 分类标签归一化。
 *
 * 接口下发的 category / category_v2 形态不稳定：可能是字符串、逗号串，
 * 也可能是「字符串化的对象数组」，元素形如
 *   {ObjectId:1014, Dim:10, Name:"都市高武", ExternalDesc:"…", Gender:1, …}
 * 这里统一抽成纯名字数组。
 */
export function normalizeCategories(raw: unknown): string[] {
    const out: string[] = []
    const walk = (v: unknown): void => {
        if (v == null) return
        if (typeof v === 'string') {
            const s = v.trim()
            if (!s) return
            // 字符串化的 JSON：再解析一层
            if (s.startsWith('[') || s.startsWith('{')) {
                try {
                    walk(JSON.parse(s))
                    return
                } catch {
                    /* 不是 JSON，按普通逗号串处理 */
                }
            }
            for (const part of s.split(/[,，]/)) {
                const t = part.trim()
                if (t) out.push(t)
            }
            return
        }
        if (Array.isArray(v)) {
            v.forEach(walk)
            return
        }
        if (typeof v === 'object') {
            const name = (v as any).Name ?? (v as any).name
            if (typeof name === 'string' && name.trim()) out.push(name.trim())
        }
    }
    walk(raw)
    // 去重 + 最多 6 个（和站点那排标签数量相当）
    return [...new Set(out)].slice(0, 6)
}

export async function getBookInfoAndCatalog(book: Book | string): Promise<Book> {
    if (book && typeof book !== 'string') {
        book = book.book_id
    }
    if (!book) {
        // 被屏蔽的书阅读页 __INITIAL_STATE__.reader.chapterData 是空对象，
        // 取不到书号时不要往下走，交给调用方兜底，否则会在这里抛 TypeError
        throw new Error('book id is empty')
    }
    const bookInfo = await getBookInfo(book)
    if (!bookInfo) {
        throw new Error('Book not found')
    }
    const catalog = await getCatalog(bookInfo.book_id)
    console.log('Catalog:', catalog)
    bookInfo.volume_list = catalog.volume_list
    bookInfo.chapter_list = catalog.chapter_list
    return bookInfo
}