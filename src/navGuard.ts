// 导航抑制开关。
//
// main.ts 劫持了 history.pushState / replaceState 和 popstate，用来感知「换章」
// 并重新渲染正文。但滚动翻页时我们只想悄悄改一下地址栏、让站点自己的路由
// 同步状态（目录的「当前章」、上一章/下一章等），绝不能再触发一次正文重载。
// 所以在这类调用外面套一层抑制标记，钩子看到标记就只更新 previousUrl。

let suppressed = 0

/** 在抑制窗口内执行 fn（可嵌套，用计数而不是布尔） */
export function withNavigationSuppressed<T>(fn: () => T): T {
    suppressed += 1
    try {
        return fn()
    } finally {
        suppressed -= 1
    }
}

export function isNavigationSuppressed(): boolean {
    return suppressed > 0
}
