// 阅读器「设置」面板：把日/夜主题、字号、翻页模式、段评开关合并到一个入口。

import { applyParaCommentState, refreshParaDrawerMetrics } from './paraComment'
import { refreshInfiniteScrollMode } from './readerScroll'
import { settings } from './settings'
import { sleep } from './utils'

const TOOL_ID = 'fqa-reader-settings'
const THEME_TOGGLE_ID = 'fqa-theme-toggle'
const DIALOG_ID = 'fqa-rs-dialog'
const STYLE_ID = 'fqa-rs-style'

const SUN_ICON =
    '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.4" ' +
    'stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4' +
    'M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>'
const MOON_ICON =
    '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.4" ' +
    'stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>'

const FONT_SIZES = [16, 20, 24, 28, 32]

const ICON =
    '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.4" ' +
    'stroke-linecap="round" stroke-linejoin="round">' +
    '<circle cx="12" cy="12" r="3"/>' +
    '<path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 8.9 19a1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 5 8.9a1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9.5a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9.5a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>' +
    '</svg>'

/* ---------------------------- 读取当前状态 ---------------------------- */

function isDark(): boolean {
    return document.documentElement.getAttribute('muye-data-theme') === 'dark'
}

/** 当前主题：夜间 / 米黄 / 日间 */
function currentTheme(): 'light' | 'sepia' | 'dark' {
    if (isDark()) return 'dark'
    return document.documentElement.classList.contains('fqa-theme-sepia') ? 'sepia' : 'light'
}

/** 站点把字号做成 muye-reader-content-NN 类挂在阅读器容器上 */
function fontSizeElement(): HTMLElement | null {
    return document.querySelector<HTMLElement>('[class*="muye-reader-content-"]')
}

function currentFontSize(): number {
    const el = fontSizeElement()
    const m = el ? /muye-reader-content-(\d+)/.exec(el.className) : null
    return m?.[1] ? Number(m[1]) : 24
}

/* ------------------------------ 应用设置 ------------------------------ */

const SEPIA_STYLE_ID = 'fqa-sepia-style'

/**
 * 米黄主题的变量覆盖。
 *
 * 必须尽早注入：script.css 要等 document.body 出现才注入（inject() 里在轮询），
 * 那时首帧已经画完，会出现「先日间、再变米黄」的闪动。
 * 这段在设置主题时立刻塞进 <head>，早于首次绘制。
 */
const SEPIA_CSS = `html.fqa-theme-sepia{
--web-text:#4a4436;--web-margin:#e0dac9;--web-bg:#f1ece0;--web-middle:#f0ebdd;--web-card:#f6f2e6;--web-white:#fff;
--web-gray_70:rgba(74,68,54,.7);--web-gray_40:rgba(74,68,54,.4);--web-gray_30:rgba(74,68,54,.3);
--web-gray_08:rgba(74,68,54,.08);--web-gray_05:rgba(74,68,54,.05);--web-gray_03:rgba(74,68,54,.03);
--web-mask:rgba(235,229,214,.3)}`

function ensureSepiaStyle(): void {
    if (document.getElementById(SEPIA_STYLE_ID)) return
    const style = document.createElement('style')
    style.id = SEPIA_STYLE_ID
    style.textContent = SEPIA_CSS
    const host = document.head ?? document.documentElement
    host?.appendChild(style)
}

export function setReaderTheme(theme: 'light' | 'sepia' | 'dark'): void {
    settings.readerTheme = theme
    // 米黄的变量覆盖要立刻生效，不能等 script.css（它要等 body 出现）
    ensureSepiaStyle()
    const root = document.documentElement
    // 站点只认 light / dark：米黄用 light 打底，再叠自己的变量（见 script.css）
    root.classList.toggle('fqa-theme-sepia', theme === 'sepia')
    root.setAttribute('muye-data-theme', theme === 'dark' ? 'dark' : 'light')
    // 记住最后一个日间主题，工具栏日/夜按钮切回日间时要用
    if (theme !== 'dark') settings.readerThemeLastDay = theme
    // 让工具栏按钮的图标/文案跟着变（设置面板里换主题时也走这里）
    syncThemeToggle()
}

