// 阅读页增强：滑到底部自动追加下一章，以及工具栏「回到顶部」。

import { getChapter } from './api/content'
import { attachParaComments } from './paraComment'
import { settings } from './settings'
import { sleep } from './utils'
import { bindFootnoteInteraction, processFootnotes } from './utils/footnote'

const BACK_TOP_ID = 'fqa-back-top'
const APPEND_CLASS = 'fqa-appended-chapter'
const APPEND_TITLE_CLASS = 'fqa-append-title'

/** 距底部还剩多少像素时开始预取下一章 */
const PREFETCH_PX = 700

/**
 * 原生（未被打补丁）的 replaceState。
 *
 * main.ts 会把 pushState/replaceState 包一层、调用后触发换章重载；
 * 站点的路由库又会再包一层并重渲染阅读器。滚动追加时我们只想悄悄改个地址栏，
 * 两者都不能惊动，否则页面会因重渲染 + 滚动恢复互相抢占而抖动。
 * 模块在 mainInit 打补丁之前求值，这里存下的是最原始的版本。
 */
const rawReplaceState = unsafeWindow.history.replaceState.bind(unsafeWindow.history)

const BACK_TOP_ICON =
    '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.4" ' +
    'stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V6"/><path d="M6 11l6-6 6 6"/></svg>'

/* ---------------------------- 回到顶部 ---------------------------- */

/**
 * 解析阅读页真正的滚动容器。
 *
 * 站点的阅读器是 `.muye-reader { height: 100vh; overflow: auto }`，
 * 滚动发生在它身上而不是 window —— 用 window.scrollY / window.scrollTo
 * 既不触发监听也滚不动。取不到就退回文档滚动元素。
 */
function resolveScroller(): HTMLElement {
    const reader = document.querySelector<HTMLElement>('.muye-reader')
    if (reader) {
        const overflowY = getComputedStyle(reader).overflowY
        if (overflowY === 'auto' || overflowY === 'scroll') return reader
    }
    return (document.scrollingElement as HTMLElement | null) ?? document.documentElement
}

export function initBackToTop(): void {
    void ensureBackTop()
}

async function ensureBackTop(): Promise<void> {
    for (let attempt = 0; attempt < 40; attempt++) {
        const toolbar = document.querySelector<HTMLElement>('.reader-toolbar')
        const anchor = toolbar?.querySelector<HTMLElement>('.reader-toolbar-item')
        if (toolbar && anchor) {
            if (document.getElementById(BACK_TOP_ID)) return
            const btn = document.createElement('div')
            btn.id = BACK_TOP_ID
            btn.className = 'reader-toolbar-item fqa-back-top'
            btn.setAttribute('role', 'button')
            btn.setAttribute('tabindex', '0')
            btn.title = '回到顶部'
            btn.innerHTML =
                `<div class="reader-toolbar-item-icon">${BACK_TOP_ICON}</div>` +
                '<div class="reader-toolbar-item-font">顶部</div>'
            btn.addEventListener('click', e => {
                e.preventDefault()
                e.stopPropagation()
                resolveScroller().scrollTo({ top: 0, behavior: 'smooth' })
                // 兜底：万一滚动其实在 window 上
                window.scrollTo({ top: 0, behavior: 'smooth' })
            })
            const items = Array.from(toolbar.querySelectorAll<HTMLElement>('.reader-toolbar-item'))
            const last = items[items.length - 1] ?? anchor
            last.insertAdjacentElement('afterend', btn)
            return
        }
        await sleep(200)
    }
}

/* ---------------------------- 无限追加 ---------------------------- */

interface ScrollState {
    bookId: string
    /** 全书章节 id 顺序表 */
    ids: string[]
    /** 下一个要追加的下标 */
    next: number
    loading: boolean
    /** 正文容器（#fqa-reader-content） */
    container: HTMLElement
}

interface ScrollContext {
    container: HTMLElement
    itemId: string
    bookId: string
    ids: string[]
    /** 起始章节标题（回滚到第一章时还原标题要用） */
    title: string
}

const END_MARK_ID = 'fqa-end-mark'

/** 全书读完的收尾标记（纯装饰，跟着主题走） */
function ensureEndMark(container: HTMLElement): void {
    if (container.querySelector(`#${END_MARK_ID}`)) return
    const el = document.createElement('div')
    el.id = END_MARK_ID
    el.className = 'fqa-end-mark'
    el.textContent = '— 全书完 —'
    container.appendChild(el)
}

