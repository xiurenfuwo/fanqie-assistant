// 段评抽屉：锚在正文右缘、宽度由 0 向右展开；打开时把正文块与顶部导航整体左移，
// 并把工具栏按 (抽屉宽 - 位移) 同缓动右移，保证工具栏与抽屉的间距全程不变。

import { getParaComments, PARA_PAGE_SIZE } from '../api/paraComment'
import { buildCommentItem } from './item'
import type { ParaComment } from '../types'

const PAGE_MARGIN = 24
/** 抽屉宽度上限（跟正文宽度一样写死，不随字号变） */
const DRAWER_MAX_WIDTH = 420
const SHIFT_EASE = '0.3s cubic-bezier(0.22, 0.61, 0.36, 1)'
/**
 * 关闭时「左移复位」的动画时长。
 *
 * 位移用的 transition 写在 `html.fqa-pc-open …` 这条规则**里面**，class 一摘掉，
 * 连 transition 一起失效，元素就会从 -Npx 直接跳回 0（看着是「啪」地弹回去）。
 * 所以关闭时先把位移量归零、保留 class 让它平滑过渡，等过渡跑完再摘类。
 * 比 CSS 的 0.3s 略长一点，避免临界时刻被摘掉。
 */
const SHIFT_RESET_MS = 320

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
let themeObserver: MutationObserver | null = null
let shiftReapplyTimer: number | null = null

export function isParaDrawerOpen(): boolean {
    return Boolean(els?.drawer.classList.contains('fqa-pc-show'))
}

/** 当前抽屉对应的段落。用于「再次点击同一段就收起」的判断 */
export function currentParaDrawerParagraph(): HTMLElement | null {
    return page?.para ?? null
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
    // 点抽屉内部不冒泡到正文的段落点击
    drawer.addEventListener('click', e => e.stopPropagation())
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeParaDrawer()
    })
    // 点空白处不再收起：只认 Esc、抽屉右上角 ✕，或再次点击已展开的段落
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
    // 抽屉一旦建好就盯着站点主题，日/夜切换时跟着换色
    watchReaderTheme()
    return created
}

/** 找正文所在的面板块（带底色、宽度不超过视口的祖先），用于整体左移 */
/**
 * 把正文实际字号写进 --fqa-pc-base，抽屉内的 em 尺寸都以它为基准。
 */
function updateBaseFontSize(container: HTMLElement): void {
    const base = measureBaseFontSize(container)
    document.documentElement.style.setProperty('--fqa-pc-base', `${Math.round(base)}px`)
}

/**
 * 字号变化后立即刷新抽屉。
 *
 * 抽屉里的字号是 em，跟着 --fqa-pc-base 走；不刷新的话要关掉再打开才生效。
 * 宽度上限是写死的 420，这里只更新基准并重贴一次位移（正文宽度可能也变了）。
 */
export function refreshParaDrawerMetrics(): void {
    const container = page?.container
    if (!container) return
    updateBaseFontSize(container)
    if (isParaDrawerOpen() && els) applyShift(container, els)
}

/** 取正文实际字号（px），作为抽屉内所有尺寸的基准 */
function measureBaseFontSize(container: HTMLElement): number {
    const root = container.querySelector('article') ?? container
    const probe = root.querySelector('p') ?? root
    const size = parseFloat(getComputedStyle(probe).fontSize)
    return Number.isFinite(size) && size > 0 ? size : 24
}

