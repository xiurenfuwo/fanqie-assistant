// 段评入口：段尾标记、工具栏开关、章末评论区块。
//
// 阅读器每渲染完一章调用一次 attachParaComments(container, itemId, bookId)；
// 工具栏开关与抽屉由 initParaCommentToggle() 在阅读页初始化时挂一次。

import { getParaIdeaList } from '../api/paraComment'
import { appGet } from '../api/app'
import { settings } from '../settings'
import { closeParaDrawer, currentParaDrawerParagraph, isParaDrawerOpen, openParaDrawer } from './drawer'
import { buildCommentItem } from './item'
import paraCommentCss from '../assets/paraComment.css?raw'
import type { ParaComment, ParaIdeaResult } from '../types'

/** 换章时要收起抽屉，供 readerHook 调用 */
export { closeParaDrawer }

const TOOL_ID = 'fqa-pc-toggle'
const STYLE_ID = 'fqa-pc-style'

/** 目录「点外部关闭」只挂一次 */
let catalogClickBound = false
/** scrollIntoView 只 patch 一次 */
let catalogScrollPatched = false
/** 目录打开定位只挂一次 */
let catalogWatchBound = false

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

const SVG_NS = 'http://www.w3.org/2000/svg'

/**
 * 气泡外形（圆角矩形 + 左下角一个尖）。
 *
 * 用一条 SVG 路径而不是 CSS 边框：左下角要「把圆角换成尖」，用 border-radius
 * 拼不出带描边的缺口（之前几个方案都会在圆角旁多出一条线或啃掉圆角）。
 * 路径会被 preserveAspectRatio="none" 横向拉伸，描边靠
 * vector-effect:non-scaling-stroke 保证始终 1.5px。
 */
function buildChipShape(): SVGSVGElement {
    const svg = document.createElementNS(SVG_NS, 'svg')
    svg.setAttribute('class', 'fqa-pc-shape')
    svg.setAttribute('viewBox', '0 0 100 100')
    svg.setAttribute('preserveAspectRatio', 'none')
    svg.setAttribute('aria-hidden', 'true')
    const path = document.createElementNS(SVG_NS, 'path')
    //  三个圆角；左下角不放圆角：底边一路向左伸出成尖，再斜着接回左边竖线。
    //  这样尖在竖线的左边、底边仍是同一根水平线，也不会向下探出。
    path.setAttribute(
        'd',
        'M 19 3 H 81 A 16 16 0 0 1 97 19 V 81 A 16 16 0 0 1 81 97 ' +
        'H -8 L 3 74 V 19 A 16 16 0 0 1 19 3 Z',
    )
    svg.appendChild(path)
    return svg
}

/**
 * 目录弹窗：点面板 / 工具栏以外的地方就收起。
 *
 * 站点原本靠点击 .catalog-mask 关闭，但段评抽屉的层级远高于遮罩，
 * 点抽屉（或任何盖在遮罩上的区域）根本点不到遮罩，目录就关不掉。
 * 这里在 document 上兜一层：命中外部就替站点点一下遮罩。
 */
function initCatalogClickOutside(): void {
    if (catalogClickBound) return
    catalogClickBound = true
    document.addEventListener('click', event => {
        const target = event.target as HTMLElement | null
        if (!target) return
        // 目录没开就不管
        if (!document.querySelector('.reader-catalog')) return
        // 目录内部、工具栏（目录按钮自己会切）、遮罩本身（站点自己处理）都跳过
        if (target.closest('.reader-catalog, .reader-toolbar, .catalog-mask')) return
        document.querySelector<HTMLElement>('.catalog-mask')?.click()
    }, true)
}

/**
 * 去掉「打开目录时的滚动动画」。
 *
 * 站点在目录展开后 200ms 会执行 `scrollIntoView({ behavior: 'smooth' })`
 * 把当前章节滚进视口，那段平滑滚动看起来像页面在跳。这里只拦目录内部的调用，
 * 其它地方（注释跳转、听书跟随）不受影响。
 */
function patchCatalogScroll(): void {
    if (catalogScrollPatched) return
    catalogScrollPatched = true

    const original = Element.prototype.scrollIntoView as (
        this: Element,
        arg?: boolean | ScrollIntoViewOptions,
    ) => void

    Element.prototype.scrollIntoView = function (
        this: Element,
        arg?: boolean | ScrollIntoViewOptions,
    ): void {
        if (this.closest('.reader-catalog')) {
            const options: ScrollIntoViewOptions =
                typeof arg === 'boolean' ? { block: 'start' } : { ...(arg ?? {}) }
            options.behavior = 'auto'
            original.call(this, options)
            return
        }
        original.call(this, arg)
    }
}

