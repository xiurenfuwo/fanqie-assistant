// 段评入口：段尾标记、工具栏开关、章末评论区块。
//
// 阅读器每渲染完一章调用一次 attachParaComments(container, itemId, bookId)；
// 工具栏开关与抽屉由 initParaCommentToggle() 在阅读页初始化时挂一次。

import { getParaIdeaList } from '../api/paraComment'
import { appGet } from '../api/app'
import { settings } from '../settings'
import { openParaDrawer } from './drawer'
import { buildCommentItem } from './item'
import paraCommentCss from '../assets/paraComment.css?raw'
import type { ParaComment } from '../types'

const TOOL_ID = 'fqa-pc-toggle'
const STYLE_ID = 'fqa-pc-style'

/** 注入段评样式（只注一次） */
function ensureCss(): void {
    if (document.getElementById(STYLE_ID)) return
    const style = document.createElement('style')
    style.id = STYLE_ID
    style.textContent = paraCommentCss
    document.head.appendChild(style)
}

/** 段评图标（气泡） */
const TOOL_ICON =
    '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.4" ' +
    'stroke-linejoin="round"><path d="M12 4.5c-4.7 0-8.5 3.3-8.5 7.3 0 1.9.8 3.6 2.2 4.9-.2 1.2-.7 2.3-1.5 3.2 ' +
    '1.7-.2 3.2-.8 4.4-1.7.9.2 1.9.4 3.4.4 4.7 0 8.5-3.3 8.5-7.3S16.7 4.5 12 4.5z"/></svg>'

/**
 * 取正文段落，顺序与段评的 para_index 一致。
 *
 * 脚本接管后正文在 #fqa-reader-content 里；优先取 article 下的 <p>，
 * 退化时再找直接的 P/DIV 子节点。
 */
function readerParagraphs(container: HTMLElement): HTMLElement[] {
    const root = container.querySelector('article') ?? container
    let els = Array.from(root.querySelectorAll<HTMLElement>('p')).filter(el => (el.textContent ?? '').trim())
    if (!els.length) {
        els = Array.from(root.children).filter(
            (el): el is HTMLElement =>
                el.nodeType === 1
                && (el.tagName === 'P' || el.tagName === 'DIV')
                && Boolean((el.textContent ?? '').trim()),
        )
    }
    return els
}

/** 应用「段评开关」的全局状态（隐藏标记 / 高亮到关闭态） */
export function applyParaCommentState(): void {
    document.documentElement.classList.toggle('fqa-pc-off', !settings.paraComment)
    const el = document.getElementById(TOOL_ID)
    if (!el) return
    if (el.classList.contains('fqa-pc-tool')) {
        el.classList.toggle('fqa-pc-tool-on', settings.paraComment)
        el.classList.toggle('fqa-pc-tool-off', !settings.paraComment)
    } else {
        el.textContent = settings.paraComment ? '段评 开' : '段评 关'
        el.classList.toggle('fqa-pc-toggle-off', !settings.paraComment)
    }
}

/** 工具栏「段评」开关，插在「字号」下面 */
export function initParaCommentToggle(): void {
    ensureCss()
    const toolbar = document.querySelector<HTMLElement>('.reader-toolbar')
    if (toolbar) {
        let item = document.getElementById(TOOL_ID)
        if (!item || !toolbar.contains(item)) {
            item = document.createElement('div')
            item.id = TOOL_ID
            item.className = 'reader-toolbar-item fqa-pc-tool'
            item.setAttribute('role', 'button')
            item.setAttribute('tabindex', '0')
            item.innerHTML =
                `<div class="reader-toolbar-item-icon">${TOOL_ICON}</div>` +
                '<div class="reader-toolbar-item-font">段评</div>'
            // capture 阶段拦截，避免冒泡到站点的字号弹层
            item.addEventListener('click', e => {
                e.preventDefault()
                e.stopPropagation()
                e.stopImmediatePropagation()
                settings.paraComment = !settings.paraComment
                applyParaCommentState()
            }, true)

            const items = Array.from(toolbar.querySelectorAll<HTMLElement>('.reader-toolbar-item'))
            const fontItem = items.find(el => /字号|字体/.test(el.querySelector('.reader-toolbar-item-font')?.textContent ?? ''))
            if (fontItem) fontItem.insertAdjacentElement('afterend', item)
            else toolbar.appendChild(item)
        }
        applyParaCommentState()
        return
    }

    // 没有站点工具栏时的兜底浮动开关
    let button = document.getElementById(TOOL_ID) as HTMLButtonElement | null
    if (!button) {
        button = document.createElement('button')
        button.id = TOOL_ID
        button.type = 'button'
        button.className = 'fqa-pc-toggle'
        button.addEventListener('click', () => {
            settings.paraComment = !settings.paraComment
            applyParaCommentState()
        })
        document.body.appendChild(button)
    }
    applyParaCommentState()
}