function findPanelEl(start: HTMLElement): HTMLElement | null {
    const W = window.innerWidth
    // 从父级开始：正文容器本身（#fqa-reader-content）也会带主题底色，
    // 它绝不能当平移目标，否则会和它的外层面板各平移一次、位移翻倍。
    for (let n: HTMLElement | null = start.parentElement; n && n !== document.body && n !== document.documentElement; n = n.parentElement) {
        if (n.id === 'fqa-reader-content') continue
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
    // 上一次关闭还在过渡中又打开了：先取消摘类，否则动画跑到一半类被摘掉
    cancelShiftReset()
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
    // 位移有两个来源：<html>.fqa-pc-open 的规则（正文块 / 顶栏），以及兜底的 fqa-pc-shift-el 类。
    // 只按类名判断会漏掉前者——站点换字号重渲染后类没了，但元素仍被 html 规则左移，
    // 这时量到的右缘已经是平移后的，再减一次位移就会把抽屉一起带偏。
    const shiftedByRoot =
        document.documentElement.classList.contains('fqa-pc-open')
        && target.matches('.muye-reader-box, .muye-reader-nav')
    const cur = (shiftedByRoot || target.classList.contains('fqa-pc-shift-el')) ? globalShift : 0
    const r = target.getBoundingClientRect()
    const right = r.right + cur
    // 所有尺寸以「正文实际字号」为基准：站点把字号调到 32 时抽屉也跟着放大，
    // 窄窗口边距自动收窄。浏览器缩放本身对 px 生效，这里解决的是站点字号档位。
    const margin = W < 720 ? 8 : PAGE_MARGIN
    updateBaseFontSize(container)

    const tw = toolbar ? toolbar.offsetWidth || 56 : 0

    // 工具栏原始左缘（减掉当前 translateX，避免连点越移越多）
    let origToolbarLeft = W - margin - tw
    if (toolbar) {
        const m = /translateX\((-?[\d.]+)px\)/.exec(toolbar.style.transform || '')
        const curTb = m?.[1] ? parseFloat(m[1]) : 0
        const tr = toolbar.getBoundingClientRect()
        if (tr.width > 0) origToolbarLeft = Math.round(tr.left - curTb)
    }

    const toolbarMaxLeft = W - margin - tw
    const dwFull = Math.min(DRAWER_MAX_WIDTH, Math.round(W * 0.92))
    const maxShift = Math.max(0, Math.round(r.width - margin))
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
    // 位移的「总开关」挂在 <html> 上：站点重渲染正文块也不会把它冲掉（见 paraComment.css）
    document.documentElement.classList.add('fqa-pc-open')

    // 只在值真的变化时写样式。
    // 位移观察器盯着 style 属性，无脑重写会反复触发自己，表现就是抽屉左右跳动。
    const root = document.documentElement.style
    const shiftValue = `${Math.round(shift)}px`
    if (root.getPropertyValue('--fqa-pc-shift') !== shiftValue) {
        root.setProperty('--fqa-pc-shift', shiftValue)
    }

    // 目录弹窗按正文实际位置对齐。站点写死 right: calc(50vw - 480px)，
    // 但正文块实际右缘未必在该处（窗口宽度不同会差几十像素），
    // 不对齐的话抽屉一展开就会压住目录的一部分。
    const contentRight = `${Math.round(W - right)}px`
    const contentWidth = `${Math.round(r.width)}px`
    if (root.getPropertyValue('--fqa-pc-content-right') !== contentRight) {
        root.setProperty('--fqa-pc-content-right', contentRight)
    }
    if (root.getPropertyValue('--fqa-pc-content-width') !== contentWidth) {
        root.setProperty('--fqa-pc-content-width', contentWidth)
    }

    if (toolbar) {
        const transition = `transform ${SHIFT_EASE}`
        const transform = Math.abs(toolbarDelta) > 0.5 ? `translateX(${toolbarDelta}px)` : ''
        if (toolbar.style.transition !== transition) toolbar.style.transition = transition
        if (toolbar.style.transform !== transform) toolbar.style.transform = transform
    }

    const leftValue = `${Math.round(right)}px`
    if (elements.drawer.style.left !== leftValue) elements.drawer.style.left = leftValue

    // 抽屉的位移由 CSS 变量 --fqa-pc-shift 驱动（见 paraComment.css），和正文共用同一条缓动，
    // 这样开合过程中抽屉左缘始终贴着正文右缘，中间不会漏出缝隙。
    // 这里只需清掉可能残留的内联 transform：内联会盖住变量规则。
    if (elements.drawer.style.transform) elements.drawer.style.transform = ''

    const widthValue = `${Math.round(dw)}px`
    if (elements.inner.style.width !== widthValue) elements.inner.style.width = widthValue
    if (elements.drawer.style.width !== widthValue) elements.drawer.style.width = widthValue
}

/** 关闭动画结束后要摘掉的 class（期间若重新打开会被取消） */
let shiftResetTimer: number | null = null
/** 关闭期间逐帧把抽屉左缘钉在正文右缘上的 rAF 句柄 */
let shiftFollowRaf: number | null = null

/** 取消待执行的「摘类」与跟随帧，重新展开时调用 */
function cancelShiftReset(): void {
    if (shiftResetTimer !== null) {
        window.clearTimeout(shiftResetTimer)
        shiftResetTimer = null
    }
    if (shiftFollowRaf !== null) {
        cancelAnimationFrame(shiftFollowRaf)
        shiftFollowRaf = null
    }
}

/**
 * 关闭动画期间，逐帧把抽屉左缘钉在正文的实时右缘上。
 *
 * 正文的复位是 CSS 过渡（--fqa-pc-shift 从 Npx 过渡到 0），抽屉若也靠自己的
 * 过渡去跟，两条过渡只要错开一点，关闭过程中两者之间就会漏出一条缝。
 * 这里改成每帧读一次正文实际右缘、直接写抽屉的 left：抽屉不再「猜」正文在
 * 哪，而是始终贴着它，任何缓动曲线下都不会分开。
 */
function followPanelDuringClose(target: HTMLElement, elements: DrawerEls): void {
    // 先用 left 把抽屉放到正文当前右缘，再关掉变量驱动的位移（避免 transform 与 left 叠加）。
    // 顺序不能反：先清 transform 会让抽屉跳回未平移的位置，闪一帧。
    elements.drawer.style.left = `${Math.round(target.getBoundingClientRect().right)}px`
    elements.drawer.style.transform = 'none'
    // 这里只保留「宽度」过渡：transform 要立刻归位（位置改由 left 逐帧跟随），
    // 否则它会自己再过渡一次，和 left 叠成一个反向的位移。
    elements.drawer.style.transition = 'width 0.3s cubic-bezier(0.22, 0.61, 0.36, 1)'
    const started = performance.now()
    const step = (): void => {
        if (!target.isConnected) {
            shiftFollowRaf = null
            return
        }
        // 正文此刻的真实右缘（包含了正在进行的过渡）
        elements.drawer.style.left = `${Math.round(target.getBoundingClientRect().right)}px`
        if (performance.now() - started < SHIFT_RESET_MS) {
            shiftFollowRaf = requestAnimationFrame(step)
        } else {
            shiftFollowRaf = null
            // 复位结束，交还给 CSS 变量规则（此时变量已是 0，不会再产生位移）
            elements.drawer.style.transform = ''
            elements.drawer.style.transition = ''
        }
    }
    shiftFollowRaf = requestAnimationFrame(step)
}

/** 复位所有平移与工具栏 */
function clearShift(): void {
    // 先把位移量归零，但**保留 class** —— transition 就写在带 class 的规则里，
    // 立刻摘类会让位移瞬间跳回原地，关抽屉时看着就很生硬。
    document.documentElement.style.setProperty('--fqa-pc-shift', '0px')
    const targets = shiftTargets
    shiftTargets = []

    cancelShiftReset()
    shiftResetTimer = window.setTimeout(() => {
        shiftResetTimer = null
        document.documentElement.classList.remove('fqa-pc-open')
        for (const t of targets) t.classList.remove('fqa-pc-shift-el')
    }, SHIFT_RESET_MS)

    const toolbar = document.querySelector<HTMLElement>('.reader-toolbar')
    if (toolbar) {
        toolbar.style.transition = `transform ${SHIFT_EASE}`
        toolbar.style.transform = ''
    }
    if (els) {
        // 宽度收敛到 0；左缘交给 rAF 贴着正文走，保证关闭全程不出现缝隙。
        els.drawer.style.width = '0px'
        const panel = targets.find(t => t.isConnected)
        if (panel) followPanelDuringClose(panel, els)
        else els.drawer.style.transform = 'none'
    }
}

/** 阅读器是否处于深色主题 */
function isReaderDark(): boolean {
    try {
        // 站点的日夜切换落在 <html muye-data-theme="dark"> 上（Reader.js 里 setAttribute）
        if (document.documentElement.getAttribute('muye-data-theme') === 'dark') return true
        if (document.querySelector('[muye-data-theme="dark"], .muye-reader-dark, .muye-reader-content-dark, .muye-reader-bg-dark')) return true
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
 * 抽屉打开时，跟着阅读器的日间/夜间切换实时更新配色。
 *
 * 站点的切换只是给 <html> 换 muye-data-theme 属性，不会重建我们的抽屉，
 * 所以必须自己监听属性变化。
 */
function watchReaderTheme(): void {
    if (themeObserver) return
    themeObserver = new MutationObserver(() => {
        if (!isParaDrawerOpen()) return
        const dark = isReaderDark()
        els?.drawer.classList.toggle('fqa-pc-dark', dark)
        document.documentElement.classList.toggle('fqa-pc-reader-dark', dark)
        // 改字号 / 站点重排会把位移类冲掉，这里补一次
        scheduleShiftReapply()
    })
    themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class', 'style', 'muye-data-theme'],
        subtree: true,
    })
}

/**
 * 抽屉打开期间，站点重排（改字号会换 class）可能把位移类冲掉，
 * 这里防抖后重新贴一次。applyShift 本身是幂等的，重复调用不会叠加位移。
 */
function scheduleShiftReapply(): void {
    // 位移还在就什么都不做。否则我们的观察器会被自己写的 style 反复触发，
    // 导致抽屉打开时左右抖动。
    if (shiftStillApplied()) return
    if (shiftReapplyTimer !== null) return
    shiftReapplyTimer = window.setTimeout(() => {
        shiftReapplyTimer = null
        if (!isParaDrawerOpen() || !page || !els) return
        if (shiftStillApplied()) return
        applyShift(page.container, els)
    }, 80)
}

/** 位移是否仍然生效：目标还挂在文档里，且位移类还在 */
function shiftStillApplied(): boolean {
    if (!shiftTargets.length) return false
    return shiftTargets.every(el => el.isConnected && el.classList.contains('fqa-pc-shift-el'))
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
