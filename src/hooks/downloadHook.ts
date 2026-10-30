// 书籍详情页的下载入口。
//
// /page/<bookId> 上，登录后有「加入书架」按钮，未登录只有「开始阅读」。
// 两种情况都在最后一个按钮后面插一个「下载」。页面是 SPA，按钮会被重新
// 渲染，所以用 MutationObserver 持续补。

import type { HookConfig } from '../config'
import { startDownload } from '../download'
import { getLastBook } from '../bookMemory'
import { ensureBookFallback } from '../bookFallback'
import {
    clearImageScanCache,
    getCachedImageScan,
    markCatalogImages,
    scanBookImages,
    watchCatalogMarks,
    type ImageScanResult,
} from '../imageScan'
import { settings } from '../settings'
import { waitForElement } from '../utils'
import { placeButton } from '../detailButtons'
import { syncFloatBarPath } from '../backTop'
import downloadcss from '../assets/download.css?raw'

const STYLE_ID = 'fqa-download-style'
const ENTRY_CLASS = 'fqa-dl-entry'
const IMAGE_ENTRY_CLASS = 'fqa-img-entry'

/** 优先跟在「加入书架」后面，没有就跟在「开始阅读」后面 */
const ANCHOR_SELECTOR = `.add-bookshelf-btn:not(.${ENTRY_CLASS}), .info-btn:not(.${ENTRY_CLASS})`

let observer: MutationObserver | null = null

function injectStyle() {
    if (document.getElementById(STYLE_ID)) return
    const style = document.createElement('style')
    style.id = STYLE_ID
    style.textContent = downloadcss
    document.head.appendChild(style)
}

/** /page/7143038691944959011 -> 7143038691944959011 */
function parseBookId(path: string): string {
    return path.match(/^\/page\/(\d+)/)?.[1] ?? ''
}

function isPagePath(path: string): boolean {
    return /^\/page\/\d+/.test(path)
}

/**
 * 原站按钮上带行为/定位的类名，复制外观时要去掉：
 * - add-bookshelf-btn / info-btn 会被页面脚本当成自己的按钮；
 * - 而且这两个 class 自带 `position:absolute; bottom:0; left:0`（书架按钮是
 *   left:160px），照抄会让我们的按钮压在「开始阅读」上面。定位由下面自己算。
 */
const FUNCTIONAL_CLASSES = ['add-bookshelf-btn', 'info-btn']

/** 复制原站按钮的外观类，视觉上和「加入书架」保持一致 */
function createButton(
    anchor: HTMLElement,
    label: string,
    extraClass: string,
    onClick: (btn: HTMLButtonElement) => void,
): HTMLButtonElement {
    const btn = document.createElement('button')
    btn.type = 'button'
    const classes = Array.from(anchor.classList).filter(c => !FUNCTIONAL_CLASSES.includes(c))
    btn.className = [...classes, extraClass].join(' ')
    // 原按钮内部是 <span>文字</span>，照抄结构避免样式错位
    btn.textContent = label
    btn.addEventListener('click', event => {
        event.preventDefault()
        event.stopPropagation()
        onClick(btn)
    })
    return btn
}

/** 「下载」按钮 */
function createDownloadButton(anchor: HTMLElement, bookId: string): HTMLButtonElement {
    return createButton(anchor, '下载', ENTRY_CLASS, () => {
        void startDownload(bookId, { format: settings.downloadFormat })
    })
}

/**
 * 「检查插图」按钮。
 *
 * 目录接口没有图片字段，只能逐章取正文判断，所以这里是**手动触发**的：
 * 点一下才开始扫，扫的过程中按钮上显示进度，完成后显示命中数量。
 * 结果进 imageScan 的缓存，重复点会直接给结论，不重复请求。
 */
