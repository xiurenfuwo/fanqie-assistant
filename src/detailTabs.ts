// 详情页「目录 / 书评」切换。
//
// 站点的详情页正文区结构是：
//   .page-body
//     .page-abstract-*        作品简介
//     .page-directory-header  目录标题（h3: 目录・547章）
//     .page-directory-content 章节列表
//
// 兜底页（被屏蔽的书，见 bookFallback.ts）刻意沿用了同一套类名，所以这一层
// 不用区分两种页面：把站点原来的目录标题换成自己的两个 tab，正文区在
// 「目录」与「书评」之间切换，书评用 Vue 挂进一个独立容器。
//
// 站点是 React 渲染的，重渲染可能把它管理的子树整块换掉。我们的容器被移走时
// 不重新 createApp（那样会丢状态），而是把**同一个容器节点**重新插回去。

import { createApp, h, ref, type App } from 'vue'
import BookReviews from './views/BookReviews.vue'
import reviewscss from './assets/reviews.css?raw'
import { sleep } from './utils'

const STYLE_ID = 'fqa-reviews-style'
const TABS_ID = 'fqa-dt-tabs'
const PANE_ID = 'fqa-dt-reviews'
/** 站点目录标题：注入成功后隐藏它，避免和我们 tab 重复 */
const SITE_HEADER_CLASS = 'fqa-dt-site-header-hide'

export type DetailTab = 'directory' | 'reviews'

interface Mounted {
    bookId: string
    app: App
    container: HTMLElement
    tabBar: HTMLElement
    active: DetailTab
    /** 组件暴露的入口：第一次切到书评时才拉列表 */
    start: () => void
}

let mounted: Mounted | null = null
let observer: MutationObserver | null = null

function injectStyle(): void {
    if (document.getElementById(STYLE_ID)) return
    const style = document.createElement('style')
    style.id = STYLE_ID
    style.textContent = reviewscss
    document.head.appendChild(style)
}

/** 详情页正文区（简介 + 目录所在的白色卡片） */
function pageBody(): HTMLElement | null {
    return document.querySelector<HTMLElement>('.page-body')
}

function directoryContent(): HTMLElement | null {
    return document.querySelector<HTMLElement>('.page-directory-content')
}

function directoryHeader(): HTMLElement | null {
    return document.querySelector<HTMLElement>('.page-directory-header')
}

/** 把书评容器显示出来、目录藏起来（或反过来） */
function applyTab(m: Mounted): void {
    const dir = directoryContent()
    if (dir) dir.style.display = m.active === 'directory' ? '' : 'none'
    m.container.style.display = m.active === 'reviews' ? '' : 'none'
    for (const btn of Array.from(m.tabBar.querySelectorAll<HTMLElement>('[data-tab]'))) {
        btn.classList.toggle('on', btn.dataset.tab === m.active)
    }
}

/** 切 tab。第一次切到书评时才让组件去请求列表 */
function selectTab(m: Mounted, tab: DetailTab): void {
    m.active = tab
    applyTab(m)
    if (tab === 'reviews') m.start()
}

function buildTabs(m: Mounted): HTMLElement {
    const bar = document.createElement('div')
    bar.id = TABS_ID
    bar.className = 'fqa-dt-tabs'

    const make = (tab: DetailTab, label: string): HTMLButtonElement => {
        const btn = document.createElement('button')
        btn.type = 'button'
        btn.className = 'fqa-dt-tab'
        btn.dataset.tab = tab
        btn.appendChild(document.createTextNode(label))
        btn.addEventListener('click', e => {
            e.preventDefault()
            e.stopPropagation()
            selectTab(m, tab)
        })
        return btn
    }

    // 两个 tab 都只显示文字：章数在目录内容里本来就有，标题上不再重复
    bar.appendChild(make('directory', '目录'))
    bar.appendChild(make('reviews', '书评'))
    return bar
}

/**
 * 挂载（或复用）详情页的书评 tab。
 *
 * @param bookId 当前详情页的书号；换书时会重建，同书重复调用只做一次位置修补
 */
