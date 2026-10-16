// 段评抽屉：锚在正文右缘、宽度由 0 向右展开；打开时把正文块与顶部导航整体左移，
// 并把工具栏按 (抽屉宽 - 位移) 同缓动右移，保证工具栏与抽屉的间距全程不变。

import { getParaComments, PARA_PAGE_SIZE } from '../api/paraComment'
import { buildCommentItem } from './item'
import type { ParaComment } from '../types'

const DRAWER_MAX_WIDTH = 420
const PAGE_MARGIN = 24
const SHIFT_EASE = '0.3s cubic-bezier(0.22, 0.61, 0.36, 1)'

interface DrawerEls {
    drawer: HTMLDivElement
    inner: HTMLDivElement
    body: HTMLDivElement
    count: HTMLSpanElement
}

interface PageState {
    itemId: string
    bookId: string
    paraIndex: number
    itemVersion: string
    offset: number
    next: number
    hasMore: boolean
    loaded: number
    total: number
    para: HTMLElement | null
    container: HTMLElement
    loading: boolean
}

let els: DrawerEls | null = null
let page: PageState | null = null
let shiftTargets: HTMLElement[] = []

export function isParaDrawerOpen(): boolean {
    return Boolean(els?.drawer.classList.contains('fqa-pc-show'))
}

/** 生成（或复用）抽屉 DOM，并把各种关闭手势一次挂好 */
function ensureDrawer(): DrawerEls {
    if (els && els.drawer.isConnected) return els

    const drawer = document.createElement('div')
    drawer.className = 'fqa-pc-drawer'
    drawer.setAttribute('role', 'dialog')
    drawer.setAttribute('aria-label', '段评')
    drawer.innerHTML =
        '<div class="fqa-pc-drawer-inner">' +
        '<div class="fqa-pc-drawer-hd"><div class="fqa-pc-drawer-title">评论 <span class="fqa-pc-drawer-count"></span></div>' +
        '<button class="fqa-pc-drawer-close" type="button" aria-label="关闭">✕</button></div>' +
        '<div class="fqa-pc-drawer-bd"></div></div>'

    const created: DrawerEls = {
        drawer,
        inner: drawer.querySelector('.fqa-pc-drawer-inner') as HTMLDivElement,
        body: drawer.querySelector('.fqa-pc-drawer-bd') as HTMLDivElement,
        count: drawer.querySelector('.fqa-pc-drawer-count') as HTMLSpanElement,
    }

    drawer.querySelector('.fqa-pc-drawer-close')?.addEventListener('click', () => closeParaDrawer())
    // 点抽屉内部不冒泡到「点空白关闭」
    drawer.addEventListener('click', e => e.stopPropagation())
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeParaDrawer()
    })
    document.addEventListener('click', e => {
        if (!els?.drawer.classList.contains('fqa-pc-show')) return
        const t = e.target as HTMLElement | null
        if (t?.closest?.('.fqa-pc-drawer, .fqa-pc-chip')) return
        closeParaDrawer()
    }, true)
    window.addEventListener('resize', () => {
        if (page && els?.drawer.classList.contains('fqa-pc-show')) applyShift(page.container, els)
    })
    // 滑到接近底部自动续加载评论
    created.body.addEventListener('scroll', () => {
        const st = page
        if (!st || !st.hasMore || st.loading) return
        const b = created.body
        if (b.scrollTop + b.clientHeight >= b.scrollHeight - 120) {
            st.offset = st.next
            void fetchPage(created, st, false)
        }
    })

    document.body.appendChild(drawer)
    els = created
    return created
}

/** 找正文所在的面板块（带底色、宽度不超过视口的祖先），用于整体左移 */
function findPanelEl(start: HTMLElement): HTMLElement | null {
    const W = window.innerWidth
    for (let n: HTMLElement | null = start; n && n !== document.body && n !== document.documentElement; n = n.parentElement) {
        const bg = getComputedStyle(n).backgroundColor
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
            const r = n.getBoundingClientRect()
            if (r.width > 0 && r.width <= W * 0.95) return n
        }
    }
    return null
}

