// 详情页右侧浮层：「回到顶部」+ 去掉站点那三个入口。
//
// 站点详情页有两个右侧浮层（都在 Page.84c15430.js 里）：
//   1. `.float-wrapper` 浮动条：番茄小说 / 帮助中心 / 作家助手 三个产品入口，始终显示；
//   2. `.backtop` 回到顶部：滚过一屏后出现，样式是 60×60 的白色方块
//      （`.backtop-bg` 贴背景图，默认 30% 不透明，hover 变实）。
//
// 本脚本的处理：
//   - 三个产品入口：从详情页上去掉（用户不需要），整条 `.float-wrapper` 隐藏；
//   - 回到顶部：所有详情页都保留。
//       · 正常详情页：站点自己会渲染 `.backtop`，原样留着，不重复创建；
//       · 兜底页（bookFallback.ts）：站点整页组件没渲染，`.backtop` 也不存在，
//         这里按站点的结构、类名、位置补一个，长得和正常页那个一模一样：
//
//           <div class="backtop"><div class="backtop-bg"></div></div>

/** 滚动超过这个距离才显示（站点是「超过一屏」，这里取视口高度与固定值的较大者） */
const MIN_THRESHOLD = 300

/** 详情页时挂在 <html> 上的标记，CSS 靠它隐藏站点浮动条 */
const NO_FLOAT_BAR_ATTR = 'data-fqa-no-float-bar'

let el: HTMLElement | null = null
/** 隐藏浮动条的样式是否已经注入（GM_addStyle 只在启动时做一次） */
let styleInjected = false

/** 当前是不是详情页 */
function onDetailPage(): boolean {
    return /^\/page\/\d+/.test(window.location.pathname)
}
let onScroll: (() => void) | null = null
let threshold = 0

function scrollTop(): number {
    return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0
}

/** 回到顶部：与站点一致直接跳到 0（不做平滑动画） */
function toTop(): void {
    window.scrollTo(0, 0)
}

function sync(): void {
    if (!el) return
    // 站点是在「scrollTop >= clientHeight」时出现，这里同样以一屏为基准
    el.style.display = scrollTop() >= threshold ? '' : 'none'
}

function bindScroll(): void {
    if (onScroll) return
    let ticking = false
    onScroll = () => {
        if (ticking) return
        ticking = true
        requestAnimationFrame(() => {
            ticking = false
            sync()
        })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
}

/**
 * 在兜底详情页上补一个站点同款的「回到顶部」。
 *
 * 挂在 shell 里（与页脚之前），位置由站点 CSS 的 `.backtop` 规则决定
 * （fixed + left:50% + translateX(625px)，即正文右缘外侧），
 * 所以不需要自己算坐标。
 *
 * 可重复调用：已存在就只重新同步一次。
 */
export function mountBackTop(shell: HTMLElement, before: Element | null = null): void {
    threshold = Math.max(MIN_THRESHOLD, window.innerHeight)
    if (el?.isConnected) {
        sync()
        return
    }

    const btn = document.createElement('div')
    btn.className = 'backtop'
    btn.setAttribute('role', 'button')
    btn.setAttribute('tabindex', '0')
    btn.title = '回到顶部'
    const bg = document.createElement('div')
    bg.className = 'backtop-bg'
    btn.appendChild(bg)

    btn.addEventListener('click', toTop)
    btn.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            toTop()
        }
    })

    shell.insertBefore(btn, before)
    el = btn
    bindScroll()
    sync()
}

/**
 * 早期安装：隐藏站点右侧那三个产品入口（番茄小说 / 帮助中心 / 作家助手）。
 *
 * 关键在**时机**。站点那三个入口是 React 渲染的，如果等详情页钩子跑起来
 * 再挂 MutationObserver 去加类，第一帧已经画出来了，就会「闪现一下」。
 * 所以这里在 document-start 阶段直接：
 *   1. GM_addStyle 注入一条挂在 <html> 属性上的规则（不需要 body，立即生效）；
 *   2. 同步按当前路径打上属性。
 * 之后站点无论什么时候插入浮动条，都是隐藏状态。
 *
 * 用属性而不是给元素加类：站点重渲染会重建那棵树，属性挂在 <html> 上不会丢。
 */
export function installFloatBarHiding(): void {
    if (!styleInjected) {
        styleInjected = true
        GM_addStyle(
            `html[${NO_FLOAT_BAR_ATTR}] .float-wrapper{display:none!important}`,
        )
    }
    syncFloatBarPath()
}

/** SPA 换页后同步一次（进/出详情页都要切） */
export function syncFloatBarPath(): void {
    const root = document.documentElement
    if (!root) return
    if (onDetailPage()) {
        if (!root.hasAttribute(NO_FLOAT_BAR_ATTR)) root.setAttribute(NO_FLOAT_BAR_ATTR, '')
    } else if (root.hasAttribute(NO_FLOAT_BAR_ATTR)) {
        root.removeAttribute(NO_FLOAT_BAR_ATTR)
    }
}

/** 离开详情页 / 换书时拆掉 */
export function unmountBackTop(): void {
    if (onScroll) {
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onScroll)
        onScroll = null
    }
    el?.remove()
    el = null
}