/**
 * 打开目录时直接停在当前章节，不要「先显示顶部、200ms 后再滚过去」。
 *
 * 站点是挂载后 setTimeout(200) 才 scrollIntoView，那 200ms 里看到的是顶部。
 * 我们在 MutationObserver 回调里同步做同一步：它属于微任务，早于浏览器首次绘制，
 * 所以目录一出现就已经停在当前章节，肉眼看不到跳转。
 */
function watchCatalogOpen(): void {
    if (catalogWatchBound) return
    catalogWatchBound = true

    const locate = (): void => {
        const panel = document.querySelector('.reader-catalog')
        if (!panel) return
        const active = panel.querySelector<HTMLElement>('.reader-catalog-chapters .chapter.active')
        if (!active) return
        // 与站点一致用 block:'start'，但瞬时完成（站点那次已由 patchCatalogScroll 降级）
        active.scrollIntoView({ block: 'start', behavior: 'auto' })
    }

    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
                if (!(node instanceof HTMLElement)) continue
                if (node.matches('.reader-catalog') || node.querySelector('.reader-catalog')) {
                    locate()
                    // 布局尺寸偶尔要等一帧才稳定，再补一次（同样瞬时）
                    requestAnimationFrame(locate)
                    return
                }
            }
        }
    })
    observer.observe(document.body, { childList: true, subtree: true })
}

/** 工具栏「段评」开关，插在「字号」下面 */
export function initParaCommentToggle(): void {
    ensureCss()
    initCatalogClickOutside()
    patchCatalogScroll()
    watchCatalogOpen()
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
        // 标记「这段有段评」+ 段落下标，点击委托靠它定位
        paragraph.dataset.fqaParaIdx = String(idx)
        const chip = document.createElement('span')
        chip.className = 'fqa-pc-chip'
        chip.title = '查看段评'
        chip.appendChild(buildChipShape())
        const countEl = document.createElement('span')
        countEl.className = 'fqa-pc-count'
        countEl.textContent = String(count)
        chip.appendChild(countEl)
        paragraph.appendChild(chip)
    }

    bindParagraphToggle(container, itemId, bookId, idea)

    void attachChapterComments(container, itemId, bookId)
}

/**
 * 段落 / 气泡点击 -> 展开段评；再次点击同一段 -> 收起。
 *
 * 点空白、点别的元素都不收起。收起只有三条路：Esc、抽屉右上角 ✕、
 * 再次点击已展开的那一段。
 *
 * 用事件委托挂在正文容器上。容器跨章节是复用的，所以每次重挂前先 abort 上一次，
 * 避免监听器越积越多。
 */
function bindParagraphToggle(
    container: HTMLElement,
    itemId: string,
    bookId: string,
    idea: ParaIdeaResult,
): void {
    const holder = container as HTMLElement & { __fqaParaToggle?: AbortController }
    holder.__fqaParaToggle?.abort()
    const controller = new AbortController()
    holder.__fqaParaToggle = controller

    container.addEventListener('click', event => {
        const target = event.target as HTMLElement | null
        if (!target) return
        // 链接 / 注释上标 / 表单控件不抢行为
        if (target.closest('a, sup, button, input, textarea, select')) return
        // 正在划词复制时不要误触
        const selection = window.getSelection()
        if (selection && selection.toString().trim()) return

        const paragraph = target.closest<HTMLElement>('p[data-fqa-para-idx]')
        if (!paragraph) return

        const idx = Number(paragraph.dataset.fqaParaIdx)
        const count = idea.counts.get(idx)
        if (!Number.isFinite(idx) || count === undefined) return

        // 已展开的就是这一段 -> 收起
        if (isParaDrawerOpen() && currentParaDrawerParagraph() === paragraph) {
            closeParaDrawer()
            return
        }
        const chip = paragraph.querySelector<HTMLElement>('.fqa-pc-chip')
        void openParaDrawer(container, paragraph, chip, count, itemId, bookId, idx, idea.item_version)
    }, { signal: controller.signal })
}
