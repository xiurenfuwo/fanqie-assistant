// 段评条目的 DOM 构造：单条评论、楼中楼回复、回复折叠区。

import { getParaReplies, PARA_REPLY_PAGE_SIZE } from '../api/paraComment'
import { formatTime, makeImage, renderCommentText } from './media'
import type { ParaComment, ParaCommentReply } from '../types'

/** 单条评论 */
export function buildCommentItem(comment: ParaComment, itemId: string, bookId: string): HTMLElement {
    const item = document.createElement('div')
    item.className = 'fqa-pc-item'

    const avatar = document.createElement('img')
    avatar.className = 'fqa-pc-avatar'
    avatar.loading = 'lazy'
    avatar.referrerPolicy = 'no-referrer'
    avatar.alt = ''
    avatar.src = comment.user.avatar
    avatar.addEventListener('error', () => {
        avatar.style.visibility = 'hidden'
    })
    item.appendChild(avatar)

    const main = document.createElement('div')
    main.className = 'fqa-pc-main'

    const userLine = document.createElement('div')
    userLine.className = 'fqa-pc-user'
    userLine.textContent = comment.user.name || '读者'
    main.appendChild(userLine)

    const text = document.createElement('div')
    text.className = 'fqa-pc-text'
    text.appendChild(renderCommentText(comment.text))
    main.appendChild(text)

    if (comment.images.length) {
        const imgs = document.createElement('div')
        imgs.className = 'fqa-pc-imgs'
        for (const img of comment.images) imgs.appendChild(makeImage(img))
        main.appendChild(imgs)
    }

    const parts: string[] = []
    if (comment.digg_count > 0) parts.push(`赞 ${comment.digg_count}`)
    if (comment.reply_count > 0) parts.push(`回复 ${comment.reply_count}`)
    const time = formatTime(comment.create_time)
    if (time) parts.push(time)
    if (parts.length) {
        const meta = document.createElement('div')
        meta.className = 'fqa-pc-meta'
        meta.textContent = parts.join(' · ')
        main.appendChild(meta)
    }

    if (comment.reply_count > 0) {
        main.appendChild(buildRepliesBlock(comment.id, comment.reply_count, itemId, bookId))
    }

    item.appendChild(main)
    return item
}

/** 单条回复（楼中楼） */
export function buildReplyItem(reply: ParaCommentReply): HTMLElement {
    const item = document.createElement('div')
    item.className = 'fqa-pc-reply'

    const name = document.createElement('span')
    name.className = 'fqa-pc-reply-user'
    name.textContent = (reply.user.name || '读者') + (reply.to_name ? ` 回复 @${reply.to_name}` : '') + '：'

    const text = document.createElement('span')
    text.className = 'fqa-pc-reply-text'
    text.appendChild(renderCommentText(reply.text))

    item.appendChild(name)
    item.appendChild(text)
    for (const img of reply.images) item.appendChild(makeImage(img))
    return item
}

/**
 * 「N 条回复」折叠区。
 *
 * 展开时才拉接口（避免一次开一堆请求），拉到多少渲染多少；
 * 还有下一页时挂一个 IntersectionObserver，滑到接近底部自动续加载。
 */
function buildRepliesBlock(commentId: string, replyCount: number, itemId: string, bookId: string): HTMLElement {
    const wrap = document.createElement('div')
    wrap.className = 'fqa-pc-replies'

    const toggle = document.createElement('button')
    toggle.type = 'button'
    toggle.className = 'fqa-pc-replies-toggle'
    toggle.textContent = `${replyCount} 条回复`

    const list = document.createElement('div')
    list.className = 'fqa-pc-replies-list'
    list.hidden = true

    const sentinel = document.createElement('div')
    sentinel.className = 'fqa-pc-reply-sentinel'

    let started = false
    let loading = false
    let hasMore = false
    let failed = false
    let cursor = '0'
    let total = replyCount
    let observer: IntersectionObserver | null = null

    const appendReplies = (list_: ParaCommentReply[]) => {
        const frag = document.createDocumentFragment()
        for (const r of list_) frag.appendChild(buildReplyItem(r))
        list.insertBefore(frag, sentinel)
    }

    const stopObserver = () => {
        observer?.disconnect()
        observer = null
    }

    async function loadPage(): Promise<void> {
        if (loading || !hasMore) return
        loading = true
        sentinel.textContent = '加载中…'
        try {
            const res = await getParaReplies(itemId, bookId, commentId, cursor, PARA_REPLY_PAGE_SIZE)
            total = res.total || total
            hasMore = res.has_more
            cursor = res.cursor || cursor
            if (res.replies.length) appendReplies(res.replies)
            sentinel.textContent = ''
            if (!hasMore) stopObserver()
        } catch (err) {
            console.warn('[fqa:段评] 加载回复失败:', err)
            hasMore = false
            failed = true
            sentinel.textContent = ''
        }
        loading = false
    }

    function ensureObserver(): void {
        if (observer || !hasMore || typeof IntersectionObserver === 'undefined') return
        const root = list.closest('.fqa-pc-drawer-bd')
        observer = new IntersectionObserver(entries => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    void loadPage()
                    break
                }
            }
        }, { root, rootMargin: '0px 0px 80px 0px' })
        observer.observe(sentinel)
    }

    async function start(): Promise<void> {
        if (started) return
        started = true
        list.appendChild(sentinel)
        if (commentId) {
            hasMore = true
            await loadPage()
        }
        if (!list.querySelector('.fqa-pc-reply')) {
            const empty = document.createElement('div')
            empty.className = 'fqa-pc-reply-empty'
            empty.textContent = '暂无回复内容'
            list.insertBefore(empty, sentinel)
        }
        if (hasMore && !failed) ensureObserver()
        else sentinel.remove()
    }

    toggle.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        if (list.hidden) {
            list.hidden = false
            toggle.textContent = '收起回复'
            void start()
        } else {
            list.hidden = true
            toggle.textContent = `${total || replyCount} 条回复`
        }
    })

    wrap.appendChild(toggle)
    wrap.appendChild(list)
    return wrap
}