export function setReaderFontSize(size: number): void {
    if (!FONT_SIZES.includes(size)) return
    settings.readerFontSize = size
    const el = fontSizeElement()
    if (!el) return
    const next = el.className.replace(/muye-reader-content-\d+/, `muye-reader-content-${size}`)
    if (next !== el.className) el.className = next
    // 抽屉里是 em，靠 --fqa-pc-base；改完立刻刷新，不用关掉再打开
    refreshParaDrawerMetrics()
}

/**
 * 翻页模式的外在表现：滚动翻页时给 <html> 挂 fqa-page-scroll，
 * 样式里据此隐藏站点自带的「上一章 / 下一章」按钮（见 script.css）。
 */
export function syncPageModeClass(): void {
    document.documentElement.classList.toggle('fqa-page-scroll', settings.readerPageMode === 'scroll')
}

/** 加载后把记住的主题/字号贴回去（没设置过就不干预站点） */
export function applyReaderPreferences(): void {
    // 主题配色是全局变量，只在阅读页套用，别把书城/书架也染了
    if (!location.pathname.startsWith('/reader')) return
    // 翻页模式的类要在首帧前就挂好，否则切到滚动翻页会先闪一下章节按钮
    syncPageModeClass()
    if (settings.readerTheme) {
        setReaderTheme(settings.readerTheme as 'light' | 'sepia' | 'dark')
        guardTheme()
    }
    if (settings.readerFontSize) setReaderFontSize(settings.readerFontSize)
}

let themeGuard: MutationObserver | null = null
let themeReverts = 0
let themeRevertTimer: ReturnType<typeof setTimeout> | null = null

/** 主题守卫的死循环保险丝：1 秒内被顶回来太多次就放弃，别把页面拖死 */
function themeRevertAllowed(): boolean {
    themeReverts++
    if (themeRevertTimer) clearTimeout(themeRevertTimer)
    themeRevertTimer = setTimeout(() => {
        themeReverts = 0
    }, 1000)
    if (themeReverts > 60) {
        themeGuard?.disconnect()
        themeGuard = null
        console.warn('[fqa] 主题守卫疑似死循环，已自动停用')
        return false
    }
    return true
}

/**
 * 防止站点在 React 挂载时把 muye-data-theme 改回默认值。
 *
 * 站点初始化会给 <html> 设主题属性，晚于我们 document-start 的设置，
 * 不改的话会先套用我们的主题、再被它改回日间（就是我们看到的闪一下）。
 * 这里盯着属性，一旦被改掉就立刻还原成用户选的主题。
 */
function guardTheme(): void {
    if (themeGuard) return
    const root = document.documentElement
    themeGuard = new MutationObserver(() => {
        const want = settings.readerTheme
        if (!want) return
        const wantDark = want === 'dark'
        const wantSepia = want === 'sepia'
        const darkMismatch = (root.getAttribute('muye-data-theme') === 'dark') !== wantDark
        const sepiaMismatch = root.classList.contains('fqa-theme-sepia') !== wantSepia
        // 已经一致就不写，避免「写 → observer 触发 → 再写」的自我循环
        if (!darkMismatch && !sepiaMismatch) return
        if (!themeRevertAllowed()) return
        if (darkMismatch) root.setAttribute('muye-data-theme', wantDark ? 'dark' : 'light')
        if (sepiaMismatch) root.classList.toggle('fqa-theme-sepia', wantSepia)
        // 被「别人」改过主题：说明刚点的那个工具栏按钮就是站点的日/夜按钮。
        // 站点改成纯图标（没有文字标签）时按文字匹配找不到它，这里用行为把它认出来并藏掉。
        // 只认 800ms 内的点击，避免把之前点过的「目录」之类误判成主题按钮。
        const culprit = lastSiteToolbarClick
        if (culprit && culprit.el.isConnected && Date.now() - culprit.t < 800) {
            culprit.el.classList.add(HIDE_CLASS)
            culprit.el.style.display = 'none'
        }
        lastSiteToolbarClick = null
        syncThemeToggle()
    })
    themeGuard.observe(root, { attributes: true, attributeFilter: ['class', 'muye-data-theme'] })
}

/** 最近一次点击的「站点自带」工具栏按钮（用于认出站点的日/夜按钮） */
let lastSiteToolbarClick: { el: HTMLElement; t: number } | null = null
let siteClickHooked = false