/** 章末评论区块（整本书级别的一章评论，和段评不是一套数据） */
async function attachChapterComments(container: HTMLElement, itemId: string, bookId: string): Promise<void> {
    if (container.querySelector('.fqa-cc-section')) return

    const out: ParaComment[] = []
    let offset = 0
    for (let page = 0; page < 3; page++) {
        const res = await appGet('/ugc/novel_comment/item/v', {
            item_id: itemId,
            offset: String(offset),
            count: '50',
            ...(bookId ? { book_id: bookId } : {}),
        })
        let data: any = null
        try {
            data = res.json()?.data
        } catch {
            break
        }
        const list: any[] = Array.isArray(data?.comment) ? data.comment : []
        for (const c of list) {
            const id = String(c?.comment_id ?? '')
            if (!id) continue
            out.push({
                id,
                text: String(c?.text ?? ''),
                create_time: Number(c?.create_timestamp) || 0,
                user: {
                    user_id: String(c?.user_info?.user_id ?? ''),
                    name: String(c?.user_info?.user_name ?? ''),
                    avatar: String(c?.user_info?.user_avatar ?? ''),
                },
                digg_count: Number(c?.digg_count) || 0,
                reply_count: Number(c?.reply_count) || 0,
                images: [],
            })
        }
        const next = Number(data?.next_offset)
        if (!data?.has_more || !Number.isFinite(next) || next === offset || !list.length) break
        offset = next
    }
    if (!out.length) return

    const root = container.querySelector('article') ?? container
    const section = document.createElement('section')
    section.className = 'fqa-cc-section'
    const head = document.createElement('h3')
    head.className = 'fqa-cc-title'
    head.textContent = `本章评论 · ${out.length} 条`
    section.appendChild(head)
    for (const c of out) section.appendChild(buildCommentItem(c, itemId, bookId))
    root.appendChild(section)
}

/**
 * 给当前章节挂上段评：段尾标记 + 章末评论。
 *
 * @param container 正文容器（#fqa-reader-content）
 */
export async function attachParaComments(container: HTMLElement, itemId: string, bookId: string): Promise<void> {
    if (!itemId) return
    ensureCss()
    const paragraphs = readerParagraphs(container)
    if (!paragraphs.length) return

    const idea = await getParaIdeaList(itemId, bookId)
    if (!idea.counts.size) return

    const summary = document.createElement('div')
    summary.className = 'fqa-pc-summary'
    summary.textContent = `讨论热烈：本章含 ${idea.total} 条段评，${idea.counts.size} 段有评论`
    container.insertBefore(summary, container.firstChild)

    for (const [idx, count] of idea.counts) {
        const paragraph = paragraphs[idx]
        if (!paragraph) continue
        const chip = document.createElement('span')
        chip.className = 'fqa-pc-chip'
        chip.title = '查看段评'
        const countEl = document.createElement('span')
        countEl.className = 'fqa-pc-count'
        countEl.textContent = String(count)
        chip.appendChild(countEl)
        chip.addEventListener('click', e => {
            e.preventDefault()
            e.stopPropagation()
            void openParaDrawer(container, paragraph, chip, count, itemId, bookId, idx, idea.item_version)
        })
        paragraph.appendChild(chip)
    }

    void attachChapterComments(container, itemId, bookId)
}