function removeEndMark(): void {
    document.getElementById(END_MARK_ID)?.remove()
}

/* ------------------------ 追加章节的纸色（JS 兜底） ------------------------ */

/**
 * 取站点真正的「纸色」。
 *
 * 底色不是靠变量推的，直接读 .muye-reader-box 的计算值 —— 三套主题
 * （日间/米黄/夜间）都由站点自己算好，我们照抄就行，不会抄错。
 */
function paperColor(): string {
    const box = document.querySelector<HTMLElement>('.muye-reader-box')
    const bg = getComputedStyle(box ?? document.body).backgroundColor
    return bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent' ? bg : ''
}

/**
 * 把纸色刷到正文容器上。
 *
 * 纸色直接读 .muye-reader-box 的计算值 —— 三套主题（日间/米黄/夜间）都由
 * 站点算好，照抄即可，不会抄错。只上色到容器本身，**不动任何子元素**：
 * 段评的段落高亮靠 background + box-shadow，子元素一旦被强行透明化就会
 * 只剩一个色框。
 */
function applyPaperTheme(container: HTMLElement): void {
    const paper = paperColor()
    if (!paper) return
    container.style.setProperty('background-color', paper, 'important')
}

let paperObserver: MutationObserver | null = null

/** 切主题时纸色会变，内联值要跟着刷新 */
function watchPaperTheme(container: HTMLElement): void {
    if (paperObserver) return
    paperObserver = new MutationObserver(() => {
        const st = state
        if (st && st.container === container) applyPaperTheme(container)
    })
    paperObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'muye-data-theme'] })
}

/* ------------------------ 滚动时同步地址栏 / 标题 ------------------------ */

/** 当前地址里「章节 id」所在的那一段（前缀 + 后缀），换章时只替换中间 */
let urlBase: { prefix: string; suffix: string } | null = null
/** 标题里章节名之后的固定后缀，例如「 - 书名 - 番茄小说」 */
let titleSuffix = ''
let titleSuffixResolved = false
/** 上一次同步到的章节 id，没变就不重复写 */
let lastActiveId: string | null = null
/** 地址/标题同步的防抖定时器 */
let locationSyncTimer = 0

function rememberUrlBase(initialId: string): void {
    const segs = location.pathname.split('/')
    const last = segs[segs.length - 1] ?? ''
    urlBase = last.startsWith(initialId)
        ? { prefix: `${segs.slice(0, -1).join('/')}/`, suffix: last.slice(initialId.length) }
        : null
}

/**
 * 从站点设好的标题里剥出「章节名之后的部分」。
 *
 * 站点格式是「章节名 - 书名 - 番茄小说」。这一步不能放在 setupInfiniteScroll 里做：
 * 那时候 fetchBookInfo 可能还没把标题写好。放到第一次真的要改标题时再解析，
 * 成功率高得多；只解析一次，后面前后缀都复用。
 */
function resolveTitleSuffix(): void {
    if (titleSuffixResolved) return
    titleSuffixResolved = true
    const base = context?.title ?? ''
    const t = document.title
    titleSuffix = base && t.includes(base) ? t.slice(t.indexOf(base) + base.length) : ''
}

/**
 * 更新地址栏（只改地址，不动页面）。
 *
 * 曾经试过走站点路由那一层（unsafeWindow.history.replaceState），想让站点的
 * 内部状态也同步；结果是它每改一次 URL 就重渲染一次阅读器、把滚动归零，
 * 我们再强行恢复滚动位置，两者互相抢占 —— 表现就是章节交界处上下跳动、
 * 页面无法操作。
 * 站点的「当前章」同步不了就算了：目录的定位/高亮/点击已由
 * bindCatalogItemClicks 自己接管，不依赖它。这里只负责地址栏和标题。
 */
function updateUrlFor(id: string): void {
    if (!urlBase) return
    const next = `${urlBase.prefix}${id}${urlBase.suffix}${location.search}${location.hash}`
    if (next === `${location.pathname}${location.search}${location.hash}`) return
    // 必须用「原生」replaceState：走站点路由包装层会让它重渲染一次，
    // 重渲染会把滚动归零、我们再强行恢复，两者一打架页面就在章节交界处
    // 上下跳动（甚至无法操作）。这里只改地址栏，不动页面。
    try {
        rawReplaceState(unsafeWindow.history.state, '', next)
    } catch {
        /* 某些环境（file:// 等）不允许，忽略即可 */
    }
}