function hookSiteToolbarClicks(): void {
    if (siteClickHooked) return
    siteClickHooked = true
    document.addEventListener(
        'click',
        e => {
            const item = (e.target as HTMLElement | null)?.closest?.('.reader-toolbar-item') as HTMLElement | null
            if (!item) return
            if (item.id === TOOL_ID || item.id === THEME_TOGGLE_ID) return
            lastSiteToolbarClick = { el: item, t: Date.now() }
        },
        true,
    )
}

/* -------------------------------- 界面 -------------------------------- */

function ensureStyle(): void {
    if (document.getElementById(STYLE_ID)) return
    const style = document.createElement('style')
    style.id = STYLE_ID
    style.textContent = `
.fqa-rs-mask{position:fixed;inset:0;z-index:2147483700;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.35)}
.fqa-rs-panel{position:relative;width:min(560px,92vw);max-height:86vh;overflow:auto;padding:26px 28px 22px;border-radius:14px;background:#f7f5f0;color:#2b2b2b;box-shadow:0 16px 48px rgba(0,0,0,.24);font-size:14px;line-height:1.6}
[muye-data-theme='dark'] .fqa-rs-panel{background:#242428;color:#e6e6e6}
.fqa-rs-close{position:absolute;top:14px;right:14px;width:30px;height:30px;border:0;border-radius:50%;background:rgba(0,0,0,.06);color:inherit;font-size:15px;cursor:pointer}
.fqa-rs-title{margin:0 0 6px;font-size:22px;font-weight:600}
.fqa-rs-row{display:flex;align-items:center;gap:16px;padding:14px 0;border-bottom:1px solid rgba(127,127,127,.14)}
.fqa-rs-row:last-child{border-bottom:0}
.fqa-rs-label{flex:0 0 84px;color:#8a8a8a;font-size:14px}
.fqa-rs-body{flex:1 1 auto;display:flex;flex-wrap:wrap;align-items:center;gap:10px}
.fqa-rs-swatch{width:38px;height:38px;padding:0;border:1px solid rgba(0,0,0,.12);border-radius:50%;cursor:pointer;box-sizing:border-box}
.fqa-rs-swatch-on{outline:2px solid #f14646;outline-offset:2px}
.fqa-rs-swatch-day{background:#f7f5f0}
.fqa-rs-swatch-sepia{background:#ebe5d6}
.fqa-rs-swatch-night{background:#1f1f23}
.fqa-rs-group{display:flex;align-items:center;gap:14px;border-radius:10px;background:rgba(0,0,0,.06);padding:4px 10px}
.fqa-rs-btn{min-width:34px;padding:6px 8px;border:0;border-radius:6px;background:transparent;color:inherit;font-family:inherit;font-size:18px;cursor:pointer}
.fqa-rs-btn:hover{background:rgba(0,0,0,.08)}
.fqa-rs-value{min-width:52px;text-align:center;font-size:18px;font-weight:500;font-variant-numeric:tabular-nums}
.fqa-rs-seg{padding:8px 22px;border:1px solid rgba(0,0,0,.1);border-radius:8px;background:transparent;color:inherit;font-family:inherit;font-size:14px;cursor:pointer}
.fqa-rs-seg-on{border-color:#f14646;background:rgba(241,70,70,.08);color:#f14646;font-weight:600}
.fqa-rs-switch{appearance:none;flex:0 0 auto;position:relative;width:44px;height:24px;margin:0;border-radius:12px;background:rgba(0,0,0,.18);cursor:pointer;transition:background .18s ease}
.fqa-rs-switch::after{content:'';position:absolute;top:2px;left:2px;width:20px;height:20px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.2);transition:transform .18s ease}
.fqa-rs-switch:checked{background:#f14646}
.fqa-rs-switch:checked::after{transform:translateX(20px)}
/* 站点自带的日/夜、字号按钮：隐藏掉，避免和我们的按钮重复 */
.reader-toolbar .reader-toolbar-item.fqa-toolbar-hide{display:none!important}
`
    document.head.appendChild(style)
}