/** 打开时计算位移与抽屉宽度，并应用到正文块 / 顶部导航 / 工具栏 / 抽屉 */
function applyShift(container: HTMLElement, elements: DrawerEls): void {
    const W = window.innerWidth
    const toolbar = document.querySelector<HTMLElement>('.reader-toolbar')
    const nav = document.querySelector<HTMLElement>('.muye-reader-nav')

    let target = findPanelEl(container)
    if (!target) {
        const titleEl = document.querySelector('h1.muye-reader-title')
        if (titleEl) {
            const ancestors = new Set<Node>()
            for (let n: Node | null = titleEl; n; n = n.parentElement) ancestors.add(n)
            for (let n: Node | null = container; n; n = n.parentElement) {
                if (ancestors.has(n)) {
                    target = n as HTMLElement
                    break
                }
            }
        }
    }
    if (!target) target = container.closest<HTMLElement>('.muye-reader-inner') ?? container
    if (!target) return

    const globalShift = parseFloat(document.documentElement.style.getPropertyValue('--fqa-pc-shift')) || 0
    const cur = target.classList.contains('fqa-pc-shift-el') ? globalShift : 0
    const r = target.getBoundingClientRect()
    const right = r.right + cur
    const tw = toolbar ? toolbar.offsetWidth || 56 : 0

    // 工具栏原始左缘（减掉当前 translateX，避免连点越移越多）
    let origToolbarLeft = W - PAGE_MARGIN - tw
    if (toolbar) {
        const m = /translateX\((-?[\d.]+)px\)/.exec(toolbar.style.transform || '')
        const curTb = m?.[1] ? parseFloat(m[1]) : 0
        const tr = toolbar.getBoundingClientRect()
        if (tr.width > 0) origToolbarLeft = Math.round(tr.left - curTb)
    }

    const toolbarMaxLeft = W - PAGE_MARGIN - tw
    const dwFull = Math.min(DRAWER_MAX_WIDTH, Math.round(W * 0.92))
    const maxShift = Math.max(0, Math.round(r.width - PAGE_MARGIN))
    let shift = origToolbarLeft + dwFull - toolbarMaxLeft
    shift = Math.max(0, Math.min(shift, maxShift))

    let dw = dwFull
    const toolbarFinalLeft = origToolbarLeft + dw - shift
    if (toolbarFinalLeft > toolbarMaxLeft) dw = Math.max(220, dw - (toolbarFinalLeft - toolbarMaxLeft))
    const toolbarDelta = Math.round(dw - shift)

    const targets = [target]
    if (nav && target !== nav && !target.contains(nav)) targets.push(nav)
    for (const t of targets) t.classList.add('fqa-pc-shift-el')
    shiftTargets = targets

    document.documentElement.style.setProperty('--fqa-pc-shift', Math.round(shift) + 'px')
    if (toolbar) {
        toolbar.style.transition = `transform ${SHIFT_EASE}`
        toolbar.style.transform = Math.abs(toolbarDelta) > 0.5 ? `translateX(${toolbarDelta}px)` : ''
    }
    elements.drawer.style.left = Math.round(right) + 'px'
    elements.drawer.style.transform = shift > 0.5 ? `translateX(${-Math.round(shift)}px)` : ''
    elements.inner.style.width = Math.round(dw) + 'px'
    elements.drawer.style.width = Math.round(dw) + 'px'
}

/** 复位所有平移与工具栏 */
function clearShift(): void {
    document.documentElement.style.setProperty('--fqa-pc-shift', '0px')
    for (const t of shiftTargets) t.classList.remove('fqa-pc-shift-el')
    shiftTargets = []
    const toolbar = document.querySelector<HTMLElement>('.reader-toolbar')
    if (toolbar) {
        toolbar.style.transition = `transform ${SHIFT_EASE}`
        toolbar.style.transform = ''
    }
    if (els) {
        els.drawer.style.transform = ''
        els.drawer.style.width = '0px'
    }
}

/** 阅读器是否处于深色主题 */
function isReaderDark(): boolean {
    try {
        if (document.querySelector('.muye-reader-dark, .muye-reader-content-dark, .muye-reader-bg-dark')) return true
        const bg = getComputedStyle(document.body).backgroundColor || ''
        const nums = bg.match(/\d+/g)
        if (nums && nums.length >= 3) {
            const [r = 255, g = 255, b = 255] = nums.map(Number)
            return r * 0.299 + g * 0.587 + b * 0.114 < 128
        }
    } catch {
        // 取不到样式时按浅色处理
    }
    return false
}