export function mountDetailTabs(bookId: string): void {
    if (!bookId) return
    const body = pageBody()
    const dir = directoryContent()
    if (!body || !dir) return

    // 同一本书、容器和 tab 还挂在页面上：只确保状态正确即可
    if (mounted && mounted.bookId === bookId) {
        if (!document.contains(mounted.tabBar)) {
            const header = directoryHeader()
            header ? body.insertBefore(mounted.tabBar, header) : body.insertBefore(mounted.tabBar, dir)
        }
        if (!document.contains(mounted.container)) {
            dir.insertAdjacentElement('afterend', mounted.container)
        }
        hideSiteHeader()
        applyTab(mounted)
        return
    }

    teardown()
    injectStyle()

    // 书评容器先建好，Vue 挂在里面
    const container = document.createElement('div')
    container.id = PANE_ID
    container.className = 'fqa-dt-pane'
    container.style.display = 'none'

    // 子组件通过 defineExpose 暴露 start；用 ref 直接拿到实例方法，
    // 不去读 app._instance 这类内部字段
    const reviewsRef = ref<{ start?: () => void } | null>(null)
    const app = createApp({
        render: () => h(BookReviews, { bookId, ref: reviewsRef }),
    })
    app.config.errorHandler = (err, _inst, info) => {
        console.error(`[fqa:review] Vue error (${info}):`, err)
    }
    app.mount(container)

    const record: Mounted = {
        bookId,
        app,
        container,
        tabBar: document.createElement('div'),
        active: 'directory',
        start: () => reviewsRef.value?.start?.(),
    }
    record.tabBar = buildTabs(record)

    const header = directoryHeader()
    if (header) body.insertBefore(record.tabBar, header)
    else body.insertBefore(record.tabBar, dir)
    dir.insertAdjacentElement('afterend', container)

    hideSiteHeader()
    applyTab(record)
    mounted = record

    // 站点重渲染可能把我们的节点冲掉，观察一下补回来（不重建 Vue 实例）
    if (!observer) {
        observer = new MutationObserver(() => {
            if (!mounted) return
            if (!document.contains(mounted.tabBar) || !document.contains(mounted.container)) {
                const b = pageBody()
                const d = directoryContent()
                if (!b || !d) return
                if (!document.contains(mounted.tabBar)) {
                    const hd = directoryHeader()
                    hd ? b.insertBefore(mounted.tabBar, hd) : b.insertBefore(mounted.tabBar, d)
                }
                if (!document.contains(mounted.container)) d.insertAdjacentElement('afterend', mounted.container)
                hideSiteHeader()
                applyTab(mounted)
            }
        })
        observer.observe(document.body, { childList: true, subtree: true })
    }
}

/** 隐藏站点自带的目录标题（只在我们的 tab 存在时） */
function hideSiteHeader(): void {
    const header = directoryHeader()
    if (header && !header.classList.contains(SITE_HEADER_CLASS)) {
        header.classList.add(SITE_HEADER_CLASS)
    }
}

export function teardown(): void {
    observer?.disconnect()
    observer = null
    if (mounted) {
        mounted.app.unmount()
        mounted.container.remove()
        mounted.tabBar.remove()
        mounted = null
    }
    document.querySelectorAll<HTMLElement>(`.${SITE_HEADER_CLASS}`).forEach(el => {
        el.classList.remove(SITE_HEADER_CLASS)
    })
    const dir = directoryContent()
    if (dir) dir.style.display = ''
}

/**
 * 等详情页渲染出目录后挂 tab。
 *
 * 详情页是 SPA，DOM 出现时机不固定（兜底页还要等 App 接口回来），
 * 所以轮询等一小会儿；期间换页/换书就放弃。
 */
export async function ensureDetailTabs(bookId: string): Promise<void> {
    // 先轮询等一小会儿（大多数情况几百毫秒内就有）
    for (let i = 0; i < 25; i++) {
        if (!window.location.pathname.startsWith(`/page/${bookId}`)) return
        if (pageBody() && directoryContent()) {
            mountDetailTabs(bookId)
            return
        }
        await sleep(200)
    }

    // 还没出来：多半是被屏蔽的书，兜底页要等 App 接口回来才把结构插进去，
    // 那个耗时不确定（还包含书籍信息 + 目录两次请求），改成观察者兜底。
    if (!window.location.pathname.startsWith(`/page/${bookId}`)) return
    const waitObserver = new MutationObserver(() => {
        if (!window.location.pathname.startsWith(`/page/${bookId}`)) {
            waitObserver.disconnect()
            return
        }
        if (pageBody() && directoryContent()) {
            waitObserver.disconnect()
            mountDetailTabs(bookId)
        }
    })
    waitObserver.observe(document.body, { childList: true, subtree: true })
}