function buildDialog(): HTMLElement {
    const mask = document.createElement('div')
    mask.className = 'fqa-rs-mask'
    mask.id = DIALOG_ID
    mask.addEventListener('click', e => {
        if (e.target === mask) close()
    })

    const panel = document.createElement('div')
    panel.className = 'fqa-rs-panel'
    panel.innerHTML = '<button class="fqa-rs-close" type="button" aria-label="关闭">✕</button>' +
        '<h3 class="fqa-rs-title">设置</h3>'

    const row = (label: string): HTMLElement => {
        const el = document.createElement('div')
        el.className = 'fqa-rs-row'
        el.innerHTML = `<span class="fqa-rs-label">${label}</span>`
        const body = document.createElement('div')
        body.className = 'fqa-rs-body'
        el.appendChild(body)
        panel.appendChild(el)
        return body
    }

    /* 阅读主题：日间 / 米黄 / 夜间 */
    const themeBody = row('阅读主题')
    const syncTheme = () => {
        const cur = currentTheme()
        themeBody.querySelectorAll<HTMLElement>('.fqa-rs-swatch').forEach(el => {
            el.classList.toggle('fqa-rs-swatch-on', el.dataset.theme === cur)
        })
    }
    const makeSwatch = (cls: string, title: string, theme: 'light' | 'sepia' | 'dark') => {
        const el = document.createElement('button')
        el.type = 'button'
        el.className = `fqa-rs-swatch ${cls}`
        el.title = title
        el.dataset.theme = theme
        el.addEventListener('click', () => {
            setReaderTheme(theme)
            syncTheme()
            syncFont()
        })
        themeBody.appendChild(el)
    }
    makeSwatch('fqa-rs-swatch-day', '日间', 'light')
    makeSwatch('fqa-rs-swatch-sepia', '米黄', 'sepia')
    makeSwatch('fqa-rs-swatch-night', '夜间', 'dark')

    /* 字号 */
    const fontBody = row('字体大小')
    const group = document.createElement('div')
    group.className = 'fqa-rs-group'
    const minus = document.createElement('button')
    minus.type = 'button'
    minus.className = 'fqa-rs-btn'
    minus.textContent = 'A-'
    const value = document.createElement('span')
    value.className = 'fqa-rs-value'
    const plus = document.createElement('button')
    plus.type = 'button'
    plus.className = 'fqa-rs-btn'
    plus.textContent = 'A+'
    const syncFont = () => {
        value.textContent = String(currentFontSize())
    }
    minus.addEventListener('click', () => {
        const i = FONT_SIZES.indexOf(currentFontSize())
        setReaderFontSize(FONT_SIZES[Math.max(0, i - 1)] ?? 16)
        syncFont()
    })
    plus.addEventListener('click', () => {
        const i = FONT_SIZES.indexOf(currentFontSize())
        setReaderFontSize(FONT_SIZES[Math.min(FONT_SIZES.length - 1, i + 1)] ?? 32)
        syncFont()
    })
    group.append(minus, value, plus)
    fontBody.appendChild(group)

    /* 翻页模式 */
    const modeBody = row('翻页模式')
    const chapterBtn = document.createElement('button')
    chapterBtn.type = 'button'
    chapterBtn.className = 'fqa-rs-seg'
    chapterBtn.textContent = '章节翻页'
    const scrollBtn = document.createElement('button')
    scrollBtn.type = 'button'
    scrollBtn.className = 'fqa-rs-seg'
    scrollBtn.textContent = '滚动翻页'
    const syncMode = () => {
        const scroll = settings.readerPageMode === 'scroll'
        chapterBtn.classList.toggle('fqa-rs-seg-on', !scroll)
        scrollBtn.classList.toggle('fqa-rs-seg-on', scroll)
    }
    chapterBtn.addEventListener('click', () => {
        settings.readerPageMode = 'chapter'
        refreshInfiniteScrollMode()
        syncPageModeClass()
        syncMode()
    })
    scrollBtn.addEventListener('click', () => {
        settings.readerPageMode = 'scroll'
        refreshInfiniteScrollMode()
        syncPageModeClass()
        syncMode()
    })
    modeBody.append(chapterBtn, scrollBtn)

    /* 段评 */
    const paraBody = row('段评')
    const paraSwitch = document.createElement('input')
    paraSwitch.type = 'checkbox'
    paraSwitch.className = 'fqa-rs-switch'
    paraSwitch.checked = settings.paraComment
    paraSwitch.addEventListener('change', () => {
        settings.paraComment = paraSwitch.checked
        applyParaCommentState()
    })
    paraBody.appendChild(paraSwitch)

    syncTheme()
    syncFont()
    syncMode()

    panel.querySelector('.fqa-rs-close')?.addEventListener('click', () => close())
    mask.appendChild(panel)
    return mask
}

