import { watch } from 'vue'
import { settings } from './settings'

const STYLE_ID = 'fqa-user-style'

/**
 * 阅读器正文容器。
 *
 * 站点把正文挂在 .muye-reader-box 上（同时带字号类 muye-reader-content-NN 和
 * 字体类 font-XXXX），并且**用内联 style 写 font-family**。脚本接管后的正文在
 * #fqa-reader-content（.muye-reader-box 的兄弟/子容器）。
 *
 * 注意：.muye-reader-title / .muye-reader-subtitle 不在这里 —— 它们是标题和
 * 「本章字数/更新时间」那行，站点有自己的排版，只让字体系真正作用于正文。
 */
const READER_SCOPE = [
    // 脚本接管后的正文容器（克隆自 .muye-reader-content，同时带这个类）
    '#fqa-reader-content',
    // 站点原始正文容器：未接管 / 漫画章等场景仍用它
    '.muye-reader-box .muye-reader-content',
].join(', ')

/** 正文里可能出现的块级/行内元素，统一继承正文字体 */
const BODY_DESCENDANTS = [
    '#fqa-reader-content p',
    '#fqa-reader-content blk',
    '#fqa-reader-content div',
    '#fqa-reader-content span:not(.fqa-pc-chip)',
    '#fqa-reader-content article',
].join(', ')

function buildCss(): string {
    const parts: string[] = []

    const font = settings.readerFont.trim()
    if (font) {
        // font-family 的值只能是字体族列表，「inherit」是全局关键字，混在列表里
        // 会让**整条声明失效**（浏览器直接丢弃）。之前末尾拼 `, inherit` 正是因此
        // 完全不生效。要兜底就把原本的字体族追加在后面，或者干脆不加。
        const family = normalizeFamily(font)
        parts.push(
            `${READER_SCOPE}, ${BODY_DESCENDANTS} { font-family: ${family} !important; }`,
        )
    }

    if (settings.customCssEnabled && settings.customCss.trim()) {
        parts.push(settings.customCss)
    }

    return parts.join('\n')
}

/**
 * 用户填的字体名 → 合法的 font-family 值。
 *
 * - 已经像一条完整声明（含逗号 / 引号）就原样用，让用户能写「A, B, serif」；
 * - 单个名字加引号（名字里有空格/中文时必须）；
 * - 末尾追加 serif，保证字体缺失时退到有衬线体而不是浏览器默认的怪异回退。
 */
function normalizeFamily(input: string): string {
    if (/[,]/.test(input)) return input
    const quoted = /^["'].*["']$/.test(input) ? input : `"${input.replace(/"/g, '')}"`
    return `${quoted}, serif`
}

function apply(): void {
    const css = buildCss()
    let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null

    if (!css) {
        el?.remove()
        return
    }
    if (!el) {
        el = document.createElement('style')
        el.id = STYLE_ID
        document.head.appendChild(el)
    }
    el.textContent = css
}

/** 启动时应用一次，并监听后续改动 */
export default function initUserStyle(): void {
    apply()
    watch(
        () => [settings.readerFont, settings.customCssEnabled, settings.customCss],
        apply
    )
}
