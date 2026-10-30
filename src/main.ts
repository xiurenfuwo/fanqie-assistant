import _config from './config'
import injectCSS from './cssInject'
import initFontDecrypt from './fontDecrypt'
import initUserStyle from './userStyle'
import { onLoad, onUrlChange, onHashChange, onEnter } from './hooks'
import { version, name } from '../package.json'
import initUser from './api/user'
import { ensureDevice } from './api/provision'
import { initDownloadPanel } from './downloadPanel'
import { applyReaderPreferences } from './readerSettings'
import { isNavigationSuppressed } from './navGuard'
import { installFloatBarHiding, syncFloatBarPath } from './backTop'

const win = unsafeWindow

let previousUrl = win.location.href
let previousHash = win.location.hash

function installNavigationHooks() {
    for (const method of ['pushState', 'replaceState'] as const) {
        const original = win.history[method]
        win.history[method] = function (
            this: History,
            ...args: Parameters<History[typeof method]>
        ) {
            const result = original.apply(this, args)
            console.debug(`history.${method} called with args:`, args)
            // 滚动翻页同步地址栏时用：只看 URL 变化，不重载正文
            if (isNavigationSuppressed()) {
                previousUrl = win.location.href
                return result
            }
            syncFloatBarPath()
            void onUrlChange(previousUrl)
            previousUrl = win.location.href
            return result
        }
    }
    win.addEventListener('popstate', () => {
        if (isNavigationSuppressed()) {
            previousUrl = win.location.href
            return
        }
        syncFloatBarPath()
        void onUrlChange(previousUrl)
        previousUrl = win.location.href
    })
    win.addEventListener('hashchange', () => {
        if (isNavigationSuppressed()) {
            previousHash = win.location.hash
            return
        }
        void onHashChange(previousHash)
        previousHash = win.location.hash
    })
}

async function mainInit() {
    // config 必须最先初始化以确保一些全局函数没有被劫持
    if (_config.currentConfig) {} // force load

    // 尽早贴主题：脚本在 document-start 运行，这里设好后页面首次绘制就是用户选的主题，
    // 不会出现「先日间、再变成米黄」的闪动
    applyReaderPreferences()
    console.log(`================================================`)
    console.log(`==          ${name} - ${version}         ==`)
    console.log(`================================================`)

    installNavigationHooks()

    // 详情页右侧那三个产品入口要在站点画第一帧之前就藏掉，否则会闪现一下。
    // 这里只做两件很轻的事：注入一条作用域 CSS + 按当前路径打标记。
    installFloatBarHiding()

    void onEnter()

    initFontDecrypt()

    await injectCSS()

    // 用户自定义样式（阅读器字体 / 自定义 CSS）
    initUserStyle()

    // 下载进度弹窗随任务自动显示
    initDownloadPanel()

    // APP 接口需要已注册的设备（首次会注册并激活会员，之后走本地缓存）
    await ensureDevice()

    await initUser()

    void onLoad()
}

mainInit()