function close(): void {
    document.getElementById(DIALOG_ID)?.remove()
    document.removeEventListener('keydown', onKey, true)
}

function onKey(e: KeyboardEvent): void {
    if (e.key === 'Escape') close()
}

export function openReaderSettings(): void {
    if (document.getElementById(DIALOG_ID)) return
    ensureStyle()
    document.body.appendChild(buildDialog())
    document.addEventListener('keydown', onKey, true)
}

/* ------------------------------ 工具栏入口 ------------------------------ */

export function initReaderSettings(): void {
    void ensureEntry()
}

/** 工具栏按钮：站点同款结构 */
function makeEntry(id: string, label: string, icon: string, onClick: () => void): HTMLElement {
    const btn = document.createElement('div')
    btn.id = id
    btn.className = 'reader-toolbar-item fqa-rs-tool'
    btn.setAttribute('role', 'button')
    btn.setAttribute('tabindex', '0')
    btn.innerHTML =
        `<div class="reader-toolbar-item-icon">${icon}</div>` +
        `<div class="reader-toolbar-item-font">${label}</div>`
    btn.addEventListener('click', e => {
        e.preventDefault()
        e.stopPropagation()
        onClick()
    })
    return btn
}

/** 日/夜按钮：在「夜间」和「最后选中的日间主题」之间切换 */
function toggleDayNight(): void {
    const next = isDark() ? (settings.readerThemeLastDay || 'light') : 'dark'
    setReaderTheme(next)
    syncThemeToggle()
}

/** 上次给哪个按钮写了哪套图标（不能靠 innerHTML 比对，原因见 syncThemeToggle） */
let themeIconBtn: HTMLElement | null = null
let themeIconFor: 'dark' | 'light' | null = null

function syncThemeToggle(): void {
    const btn = document.getElementById(THEME_TOGGLE_ID)
    if (!btn) return
    const dark = isDark()
    const want: 'dark' | 'light' = dark ? 'dark' : 'light'
    // 注意：这里不能写成 `if (icon.innerHTML !== nextIcon)`。
    // SVG 用 innerHTML 赋值后会被重新序列化（<path .../> → <path ...></path>），
    // 读回来的字符串和原串永远不相等，会变成「写 → observer 触发 → 再写」的死循环，
    // 直接把标签页卡死。改成记住「上次写了哪一套」。
    if (themeIconBtn !== btn || themeIconFor !== want) {
        const icon = btn.querySelector('.reader-toolbar-item-icon')
        if (icon) icon.innerHTML = dark ? SUN_ICON : MOON_ICON
        themeIconBtn = btn
        themeIconFor = want
    }
    const label = btn.querySelector('.reader-toolbar-item-font')
    const nextLabel = dark ? '日间' : '夜间'
    if (label && label.textContent !== nextLabel) label.textContent = nextLabel
}

/** 站点自带的按钮（日/夜、字号、主题…）：按整块文字和 title/aria-label 兜底匹配 */
const SITE_ITEM_RE = /夜间|日间|白天|护眼|字号|字体|主题|背景|自动订阅/
const HIDE_CLASS = 'fqa-toolbar-hide'

/**
 * 把站点自带的日/夜、字号按钮藏掉。
 *
 * 只认 .reader-toolbar-item-font 的文案不够稳：站点有时候先渲染空标签、
 * 之后再填文字，或者整个工具栏重渲染把 style 冲掉，于是出现两个日/夜按钮。
 * 这里改成「整块文字 + title/aria-label」匹配，并且由 MutationObserver 反复补，
 * 写操作都是幂等的（已经隐藏过就不再写），不会自触发死循环。
 */