function updateTitleFor(title: string): void {
    if (!title) return
    resolveTitleSuffix()
    const next = `${title}${titleSuffix}`
    if (document.title !== next) document.title = next
}

/**
 * 按当前可视位置算出「正在读哪一章」，变了就同步地址栏和标题。
 *
 * 分界线取滚动容器顶部往下 120px：只要某一章的开头越过这条线，就认为在读它。
 */
function syncLocationState(): void {
    const st = state
    const ctx = context
    if (!st || !ctx || settings.readerPageMode !== 'scroll') return

    const scroller = resolveScroller()
    const line = scroller.getBoundingClientRect().top + 120
    let activeId = ctx.itemId
    let activeTitle = ctx.title

    const sections = st.container.querySelectorAll<HTMLElement>(`.${APPEND_CLASS}`)
    for (const sec of sections) {
        if (sec.getBoundingClientRect().top > line) break
        activeId = sec.dataset.itemId ?? activeId
        activeTitle = sec.querySelector(`.${APPEND_TITLE_CLASS}`)?.textContent?.trim() || activeTitle
    }

    if (activeId === lastActiveId) return
    lastActiveId = activeId
    updateUrlFor(activeId)
    updateTitleFor(activeTitle)
}

/** 滚动容器内的某一章滚到顶部 */
function scrollToSection(sec: HTMLElement): void {
    const scroller = resolveScroller()
    const top = sec.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop
    scroller.scrollTo({ top, behavior: 'smooth' })
}

/**
 * 滚到「当前章 ± 1」。
 *
 * 站点自己的方向键是按其内部状态（始终是进页面时那一章）算的，会跳错章，
 * 所以在滚动模式下由我们接管；没追加到的话先抓回来再滚。
 */
async function jumpChapter(delta: number): Promise<void> {
    const st = state
    const ctx = context
    if (!st || !ctx) return
    const cur = lastActiveId ?? ctx.itemId
    const idx = st.ids.indexOf(cur)
    if (idx < 0) return
    const target = idx + delta
    if (target < 0 || target >= st.ids.length) return
    const id = st.ids[target] as string

    const find = () => st.container.querySelector<HTMLElement>(`.${APPEND_CLASS}[data-item-id="${id}"]`)
    // 目标还没追加：顺序往后补，一直补到它为止（st.next 每次都会前进，不会死循环）
    let guard = 0
    while (!find() && st.next <= target && guard++ < 30) {
        if (st.loading) {
            await sleep(120)
            continue
        }
        await appendNext()
    }
    const sec = find()
    if (sec) {
        scrollToSection(sec)
        lastActiveId = id
        updateUrlFor(id)
        updateTitleFor(sec.querySelector(`.${APPEND_TITLE_CLASS}`)?.textContent?.trim() || '')
    }
}

/** 当前章 ± 1 的章节 id（滚动模式以实际读到的章为基准） */
function siblingChapterId(dir: number): string | null {
    const ctx = context
    if (!ctx) return null
    const from = ctx.ids.indexOf(settings.readerPageMode === 'scroll' ? lastActiveId ?? ctx.itemId : ctx.itemId)
    if (from < 0) return null
    const target = from + dir
    return target >= 0 && target < ctx.ids.length ? (ctx.ids[target] as string) : null
}

/** 章节模式下的翻章：改 URL 并让脚本自己的导航钩子重新渲染（不用整页刷新） */
function navigateChapters(dir: number): void {
    const id = siblingChapterId(dir)
    if (!id || !urlBase) return
    // unsafeWindow.history 是 main.ts 打过补丁的版本，pushState 会触发
    // onUrlChange → insertContent，按新 URL 重新取这一章。
    unsafeWindow.history.pushState(null, '', `${urlBase.prefix}${id}${urlBase.suffix}${location.search}${location.hash}`)
}

/**
 * 接管「换章」入口。
 *
 * 站点自己的方向键和上一章/下一章按钮都按它内部的状态算（永远是进页面时那一章），
 * 滚动读过好几章之后就全跳错了。所以在捕获阶段抢先处理：
 * - 滚动翻页：滚到当前章 ± 1（必要时先抓回来再滚），不发路由；
 * - 章节翻页：改 URL 让脚本重新渲染目标章。
 * 处理不了的情况（没有章节表、已到首/末章）原样放行，不干扰站点。
 */
