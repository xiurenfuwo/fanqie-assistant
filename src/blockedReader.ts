// 被网页端屏蔽的书籍 —— 阅读页补齐。
//
// 正常的阅读页由站点自己给：__INITIAL_STATE__.reader 里带 chapterData 和 catalogData，
// 目录弹窗、导航栏标题都从这两份数据渲染。被屏蔽的书这两份都是空的 {}（详情页则是
// 整页空壳，见 bookFallback.ts），于是：
//   1. 顶部导航标题只剩一个返回箭头，没有章节名；
//   2. 目录弹窗打开是空的（站点拿 catalogData 渲染，空对象就渲染出 0 条）。
// 正文脚本本来就能从 App 接口拿到目录，这里用同一份数据把上面两处补上。
//
// 两个实现要点，都是从 Reader.63252b77.js 的目录组件里读出来的：
//   - 弹窗是 <Transition unmountOnExit>，关掉就整个从 DOM 卸载，下次打开是全新的节点。
//     所以必须常驻观察、每次出现都补，不能只在 setup 时补一次。
//   - 章节行是 .chapter > .chapter-text（纯文本，不是 <a>），点击由 React 的 onClick 处理。
//     我们补的节点不在 React 树里，但 paraComment 里已有按 data-item-id 的目录项点击接管，
//     所以保真结构 + data-item-id 即可，跳转仍然走脚本自己的导航钩子。

import { ensureCatalogFilled, isBlockedReader } from './blockedBook'
import type { Book } from './types'

const NAV_TITLE = 'h1.muye-reader-nav-title'
const NAV_LINK_CLASS = 'fqa-nav-book-link'
/** 目录弹窗容器：站点用 .muye-slide-right-* 做入场动画，出现即说明打开了 */
const CATALOG_SELECTOR = '.reader-catalog'

/** 记下当前这本（被屏蔽的）书的书号，供导航标题 / 目录补齐使用 */
let blockedBookId = ''
let blockedBook: Book | null = null
let blockedItemId = ''

/** 书号刚拿到时的回调（实现见下方目录弹窗一节，用惰性引用避免声明顺序问题） */
let onBookKnown: () => void = () => {}

export function rememberBlockedBook(bookId: string, book: Book | null, itemId: string): void {
    if (bookId) blockedBookId = bookId
    if (book) blockedBook = book
    if (itemId) blockedItemId = itemId
    // 书号刚拿到：如果用户此时已经把目录打开了（弹窗里还是空的），立刻补上
    onBookKnown()
}

/* ------------------------------ 导航栏标题 ------------------------------ */

/**
 * 补导航栏标题。
 *
 * 站点的结构是 `<h1 class="muye-reader-nav-title"><svg 返回箭头/>章节名</h1>`，
 * 被屏蔽时 svg 后面什么都没有。这里保留 svg，只把书名补上；书号已知时包一层链接
 * 指向详情页（走到脚本自己的兜底详情页也能看）。
 */
export function patchNavTitle(bookTitle?: string): void {
    const h1 = document.querySelector<HTMLElement>(NAV_TITLE)
    if (!h1) return
    if (blockedBookId) h1.dataset.bookId = blockedBookId

    // 已经补过就不要重复追加（站点每次重渲染会换掉 h1，届时自然重新补）
    if (h1.querySelector(`.${NAV_LINK_CLASS}`)) {
        ensureBackLink(h1)
        return
    }
    // 已有章节名（正常书）就不要动它
    const existingText = Array.from(h1.childNodes)
        .filter(n => n.nodeType === Node.TEXT_NODE)
        .map(n => n.textContent?.trim() ?? '')
        .join('')
    const label = (bookTitle ?? blockedBook?.title ?? '').trim()

    if (label && !existingText) {
        if (blockedBookId) {
            const link = document.createElement('a')
            link.className = NAV_LINK_CLASS
            link.href = `/page/${blockedBookId}`
            link.textContent = label
            h1.appendChild(link)
        } else {
            h1.appendChild(document.createTextNode(label))
        }
    }
    ensureBackLink(h1)
}

/**
 * 屏蔽书的返回箭头：站点没给上一章，点了会原地不动。
 * 改用浏览历史，历史里没有就回详情页。正常书不接管。
 */
function ensureBackLink(h1: HTMLElement): void {
    const svg = h1.querySelector('svg')
    if (!svg || svg.dataset.fqaBack === '1') return
    if (!isBlockedReader()) return
    svg.dataset.fqaBack = '1'
    svg.style.cursor = 'pointer'
    svg.addEventListener(
        'click',
        event => {
            event.preventDefault()
            event.stopPropagation()
            if (window.history.length > 1) window.history.back()
            else if (blockedBookId) window.location.href = `/page/${blockedBookId}`
        },
        true,
    )
}

/* ------------------------------ 目录弹窗 ------------------------------ */