function createImageScanButton(anchor: HTMLElement, bookId: string): HTMLButtonElement {
    const btn = createButton(anchor, '检查插图', IMAGE_ENTRY_CLASS, self => {
        if (self.dataset.busy === '1') return
        const start = (): void => {
            self.dataset.busy = '1'
            self.textContent = '检查中 0%'
            void scanBookImages(bookId, p => {
                if (p.phase === 'retry') {
                    self.textContent = `重试 ${p.retryDone ?? 0}/${p.retryTotal ?? 0}`
                    return
                }
                const pct = p.total ? Math.round((p.done / p.total) * 100) : 0
                self.textContent = `检查中 ${pct}%`
            })
                .then(result => {
                    // 整本扫完再统一标一次，保证目录里没有漏项的
                    markCatalogImages(bookId, result.hits)
                    self.textContent = result.hits.length ? `插图 ${result.hits.length} 章` : '无插图'
                    self.title = summary(result)
                    unsafeWindow.alert(summary(result))
                })
                .catch(err => {
                    self.textContent = '检查失败'
                    console.warn('[fqa:images] 检查失败:', err)
                })
                .finally(() => {
                    self.dataset.busy = '0'
                })
        }

        const cached = getCachedImageScan(bookId)
        if (cached) {
            // 已检查过：问一下是「看结果」还是「重新检查」
            const again = unsafeWindow.confirm(
                `${summary(cached)}\n\n点「确定」= 清除缓存并重新检查（会重新下载所有章节）\n点「取消」= 只看结果`,
            )
            markCatalogImages(bookId)
            if (!again) {
                self.title = summary(cached)
                self.textContent = cached.hits.length ? `插图 ${cached.hits.length} 章` : '无插图'
                return
            }
            clearImageScanCache(bookId)
            self.textContent = '检查插图'
        }
        start()
    })

    // 详情页那排按钮宽度有限，放不下第三个按钮（会被父容器裁掉一半），
    // 所以「清缓存」做成右键：不占位置，也不会影响排版。
    btn.title = '左键检查插图 · 右键清除本书缓存'
    btn.addEventListener('contextmenu', e => {
        e.preventDefault()
        e.stopPropagation()
        if (btn.dataset.busy === '1') return
        const cleared = clearImageScanCache(bookId)
        markCatalogImages(bookId)
        btn.textContent = cleared ? '已清除' : '无缓存'
        window.setTimeout(() => {
            btn.textContent = '检查插图'
        }, 1500)
    })
    return btn
}

/** 扫描结果的人话总结 */
function summary(r: ImageScanResult): string {
    const lines = [`共 ${r.total} 章，已检查 ${r.scanned} 章。`]
    lines.push(r.hits.length ? `其中 ${r.hits.length} 章含插图。` : '未发现含插图的章节。')
    if (r.skipped.length) lines.push(`${r.skipped.length} 章为付费/锁定章，未检查。`)
    if (r.failed.length) {
        lines.push(`${r.failed.length} 章获取失败，结论可能不完整：`)
        for (const [reason, count] of Object.entries(r.reasons).slice(0, 4)) {
            lines.push(`  · ${reason} × ${count}`)
        }
    }
    return lines.join('\n')
}

/**
 * 注入「下载」「检查插图」两个按钮。
 *
 * 原站这排按钮是绝对定位的（info-btn 在 left:0，add-bookshelf-btn 在 left:160px），
 * 我们的按钮也绝对定位，排在最右那个之后 —— 算法在 detailButtons.ts，
 * 兜底页复用同一份，保证两边排法一致。
 */