function installChapterNavGuard(): void {
    window.addEventListener(
        'keydown',
        e => {
            if (!context || e.altKey || e.ctrlKey || e.metaKey) return
            const el = e.target as HTMLElement | null
            if (el && (el.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName))) return
            if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
            const dir = e.key === 'ArrowRight' ? 1 : -1
            // 处理不了（没有章节表 / 已经是首章或末章）就放行给站点
            if (!siblingChapterId(dir)) return
            if (settings.readerPageMode === 'scroll' && !state) return
            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()
            if (settings.readerPageMode === 'scroll' && state) void jumpChapter(dir)
            else navigateChapters(dir)
        },
        true,
    )

    document.addEventListener(
        'click',
        e => {
            if (!context) return
            const btn = (e.target as Element | null)?.closest?.('.chapter-btn') as HTMLElement | null
            if (!btn) return
            const dir = btn.classList.contains('next') ? 1 : btn.classList.contains('last') ? -1 : 0
            if (!dir || !siblingChapterId(dir)) return
            // 滚动翻页：站点的「下一章」也接管成「滚到已追加的那一章」，
            // 听书的自动下一章点的是同一个按钮，一并受益。
            if (settings.readerPageMode === 'scroll' && state) {
                e.preventDefault()
                e.stopPropagation()
                e.stopImmediatePropagation()
                void jumpChapter(dir)
                return
            }
            if (!urlBase) return
            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()
            navigateChapters(dir)
        },
        true,
    )
}

let state: ScrollState | null = null
/** 当前章节的上下文，切模式时要用它重新装配 */
let context: ScrollContext | null = null
let scrollBound = false

/**
 * 挂上「滑到底自动追加下一章」。
 *
 * 每次渲染完一章调用一次，重置进度。章节顺序取自目录（currentBook.chapter_list），
 * 追加的内容各自包一个 section，段评也按该章的 item_id 单独挂。
 * 是否真的生效由 settings.readerPageMode 决定（见 syncScrollState）。
 */
export function setupInfiniteScroll(
    container: HTMLElement,
    itemId: string,
    bookId: string,
    ids: string[],
    chapterTitle = '',
): void {
    context = ids.length ? { container, itemId, bookId, ids, title: chapterTitle } : null
    // 把「当前章」当成已同步过：第一次滚动不该去改标题/地址（本来就是对的），
    // 只有真的跨到追加章节时才动。
    lastActiveId = itemId
    if (context) rememberUrlBase(itemId)
    syncScrollState()
    syncEndMark()
    // 纸色兜底：容器上色、追加块透明（首帧就生效）
    applyPaperTheme(container)
    watchPaperTheme(container)
    if (scrollBound) return
    scrollBound = true
    // 滚动事件不冒泡，但可以在 window 上用捕获阶段收到内部容器（.muye-reader）的 scroll
    window.addEventListener('scroll', onScroll, { capture: true, passive: true })
}

/** 追加到最后一章（或本来就在最后一章）时才显示收尾标记 */
function syncEndMark(): void {
    const st = state
    if (!st) {
        removeEndMark()
        return
    }
    if (st.next >= st.ids.length) ensureEndMark(st.container)
    else removeEndMark()
}

/**
 * 丢弃当前滚动追加的上下文，回到「刚打开这一章」的状态。
 *
 * 从目录跳章时用：新章要被当作初始章节打开（回到顶部、后续从它往后重新追加），
 * 而不是接在原来那条追加链后面。
 */
export function resetScrollContext(): void {
    state = null
    context = null
    lastActiveId = null
    removeEndMark()
    paperObserver?.disconnect()
    paperObserver = null
    resolveScroller().scrollTo({ top: 0, behavior: 'auto' })
}

/**
 * 当前正在读的章节 id（滚动追加后以实际读到的为准）。
 *
 * 站点的目录高亮（.chapter.active）来自它自己的内部状态，永远停在进页面时那一章；
 * 我们靠这个函数把「真正在读的那一章」告诉目录，避免点开目录还是跳回初始章。
 */
export function currentScrollChapterId(): string | null {
    if (settings.readerPageMode !== 'scroll') return null
    return lastActiveId ?? context?.itemId ?? null
}

/**
 * 翻页模式切换后立即生效，不用换章或刷新。
 *
 * 切到滚动翻页时，从「当前章 + 1」继续追加；
 * 切回章节翻页时直接停掉后续追加（已经拼上去的内容保留，换章会自然清掉）。
 */
export function refreshInfiniteScrollMode(): void {
    syncScrollState()
    syncEndMark()
}

function syncScrollState(): void {
    if (!context || settings.readerPageMode !== 'scroll') {
        state = null
        return
    }
    state = {
        bookId: context.bookId,
        ids: context.ids,
        next: context.ids.indexOf(context.itemId) + 1,
        loading: false,
        container: context.container,
    }
}