let catalogObserver: MutationObserver | null = null
/** 一次补目录请求还没回来：避免弹窗开关时的多次回调叠成多份请求 */
let catalogFilling = false
/** 补完后再复查一次的定时器（React 可能在同一帧里把子节点再刷一遍） */
let catalogRecheckTimer: ReturnType<typeof setTimeout> | null = null

/** 我们自己在往弹窗里写节点：这段时间的观察回调忽略掉，避免自己触发自己 */
let suppressObserver = false

function scheduleFill(): void {
    if (!blockedBookId) return
    if (suppressObserver) return
    if (catalogFilling) {
        // 正在补：等它结束后再看一眼，避免这次变更被吞掉
        if (catalogRecheckTimer) return
        catalogRecheckTimer = setTimeout(() => {
            catalogRecheckTimer = null
            scheduleFill()
        }, 300)
        return
    }
    const dialog = document.querySelector<HTMLElement>(CATALOG_SELECTOR)
    // 弹窗没开就不必取目录
    if (!dialog) return

    catalogFilling = true
    suppressObserver = true
    void ensureCatalogFilled(blockedBook, blockedBookId, blockedItemId || currentItemId())
        .catch(err => console.warn('[fqa:blocked] 补目录失败:', err))
        .finally(() => {
            catalogFilling = false
            // 把我们自己写入产生的变更记录丢掉，避免下一轮又触发
            catalogObserver?.takeRecords()
            suppressObserver = false
            // React 有可能在我们写完子节点后又同步重渲染一次，复查一遍保证最终有内容。
            // 只有确实又空了才重来，否则就是死循环。
            if (catalogRecheckTimer) clearTimeout(catalogRecheckTimer)
            catalogRecheckTimer = setTimeout(() => {
                catalogRecheckTimer = null
                if (ensureCatalogNeedsRecheck()) scheduleFill()
            }, 600)
        })
}

/** 弹窗还开着且仍然没有章节 */
function ensureCatalogNeedsRecheck(): boolean {
    const dialog = document.querySelector<HTMLElement>(CATALOG_SELECTOR)
    if (!dialog) return false
    return !dialog.querySelector('#catalog-content .chapter, .reader-catalog-chapters .chapter')
}

// 书号到手后（可能晚于用户打开目录）主动补一次
onBookKnown = () => {
    if (blockedBookId) scheduleFill()
}

/**
 * 常驻观察：目录弹窗每次挂载（打开目录）、或者 React 重渲染章节区，
 * 都检查一遍并在需要时补内容。补齐本身是幂等的（已有 .chapter 就跳过）。
 */
export function watchCatalog(): void {
    if (catalogObserver) return
    catalogObserver = new MutationObserver(() => {
        // 书号没到手（正常书 / 还没解析出书名）就先不管，避免在没有意义的页面上做多余工作
        if (!blockedBookId) return
        scheduleFill()
    })
    // 监听整个文档：弹窗挂载在阅读器内部的任意深度，且 React 会重建子树
    catalogObserver.observe(document.documentElement, { childList: true, subtree: true })
    // 导航栏也可能被 React 重建，顺手补标题
    if (isBlockedReader()) patchNavTitle()
    scheduleFill()
}

/**
 * 页面一进来就挂上观察：被屏蔽的书连正文都取不到，setupBlockedReader 可能要等
 * App 接口回来才执行；但用户完全可能先把目录打开。这里尽早绑定，等书号到手
 * （rememberBlockedBook）后，用户打开目录时就会自动补上。
 */
export function initBlockedReader(): void {
    // 不在 onLoad 里做 isBlockedReader 判断：那时 __INITIAL_STATE__ 往往还没写入，
    // 状态为空会被当成「被屏蔽」。观察本身很便宜，且没有书号时什么也不做，
    // 正常书由 setupBlockedReader 在拿到书号后按真实状态摘掉。
    watchCatalog()
}

function stopWatchingCatalog(): void {
    catalogObserver?.disconnect()
    catalogObserver = null
    if (catalogRecheckTimer) clearTimeout(catalogRecheckTimer)
    catalogRecheckTimer = null
    catalogFilling = false
    suppressObserver = false
}

function currentItemId(): string {
    return window.location.pathname.split('/').filter(Boolean).pop()?.substring(0, 19) ?? ''
}

/**
 * 阅读页进入 / 换章时调用：被屏蔽的书补导航标题并开始观察目录弹窗，
 * 正常书把上一轮挂的监听拆掉。
 */
export function setupBlockedReader(book: Book | null, itemId: string): void {
    if (!isBlockedReader()) {
        stopWatchingCatalog()
        // 正常书：把上一本书残留的补丁摘掉（换书 / 换章时站点可能复用 h1）
        document.querySelector<HTMLElement>(NAV_TITLE)?.removeAttribute('data-book-id')
        return
    }
    rememberBlockedBook(book?.book_id ?? '', book, itemId)
    patchNavTitle(book?.title)
    watchCatalog()
}