function inject(bookId: string): void {
    // 目录可能晚于按钮渲染（有的是滚动懒加载），有缓存就顺手补一次标记
    markCatalogImages(bookId)

    const anchors = Array.from(document.querySelectorAll<HTMLElement>(ANCHOR_SELECTOR))
    if (anchors.length === 0) return

    const existing = document.querySelector<HTMLElement>(`.${ENTRY_CLASS}`)
    const existingScan = document.querySelector<HTMLElement>(`.${IMAGE_ENTRY_CLASS}`)
    if (existing) {
        // 「加入书架」是登录态就绪后才渲染的，出现后要重新算一次位置，
        // 否则下载按钮会停在原来「开始阅读」右边、和书架按钮叠在一起
        placeButton(existing, anchors)
        if (existingScan) placeButton(existingScan, [...anchors, existing])
        return
    }

    // 多个按钮时挂在最后一个后面（加入书架在开始阅读之后）
    const anchor = anchors[anchors.length - 1]!
    if (!anchor.parentElement) return

    const btn = createDownloadButton(anchor, bookId)
    anchor.insertAdjacentElement('afterend', btn)

    // 「检查插图」紧跟下载按钮，手动触发，不自动扫描。
    // 清缓存不做成第三个按钮：那排按钮是固定宽度的绝对定位，第三个会被裁掉一半，
    // 改成右键「检查插图」按钮（见 createImageScanButton）。
    const scanBtn = createImageScanButton(anchor, bookId)
    btn.insertAdjacentElement('afterend', scanBtn)

    placeButton(btn, anchors)
    placeButton(scanBtn, [...anchors, btn])
}

function teardown(): void {
    observer?.disconnect()
    observer = null
    document.querySelectorAll(`.${ENTRY_CLASS}`).forEach(el => el.remove())
}

async function mainHook(_previous?: string): Promise<void> {
    const path = window.location.pathname

    // /page/undefined：服务端拿不到书号。用最近读过的书号补回去。
    if (/^\/page\/undefined\/?$/.test(path)) {
        const last = getLastBook()
        if (last?.bookId) {
            console.info('[fqa] 详情页缺少书号，回退到最近阅读:', last.bookId)
            unsafeWindow.location.replace(`/page/${last.bookId}`)
        }
        return
    }

    if (!isPagePath(path)) {
        teardown()
        syncFloatBarPath()
        return
    }

    // 右侧那三个产品入口（番茄小说 / 帮助中心 / 作家助手）不需要。
    // 实际隐藏由 installFloatBarHiding 在 document-start 注入的 CSS 完成，
    // 这里只在 SPA 换页后同步一次 <html> 上的标记。与下载开关无关。
    syncFloatBarPath()

    const bookId = parseBookId(path)

    // 目录的「含插图」标记独立于下载功能：只要本地存过检查结论就自动补上，
    // 不要求用户再点一次「检查插图」。只读缓存，不发任何请求。
    if (bookId) watchCatalogMarks(bookId)

    // 先尝试兜底：站点详情页可能整块空白（书被屏蔽），用 App 接口补出来
    void ensureBookFallback(bookId)

    if (!settings.enableDownload) {
        teardown()
        return
    }

    if (!bookId) return

    injectStyle()
    // 换书时旧按钮绑的是旧 bookId，先清掉
    teardown()

    await waitForElement(ANCHOR_SELECTOR, 8000)
    if (window.location.pathname !== path) return

    inject(bookId)

    // 「加入书架」是登录态就绪后才渲染的，之后还要补一次
    observer = new MutationObserver(() => {
        if (window.location.pathname !== path) return
        inject(bookId)
    })
    observer.observe(document.body, { childList: true, subtree: true })
}

function filter(path: string, _query: URLSearchParams, _hash: string): boolean {
    // 已注入时也要放行，否则离开详情页没机会清理
    // /page/undefined 也要进来：需要在这里把书号补回去
    return isPagePath(path) || /^\/page\/undefined\/?$/.test(path) || Boolean(observer)
}

const _exports: HookConfig[] = [
    {
        id: 'downloadHook_onload',
        event: 'load',
        filter,
        handler: mainHook,
    },
    {
        id: 'downloadHook_onurlchange',
        event: 'onUrlChange',
        filter,
        handler: mainHook,
    },
]

export default _exports