function onScroll(): void {
    // 地址栏/标题同步做防抖：滚动停下才结算，避免在章节交界处反复切换，
    // 反复改 URL 会连带反复触发站点/脚本的重渲染。
    if (locationSyncTimer) clearTimeout(locationSyncTimer)
    locationSyncTimer = window.setTimeout(syncLocationState, 150)

    const st = state
    if (!st || st.loading || st.next >= st.ids.length) return
    const scroller = resolveScroller()
    if (scroller.scrollTop + scroller.clientHeight < scroller.scrollHeight - PREFETCH_PX) return
    void appendNext()
}

async function appendNext(): Promise<void> {
    const st = state
    if (!st || st.loading || st.next >= st.ids.length) return
    st.loading = true
    const id = st.ids[st.next] as string
    // 切回滚动翻页时 state 会按当前章重算，已经追加过的章节不要再抓一遍
    if (st.container.querySelector(`.${APPEND_CLASS}[data-item-id="${id}"]`)) {
        st.next += 1
        st.loading = false
        syncEndMark()
        return
    }
    try {
        const chapter = await getChapter(id)
        // 换章了，这批结果作废
        if (state !== st) return
        if (!chapter || typeof chapter.content !== 'string') {
            // 漫画章 / 取不到正文：跳过这一个，避免卡住
            st.next += 1
            syncEndMark()
            return
        }
        const section = buildSection(chapter, id)
        st.container.appendChild(section)
        st.next += 1
        bindFootnoteInteraction(section)
        if (settings.paraComment) void attachParaComments(section, id, st.bookId)
        // 纸色 + 清掉书源自带的白底（内联 !important，样式表压不过它）
        applyPaperTheme(st.container)
        // 追加上来的是最后一章 → 补上「全书完」；否则确保没有残留标记
        syncEndMark()
    } catch (err) {
        console.warn('[fqa:scroll] 追加下一章失败:', err)
    } finally {
        st.loading = false
    }
}

/** 把一章正文包成一个带分隔和标题的 section */
function buildSection(chapter: any, itemId: string): HTMLElement {
    const section = document.createElement('section')
    section.className = APPEND_CLASS
    section.dataset.itemId = itemId

    const chapterTitle = String(chapter?.novel_data?.title ?? '')
    if (chapterTitle) {
        const title = document.createElement('h2')
        title.className = APPEND_TITLE_CLASS
        title.textContent = chapterTitle
        section.appendChild(title)
    }

    const doc = new DOMParser().parseFromString(String(chapter.content), 'text/html')
    const body = doc.body
    // EPUB 相对路径的样式表在页面里解析不到，只会 404
    body.querySelectorAll('link[rel="stylesheet"]').forEach(el => el.remove())
    const article = body.querySelector('article')
    let target: HTMLElement = article ?? body

    /*
     * 关键：绝对不能把解析出来的 <body> 直接挂进页面。
     *
     * 它虽然挂在 <section> 下面，但对浏览器和站点样式表来说仍然是一个 body 元素：
     * - 会命中站点 `#app,.muye-reader,body,html{background-color:…}`、书籍自带的
     *   `body{background:#fff}` 这类规则 → 正文区域变白（标题在我们自己的 h2 上，
     *   不受影响，所以表现就是「标题正常、正文白」）；
     * - 还会带上 UA 默认的 8px 边距，和首章对不齐。
     * 换成 <div>，class / 内联样式照搬（书籍排版不受影响），只把背景声明摘掉。
     */
    if (target.tagName === 'BODY') {
        const wrap = document.createElement('div')
        wrap.className = body.className
        const style = body.getAttribute('style')
        if (style) wrap.setAttribute('style', style.replace(/background[^;]*;?/gi, ''))
        wrap.innerHTML = body.innerHTML
        target = wrap
    }

    // 章内注释：裂图标记换成可点上标，并重排文末注释列表
    processFootnotes(target)
    // 正文里通常自带标题，避免和我们加的 h2 重复
    if (chapterTitle) {
        const headings = target.querySelectorAll('h1, h2, h3')
        for (const h of Array.from(headings).slice(0, 2)) {
            if ((h.textContent ?? '').trim() === chapterTitle) {
                h.remove()
                break
            }
        }
    }
    section.appendChild(target)
    return section
}

// 换章入口的接管要在脚本加载时就挂上（document-start），才能早于站点的键盘监听
installChapterNavGuard()