/**
 * 打开段评抽屉。
 *
 * @param paragraph 被点击标记所在的段落，用于高亮与滚动
 * @param chip 段尾标记元素
 */
export async function openParaDrawer(
    container: HTMLElement,
    paragraph: HTMLElement | null,
    chip: HTMLElement | null,
    total: number,
    itemId: string,
    bookId: string,
    paraIndex: number,
    itemVersion: string,
): Promise<void> {
    const elements = ensureDrawer()
    const dark = isReaderDark()
    elements.drawer.classList.toggle('fqa-pc-dark', dark)
    document.documentElement.classList.toggle('fqa-pc-reader-dark', dark)

    elements.count.textContent = total ? `· 共 ${total} 条` : ''
    elements.body.innerHTML = '<div class="fqa-pc-status">加载中…</div>'
    elements.body.scrollTop = 0

    if (page?.para && page.para !== paragraph) page.para.classList.remove('fqa-pc-para-active')
    document.querySelectorAll('.fqa-pc-chip.fqa-pc-active').forEach(c => c.classList.remove('fqa-pc-active'))
    paragraph?.classList.add('fqa-pc-para-active')
    chip?.classList.add('fqa-pc-active')

    elements.drawer.classList.add('fqa-pc-show')
    applyShift(container, elements)
    paragraph?.scrollIntoView?.({ block: 'center', behavior: 'smooth' })

    const state: PageState = {
        itemId, bookId, paraIndex, itemVersion,
        offset: 0, next: 0, hasMore: false, loaded: 0, total,
        para: paragraph, container, loading: false,
    }
    page = state
    await fetchPage(elements, state, true)
}

async function fetchPage(elements: DrawerEls, state: PageState, first: boolean): Promise<void> {
    if (state.loading) return
    state.loading = true
    let comments: ParaComment[] = []
    let hasMore = false
    let next = state.offset
    try {
        const res = await getParaComments(
            state.itemId, state.bookId, state.paraIndex, state.itemVersion, state.offset, PARA_PAGE_SIZE,
        )
        comments = res.comments
        hasMore = res.has_more
        next = res.next_offset
    } catch (err) {
        console.warn('[fqa:段评] 加载失败:', err)
        state.loading = false
        if (first) elements.body.innerHTML = '<div class="fqa-pc-status">加载失败，请稍后重试</div>'
        return
    }
    if (page !== state) {
        state.loading = false
        return
    }
    if (first) elements.body.innerHTML = ''
    if (first && !comments.length) {
        elements.body.innerHTML = '<div class="fqa-pc-status">暂无评论</div>'
        state.loading = false
        return
    }

    let list = elements.body.querySelector<HTMLDivElement>('.fqa-pc-list')
    if (!list) {
        list = document.createElement('div')
        list.className = 'fqa-pc-list'
        elements.body.appendChild(list)
    }
    const frag = document.createDocumentFragment()
    for (const c of comments) frag.appendChild(buildCommentItem(c, state.itemId, state.bookId))
    list.appendChild(frag)

    state.loaded += comments.length
    state.hasMore = hasMore
    state.next = next || state.offset + comments.length
    elements.count.textContent = state.total
        ? `· 已加载 ${state.loaded} / 共 ${state.total} 条`
        : `· 已加载 ${state.loaded} 条`
    state.loading = false

    // 首屏没撑满（抽屉比列表高）就继续补，否则永远触发不了滚动加载
    if (state.hasMore && elements.body.scrollHeight <= elements.body.clientHeight + 4) {
        state.offset = state.next
        await fetchPage(elements, state, false)
    }
}

/** 关闭抽屉并复位 */
export function closeParaDrawer(): void {
    page?.para?.classList.remove('fqa-pc-para-active')
    document.querySelectorAll('.fqa-pc-chip.fqa-pc-active').forEach(c => c.classList.remove('fqa-pc-active'))
    page = null
    if (els) {
        els.drawer.classList.remove('fqa-pc-show')
        els.drawer.style.width = '0px'
    }
    clearShift()
}
