// 详情页那排按钮的水平定位。
//
// 站点的「开始阅读」(.info-btn) 和「加入书架」(.add-bookshelf-btn) 都是绝对定位、
// 宽度固定 150px（left:0 / left:160px），脚本追加的「下载」「检查插图」也要按
// 前面按钮的实际宽度往后排 —— 站点的登录态、是否已加书架、文案长短都会影响
// 这一排的实际宽度，写死 left 迟早对不齐。
//
// 正常详情页和兜底页都走这里，保证两边排法一致。

/** 按钮之间的水平间距，和原站 info-btn(0) -> add-bookshelf-btn(160) 的 10px 间隔一致 */
export const BUTTON_GAP = 10

/**
 * 站点这排按钮的固定宽度。
 *
 * 只用于「量不到的时候」兜底：按钮刚插进 DOM、站点还在骨架屏、祖先 display:none
 * 等情况下 offsetWidth 会是 0，如果直接按 0 算，后面那个按钮就会排到前面那个身上，
 * 视觉上两个按钮叠在一起。
 */
const SITE_BUTTON_WIDTH = 150

/** 已经排过位置的按钮，优先信任自己写过的 left，避免读到尚未重排的 offsetLeft */
function resolvedLeft(el: HTMLElement): number {
    const fromStyle = Number.parseFloat(el.style.left)
    return Number.isFinite(fromStyle) ? fromStyle : el.offsetLeft
}

function resolvedWidth(el: HTMLElement): number {
    return el.offsetWidth || SITE_BUTTON_WIDTH
}

/**
 * 把 btn 排到 siblings 最右那个的右边。
 *
 * 两条约束：
 * 1. 绝不因为「量不到」就放弃定位 —— 那样按钮会退回 left:auto，几个按钮全叠在
 *    同一个静态位置上；
 * 2. 位置只依赖「已写下的 left + 宽度（宽度可兜底）」，不依赖刚刚被改过样式的
 *    兄弟节点是否已经重排完。
 */
export function placeButton(btn: HTMLElement, siblings: HTMLElement[]): void {
    let right = 0
    for (const el of siblings) {
        if (el === btn) continue
        right = Math.max(right, resolvedLeft(el) + resolvedWidth(el))
    }

    const left = `${right + BUTTON_GAP}px`
    // 值没变就别写：observer 监听的是整个 body，每次改样式都会再触发一轮回调
    if (btn.style.left === left) return
    btn.style.position = 'absolute'
    btn.style.bottom = '0'
    btn.style.left = left
}