function hideSiteToolbarItems(toolbar: HTMLElement): void {
    const items = toolbar.querySelectorAll<HTMLElement>('.reader-toolbar-item')
    for (const item of items) {
        if (item.id === TOOL_ID || item.id === THEME_TOGGLE_ID) continue
        const text = (item.textContent ?? '').replace(/\s+/g, '')
        const meta = `${item.getAttribute('title') ?? ''}${item.getAttribute('aria-label') ?? ''}`
        if (!SITE_ITEM_RE.test(text + meta)) continue
        if (!item.classList.contains(HIDE_CLASS)) item.classList.add(HIDE_CLASS)
        if (item.style.display !== 'none') item.style.display = 'none'
    }
}

let toolbarObserver: MutationObserver | null = null
let toolbarWatched: HTMLElement | null = null
let toolbarBusy = false
let toolbarPasses = 0
let toolbarPassTimer: ReturnType<typeof setTimeout> | null = null

/** 死循环保险丝：1 秒内回调次数异常就直接停掉监听（宁可少藏一个按钮，也不能卡死页面） */
function toolbarPassAllowed(): boolean {
    toolbarPasses++
    if (toolbarPassTimer) clearTimeout(toolbarPassTimer)
    toolbarPassTimer = setTimeout(() => {
        toolbarPasses = 0
    }, 1000)
    if (toolbarPasses > 120) {
        toolbarObserver?.disconnect()
        toolbarObserver = null
        console.warn('[fqa] 工具栏监听疑似死循环，已自动停用')
        return false
    }
    return true
}

/** 工具栏一变（重渲染 / 补文字），立刻重新隐藏并同步按钮状态 */
function watchToolbar(toolbar: HTMLElement): void {
    if (toolbarObserver && toolbarWatched === toolbar) return
    toolbarObserver?.disconnect()
    toolbarWatched = toolbar
    toolbarObserver = new MutationObserver(() => {
        // 重入保护 + 结束后丢弃自己造成的变更记录，避免「自己写 → 自己再触发」
        if (toolbarBusy) return
        if (!toolbarPassAllowed()) return
        toolbarBusy = true
        try {
            hideSiteToolbarItems(toolbar)
            syncThemeToggle()
        } finally {
            toolbarObserver?.takeRecords()
            toolbarBusy = false
        }
    })
    toolbarObserver.observe(toolbar, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style'],
    })
}


async function ensureEntry(): Promise<void> {
    for (let attempt = 0; attempt < 40; attempt++) {
        const toolbar = document.querySelector<HTMLElement>('.reader-toolbar')
        if (toolbar) {
            // 合并入口：把站点的日/夜、字号，以及我们自己的段评开关都收起来
            // 隐藏用的 .fqa-toolbar-hide 规则在这里就要注入，不能等打开设置面板
            ensureStyle()
            hideSiteToolbarItems(toolbar)
            watchToolbar(toolbar)
            hookSiteToolbarClicks()
            const paraToggle = document.getElementById('fqa-pc-toggle')
            if (paraToggle) paraToggle.style.display = 'none'

            // 统一插到「回到顶部」之前，保证顺序是 … 日/夜 → 设置 → 顶部
            const insertAtEnd = (el: HTMLElement) => {
                const backTop = document.getElementById('fqa-back-top')
                if (backTop?.parentElement && toolbar.contains(backTop)) {
                    backTop.insertAdjacentElement('beforebegin', el)
                    return
                }
                const all = toolbar.querySelectorAll<HTMLElement>('.reader-toolbar-item')
                const tail = all[all.length - 1]
                if (tail) tail.insertAdjacentElement('afterend', el)
                else toolbar.appendChild(el)
            }

            if (!document.getElementById(TOOL_ID)) {
                insertAtEnd(makeEntry(TOOL_ID, '设置', ICON, () => openReaderSettings()))
            }
            if (!document.getElementById(THEME_TOGGLE_ID)) {
                const themeBtn = makeEntry(THEME_TOGGLE_ID, '', MOON_ICON, () => toggleDayNight())
                const settingsBtn = document.getElementById(TOOL_ID)
                if (settingsBtn) settingsBtn.insertAdjacentElement('beforebegin', themeBtn)
                else insertAtEnd(themeBtn)
            }
            syncThemeToggle()
            return
        }
        await sleep(200)
    }
}
