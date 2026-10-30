import { type HookConfig } from '../config'
import { getChapter } from '../api/content'
import { rememberBook } from '../bookMemory'
import { getBookInfoAndCatalog } from '../api/book'
import { applyBookCss } from '../api/bookcss'
import { processFootnotes, bindFootnoteInteraction } from '../utils/footnote'
import { settings } from '../settings'
// import defaultcss from '../assets/default.css?raw';
import { cloneElement, sleep } from '../utils';
import { fetchArrayBuffer } from '../utils/request';
import { type Book } from '../types'
import { decryptComicImage } from '../crypto/content';
import { initAudioPanel } from '../audioPanel'
import { addToBookshelf, removeFromBookshelf, isInBookshelf } from '../api/bookshelf'
import { addResponseModifier } from './fetchHook'
import { userState } from '../api/user'
import { attachParaComments, closeParaDrawer, initParaCommentToggle } from '../paraComment'
import { initBackToTop, setupInfiniteScroll } from '../readerScroll'
import { applyReaderPreferences, initReaderSettings } from '../readerSettings'
import { setupBlockedReader, initBlockedReader } from '../blockedReader'
import { watchCatalogMarks } from '../imageScan'
import {
    closeAudiobook,
    openAudiobook,
    refreshParagraphs,
    state as audioState,
    switchChapter,
} from '../audiobook/controller'
// import moment from 'moment'

let currentBook: Book | null = null

let latestItemId: string | null = null

let currentChapterWithContent: any = null

/** 脚本接管的正文容器 id。文字章与漫画章共用同一个，切章时复用 */
const SCRIPT_CONTAINER_ID = 'fqa-reader-content'

/** 漫画懒加载观察器，切章时要换掉旧的 */
let comicObserver: IntersectionObserver | null = null

/*
content-length
39
content-type
application/json; charset=utf-8
date
Wed, 16 Sep 2026 08:58:41 GMT
server
volc-dcdn
server-timing
inner; dur=49, cdn-cache;desc=MISS, origin;dur=63, edge;dur=14, cdn-cache;desc=MISS, tt_agw; dur=45
strict-transport-security
max-age=63072000; includeSubDomains; preload
tt-idc-switch
10000@20260825024420
tt_stable
1
via
n172-005-142.sjzmp-agg.Creative,n173-115-143.nxzhongwei-mp01-cu.Creative
x-agw-info
tZz4wrQl57dt0wY2pTAgR2f48x1mv_TN71v9oOmqjxWS7rul6BjF9t8eZSMnCnTsdvrqH1P6-ELR41Ql_zMwMP_kZavRq2UkjiwjSI7ptI8EHk6qozYlJnJbaqiDWW2sO1RAbsmbFxPsUzXSsp3aUmh7JEMxEBn9_MgD_N49ZXPnqH1EJbjVod0JRshPQPmIzfsU_1PzITtNH20Wb96wrScoWjk=
x-dsa-origin-status
200
x-dsa-trace-id
17895491212d5366f9d0c2c959ffbc745c0148e43f
x-request-ip
2408:847a:718:cd2:20ed:81:8e36:a911
x-tt-agw-login
1
x-tt-logid
20260916165841775622D9BB198F0EF9C9
x-tt-trace-host
014917046478eae01e5ce9f4b5991634e2c2ac3d6c4ea331b6945fee3151af03e55859798c9e8c898e5508e08f78fb380fa48cd479a7ff5f96a2ef74435c7f420dcf4eb744b2aaca36db660c94c334414c30ce2bd99c166030189372edcc8a00b77f30aabb4f0447fece571b3a3c22a3de373bf420de4c924468d754783af3d783
x-tt-trace-id
00-260916165841775622D9BB198F0EF9C9-3157EADB1F76429E-00
x-tt-trace-tag
id=5
*/

// 确保脚本clone的书架按钮是干净不受账号状态影响的
// 没登录不会请求这个api，所以不影响
addResponseModifier({
    matcher: (url: string) =>
        url.indexOf('/reading/bookapi/bookshelf/check/') !== -1
        && location.pathname.startsWith('/reader'),
    should_break: () => true,
    make_response: () => {
        const body = JSON.stringify({
            code: 0,
            message: 'SUCCESS',
            data: 0
        })
        return {
            responseBody: body,
            statusCode: 200,
            responseHeaders: {
                'content-type': 'application/json; charset=utf-8',
                'content-length': String(new TextEncoder().encode(body).length)
            }
        }
    },
})

/**
 * 取到脚本容器：没有就克隆一个插到原容器前面，有就复用并清空。
 *
 * 必须按 id 复用。之前漫画分支查的是 'fqa-comic-content'、写的却是
 * 'fqa-reader-content'，永远查不到，于是每切一章就多插一个容器，
 * 上一章的图片留在页面里，新图被挤到视口外，懒加载再也不触发。
 */
function ensureScriptContainer(readerContainer: Element, comic: boolean): HTMLDivElement {
    let scriptContainer = document.getElementById(SCRIPT_CONTAINER_ID) as HTMLDivElement | null
    if (!scriptContainer) {
        scriptContainer = cloneElement(readerContainer) as HTMLDivElement
        scriptContainer.id = SCRIPT_CONTAINER_ID
        scriptContainer.classList.add('fqa')
        readerContainer.insertAdjacentElement('beforebegin', scriptContainer)
    }
    // 文字章与漫画章互相切换时同步类名
    scriptContainer.classList.toggle('fqa-comic-reader', comic)
    if (settings.allowCopy) scriptContainer.classList.remove('noselect')

    // 容器一清空，旧图片就从文档里消失了，观察器留着没意义
    comicObserver?.disconnect()
    comicObserver = null

    scriptContainer.innerHTML = ''
    readerContainer.classList.add('fqa-hide')
    return scriptContainer
}

/**
 * 正文取不到时的补救：被屏蔽的书仍然要把导航栏标题和目录弹窗补齐。
 * 书籍信息还没有就自己拉一次（失败就只补导航栏里能拿到的部分）。
 */
async function repairBlockedReader(itemId: string): Promise<void> {
    if (!currentBook) {
        const pageState: any = (unsafeWindow as typeof unsafeWindow & {
            __INITIAL_STATE__?: { reader?: { chapterData?: { bookId?: string } }; page?: { bookId?: string } }
        }).__INITIAL_STATE__
        const bid = pageState?.reader?.chapterData?.bookId ?? pageState?.page?.bookId
        if (!bid) {
            setupBlockedReader(null, itemId)
            return
        }
        try {
            currentBook = await getBookInfoAndCatalog(bid)
        } catch (err) {
            console.warn('[fqa:blocked] 取书籍信息失败:', err)
        }
    }
    setupBlockedReader(currentBook, itemId)
    if (currentBook?.book_id) watchCatalogMarks(currentBook.book_id)
}

async function insertContent() {
    const itemId = window.location.pathname.split('/').pop()?.substring(0, 19) || ''
    if (!itemId) {
        console.warn('No item_id found in URL')
        return
    }
    latestItemId = itemId
    // 换章了：段评抽屉里都是上一章的内容，直接收起
    closeParaDrawer()
    const chapter = await getChapter(itemId)
    if (!chapter) {
        console.warn('No chapter found for item_id:', itemId)
        // 站点不给正文（被屏蔽的书），但导航栏 / 目录仍然要能用
        void repairBlockedReader(itemId)
        return
    }

    if (latestItemId !== itemId) {
        console.debug('Stale chapter response discarded:', itemId)
        return
    }
    console.log('Chapter:', chapter)
    currentChapterWithContent = chapter

    const pageState: any = (unsafeWindow as typeof unsafeWindow & {
        __INITIAL_STATE__?: { reader?: { chapterData?: { title?: string; bookId?: string } } }
    }).__INITIAL_STATE__
    const chapterTitle = chapter.novel_data?.title || pageState?.reader?.chapterData?.title
    // 记下书号：有些书详情页会跳到 /page/undefined，靠这个补回去
    rememberBook(
        chapter.novel_data?.book_id || pageState?.reader?.chapterData?.bookId,
        currentBook?.title,
    )
    if (typeof chapter.content === 'string') {
        // 书籍自带的排版样式（css_map），作用域限定在正文容器内后注入
        void applyBookCss(chapter.novel_data?.css_map, '#fqa-reader-content')
        const dp = new DOMParser()
        const doc = dp.parseFromString(chapter.content, 'text/html')
        const body = doc.body
        // XHTML 里的 <link href="Styles/xxx.css"> 是 EPUB 相对路径，页面里解析不到，
        // 留着只会产生 404 请求，样式已由 applyBookCss 处理
        body.querySelectorAll('link[rel="stylesheet"]').forEach((el) => el.remove())
        let article = body.querySelector('article')
        let toProcess = article || body
        // 章内注释：把裂图标记换成可点的上标序号，并重排文末注释列表
        processFootnotes(toProcess)

        for (let i = 0; i < toProcess.childNodes.length; i++) {
            // console.log('Child node:', toProcess.childNodes[i] as HTMLElement)
            if (i < 2 && (toProcess.childNodes[i] as HTMLElement)?.innerHTML?.includes(chapterTitle)) {
                // remove duplicate title
                toProcess.removeChild(toProcess.childNodes[i] as HTMLElement)
                break
            }
        }

        if (!article) {
            article = document.createElement('article')
            article.innerHTML = toProcess.innerHTML
            toProcess = article
        }

        const readerContainer = document.querySelector("div.muye-reader-content:not(.fqa)")
        if (readerContainer) {
            const scriptContainer = ensureScriptContainer(readerContainer, false)
            scriptContainer.appendChild(toProcess)
            bindFootnoteInteraction(scriptContainer)
            // 段落渲染完毕，挂段评标记（段评的 para_index 与正文 <p> 顺序一致）
            if (settings.paraComment) {
                void attachParaComments(scriptContainer, itemId, chapter.novel_data?.book_id ?? '')
            }
        }
    } else if (chapter.content.picInfos) { // comic
        if (chapter.content.encrypt) {
            // 加密漫画图片：懒加载解密
            const imgs: HTMLImageElement[] = []
            for (let i = 0; i < chapter.content.picInfos.length; i++) {
                const picInfo = chapter.content.picInfos[i]
                const img = document.createElement('img')
                img.className = 'fqa-comic-img fqa-comic-encrypted'
                img.alt = `第${i + 1}页`
                img.dataset.encryptedUrl = picInfo.picUrl
                img.dataset.encryptKey = chapter.content.encrypt_key
                img.dataset.pageIndex = i.toString()
                // 占位符：加载中
                img.style.minHeight = '500px'
                img.style.backgroundColor = '#f0f0f0'
                imgs.push(img)
            }

            const readerContainer = document.querySelector("div.muye-reader-content:not(.fqa)")
            if (readerContainer) {
                const scriptContainer = ensureScriptContainer(readerContainer, true)
                imgs.forEach(img => scriptContainer.appendChild(img))

                const observer = new IntersectionObserver(
                    async (entries) => {
                        for (const entry of entries) {
                            if (entry.isIntersecting) {
                                const img = entry.target as HTMLImageElement
                                if (img.dataset.encryptedUrl && img.dataset.encryptKey && !img.src) {
                                    observer.unobserve(img) // 只解密一次
                                    try {
                                        // 图片 CDN 多数不支持跨域，页面 fetch 读不到响应体，
                                        // fetchArrayBuffer 会自动退到 GM_xmlhttpRequest
                                        const encryptedBuffer = await fetchArrayBuffer(
                                            img.dataset.encryptedUrl
                                        )
                                        const decryptedBuffer = await decryptComicImage(
                                            encryptedBuffer,
                                            img.dataset.encryptKey
                                        )
                                        const blob = new Blob([decryptedBuffer], { type: 'image/jpeg' })
                                        const blobUrl = URL.createObjectURL(blob)
                                        img.src = blobUrl
                                        img.style.minHeight = ''
                                        img.style.backgroundColor = ''
                                        img.onload = () => {
                                            URL.revokeObjectURL(blobUrl)
                                        }
                                    } catch (error) {
                                        console.error(`解密图片失败 (页 ${img.dataset.pageIndex}):`, error)
                                        img.alt = `第${Number(img.dataset.pageIndex) + 1}页 - 解密失败`
                                        img.style.backgroundColor = '#ffebee'
                                    }
                                }
                            }
                        }
                    },
                    {
                        rootMargin: '200px'
                    }
                )

                // 记下来，下次切章时断开
                comicObserver = observer
                imgs.forEach(img => observer.observe(img))
            }
        } else {
            const imgs: HTMLImageElement[] = []
            for (let i = 0; i < chapter.content.picInfos.length; i++) {
                const picInfo = chapter.content.picInfos[i]
                const img = document.createElement('img')
                img.className = 'fqa-comic-img'
                img.alt = `第${i + 1}页`
                img.src = picInfo.picUrl
                imgs.push(img)
            }
            const readerContainer = document.querySelector("div.muye-reader-content:not(.fqa)")
            if (readerContainer) {
                const scriptContainer = ensureScriptContainer(readerContainer, true)
                imgs.forEach(img => scriptContainer.appendChild(img))
            }
        }
    }
    const muyeReaderTitle = document.querySelector("h1.muye-reader-title")
    let muyeReaderSubtitle = document.querySelector("div.muye-reader-subtitle")
    document.querySelector('#fqa-subtitle')?.remove() // prevent duplicate subtitle
    if (muyeReaderSubtitle) {
        // 脱离原页面防止被二次修改
        let _cloned = cloneElement(muyeReaderSubtitle)
        muyeReaderSubtitle.classList.add('fqa-hide')
        _cloned.id = 'fqa-subtitle'
        muyeReaderSubtitle.insertAdjacentElement('afterend', _cloned)
        muyeReaderSubtitle = _cloned
        _cloned.classList.remove('fqa-hide')
        console.log('clone subtitle: ', _cloned)
    }
    if (muyeReaderTitle) {
        muyeReaderTitle.textContent = chapterTitle
    }
    // <div class="muye-reader-subtitle">
    // <span class="desc-item">
    // <span class="title">本章字数：</span>
    // 1916字
    // </span>
    // <span class="desc-item">
    // <span class="title">更新时间：</span>
    // 2025-05-24
    // </span>
    // </div>
    /*
    if (muyeReaderSubtitle) {
        muyeReaderSubtitle.innerHTML = ''
        const wordCntSpan = document.createElement('span')
        wordCntSpan.className = 'desc-item'
        wordCntSpan.innerHTML = `<span class="title">本章字数：</span> ${chapter.char_count}字`
        muyeReaderSubtitle.appendChild(wordCntSpan)
        const updateTimeSpan = document.createElement('span')
        updateTimeSpan.className = 'desc-item'
        updateTimeSpan.innerHTML = `<span class="title">更新时间：</span> ${chapter.update_time}`
        muyeReaderSubtitle.appendChild(updateTimeSpan)
    }
        */

    /*
    if (muyeReaderSubtitle) {
        // 写入更精确的更新时间
        let updateTimeSpan = muyeReaderSubtitle.querySelectorAll('span.desc-item')[1]
        if (updateTimeSpan) {
            let uttspan = updateTimeSpan.firstChild as HTMLSpanElement
            // seconds
            updateTimeSpan.innerHTML =
                uttspan.innerHTML +
                moment(pageState?.reader?.chapterData?.firstPassTime * 1000).format('YYYY-MM-DD HH:mm:ss')
        }
    }
        */
    /*
    for (let i = 0; i < 10; i++) {
        if (readerContainer) {
            readerContainer.innerHTML = ''
            readerContainer.appendChild(toProcess)
        }
        // TODO: 改优雅点
        // 防止和页面已有脚本相互作用导致正文没覆盖上
        await sleep(100)
    }
    */
    console.log('Current book:', currentBook)
    if (!currentBook || currentBook == null || currentBook.book_id !== chapter.novel_data?.book_id) {
        currentBook = await getBookInfoAndCatalog(chapter.novel_data?.book_id)
        console.log('Current book:', currentBook)
    }
    // 被网页端屏蔽的书：导航栏没有章节名、目录弹窗为空，用接口数据补上
    setupBlockedReader(currentBook, itemId)
    // 目录弹窗里给「检查过插图」的章节自动补标记（只读本地结论，不发请求）
    if (currentBook?.book_id) watchCatalogMarks(currentBook.book_id)
    if (currentBook && currentBook.chapter_list) {
        const currentChapterItem = currentBook.chapter_list.find(c => c.item_id === itemId)
        if (currentChapterItem) {
            console.log('Current chapter:', currentChapterItem)
            document.title = currentChapterItem.title + ' - ' + currentBook.title + 
                ' - 番茄小说'
            // 防止插入多次
            if (document.getElementById('fqa-current-chapter-volume')) {
                const c = document.getElementById('fqa-current-chapter-volume')
                if (c) {
                    c.textContent = currentChapterItem.volume_title
                }
            } else {
                const volSpan = document.createElement('span')
                volSpan.className = 'desc-item'
                volSpan.id = 'fqa-current-chapter-volume'
                volSpan.textContent = currentChapterItem.volume_title
                // muyeReaderSubtitle?.firstChild: HTMLSpanElement.insertAdjacentElement('beforebegin', volSpan)
                const c = muyeReaderSubtitle?.firstChild as HTMLSpanElement
                if (c) {
                    c.insertAdjacentElement('beforebegin', volSpan)
                }
            }
            // 写入更精确的更新时间
            let updateTimeSpans = muyeReaderSubtitle?.querySelectorAll('span.desc-item') || []
            console.log('spans len', updateTimeSpans.length, 'assertIsOffshelf', updateTimeSpans.length < 3)
            if (updateTimeSpans.length >= 3 /* 应该是始终为3 */) {
                console.log('if')
                /* 最后一个一般是更新时间 */
                let updateTimeSpan = updateTimeSpans[updateTimeSpans.length - 1] as HTMLSpanElement
                let uttspan = updateTimeSpan.firstChild as HTMLSpanElement
                // console.log(uttspan)
                uttspan?.remove()
                // seconds
                updateTimeSpan.innerHTML =
                    '更新时间：' +
                    currentChapterItem.update_time
            } else {
                console.log('else')
                // 网页端屏蔽章节。只有一个本章字数 + 前面插入的卷名
                // 有个默认显示的 0 字，给它删了
                updateTimeSpans[updateTimeSpans.length - 1]?.remove()
                const updateTimeSpan = document.createElement('span')
                // let updateTimeSubSpan = document.createElement('span')
                updateTimeSpan.className = 'desc-item'
                updateTimeSpan.textContent = `更新时间：${currentChapterItem.update_time}`
                console.log('assert equal', currentChapterItem.item_id === currentChapterWithContent?.novel_data?.item_id)
                console.log('wordcnt', currentChapterWithContent?.novel_data?.chapter_word_number)
                const c = document.getElementById('fqa-current-chapter-volume')
                let b: HTMLSpanElement | null = null;
                if (currentChapterItem.item_id === currentChapterWithContent?.novel_data?.item_id) {
                    const wordCntSpan = document.createElement('span')
                    wordCntSpan.className = 'desc-item'
                    wordCntSpan.textContent = `本章字数：${currentChapterWithContent?.novel_data?.chapter_word_number}字`
                    console.log(wordCntSpan)
                    if (c) {
                        console.log('insert wordcnt')
                        c.insertAdjacentElement('afterend', wordCntSpan)
                    }
                    b = wordCntSpan
                }
                console.log('insert update time');
                (b || c)?.insertAdjacentElement('afterend', updateTimeSpan)
            }
        }
    }

    // 正文换了：段落节点全是新的，正在听书就把音频也切到这一章
    if (audioState.open) {
        await switchChapter(itemId, {
            cover: currentBook?.cover_url ?? '',
            title: currentBook?.title ?? document.title,
        })
    } else {
        refreshParagraphs()
    }

    // 无限滚动：滑到接近底部就自动把下一章拼到下面（是否生效由翻页模式决定）
    const appendContainer = document.getElementById(SCRIPT_CONTAINER_ID)
    if (appendContainer && currentBook?.chapter_list?.length && typeof chapter.content === 'string') {
        setupInfiniteScroll(
            appendContainer,
            itemId,
            currentBook.book_id,
            currentBook.chapter_list.map(c => c.item_id),
            // 标题后缀要用它来算（document.title 里把章节名剥掉）
            chapterTitle ?? '',
        )
    }
}

/**
 * 工具栏「听书」按钮：停止 / 开始听书。
 *
 * 已经在听的时候再点就是停止。切音色走左下角悬浮栏，不从这里进。
 */
async function startAudioPlay(): Promise<void> {
    if (audioState.open) {
        closeAudiobook()
        return
    }
    const itemId = window.location.pathname.split('/').pop()?.substring(0, 19) || ''
    if (!itemId) return
    initAudioPanel()
    // 封面和书名从已取到的书籍信息来；正文还没加载完时退化成空封面
    await openAudiobook(itemId, currentBook?.book_id ?? '', {
        cover: currentBook?.cover_url ?? '',
        title: currentBook?.title ?? document.title,
    })
}

/**
 * 注入工具栏「听书」按钮。
 *
 * 构造方式与原作者一致：拿「夜间」那种状态恒定的按钮当模板（原代码取
 * `div.reader-toolbar > div > div:nth-child(3)`），图标换成内联 24px 的「听」，
 * 末子节点写成「听书」。差别只在于：改用 `.reader-toolbar-item` 定位并轮询等
 * 工具栏渲染，站点改版后不会因为写死的位置取不到而整个失效。
 *
 * 已经在听的时候再点就是停止。切音色走左下角悬浮栏。
 */

const AUDIO_TOOL_ID = 'fqa-toggle-audiobook'
let audioClickGuardInstalled = false
let audioGuardLogged = false

/**
 * 听书按钮的点击守卫。
 *
 * 站点的工具栏按钮是 React 渲染的，事件最终落到「工具栏/文档上的委托处理」。
 * 我们插进去的按钮不属于它的 React 树，点击会冒泡到那层委托，被按位置/层级
 * 当成「字号」按钮处理 —— 这就是点听书却弹出字号面板的原因。
 * 只在自己的 click 里 stopPropagation 不够（人家可能挂在捕获阶段），
 * 所以在 window 捕获阶段就把落在听书按钮上的事件全部吞掉，并自己触发播放。
 * 捕获阶段停掉后，按钮自身的 click 收不到事件，所以动作必须在这里做。
 */
function installAudioClickGuard(): void {
    if (audioClickGuardInstalled) return
    audioClickGuardInstalled = true

    const hits = (e: Event): boolean => {
        const t = e.target as Element | null
        return !!t?.closest?.(`#${AUDIO_TOOL_ID}`)
    }

    const swallow = (e: Event) => {
        if (!hits(e)) return
        if (!audioGuardLogged) {
            audioGuardLogged = true
            console.debug('[fqa:audio] 已接管听书按钮的事件（' + e.type + '）')
        }
        e.stopPropagation()
        e.stopImmediatePropagation()
    }

    // 按下 / 抬起 / 触摸：站点有可能在这些阶段就打开面板
    for (const type of ['pointerdown', 'pointerup', 'mousedown', 'mouseup', 'touchstart', 'touchend']) {
        window.addEventListener(type, swallow, true)
    }

    window.addEventListener(
        'click',
        e => {
            if (!hits(e)) return
            e.preventDefault()
            e.stopPropagation()
            e.stopImmediatePropagation()
            if (!audioGuardLogged) {
                audioGuardLogged = true
                console.debug('[fqa:audio] 已接管听书按钮的点击')
            }
            void startAudioPlay()
        },
        true,
    )
}

async function ensureAudiobookButton(): Promise<void> {
    installAudioClickGuard()
    for (let attempt = 0; attempt < 40; attempt++) {
        const toolbar = document.querySelector<HTMLElement>('.reader-toolbar')
        if (toolbar) {
            const existing = document.getElementById(AUDIO_TOOL_ID)
            if (existing && toolbar.contains(existing)) return

            // 自己拼一个 .reader-toolbar-item，不再克隆站点按钮。
            // 原先拿 items[2]（当时是「夜间」）当模板克隆，站点一调整工具栏顺序，
            // 模板就变成「字号」按钮，克隆体带着站点的 class / 事件上下文，
            // 点「听书」会把字号面板弹出来。
            const btn = document.createElement('div')
            btn.id = AUDIO_TOOL_ID
            btn.className = 'reader-toolbar-item'
            btn.setAttribute('tabindex', '0')
            // 站点工具栏里可能有占满整格的定位元素，保证我们能收到点击
            btn.style.position = 'relative'
            btn.style.zIndex = '3'
            btn.style.pointerEvents = 'auto'

            const iconWrap = document.createElement('div')
            iconWrap.className = 'reader-toolbar-item-icon'
            const icon = document.createElement('span')
            icon.textContent = '听'
            icon.style.cssText =
                'display:block;width:24px;height:24px;font-size:24px;line-height:24px;text-align:center'
            iconWrap.appendChild(icon)

            const labelEl = document.createElement('div')
            labelEl.className = 'reader-toolbar-item-font'
            labelEl.textContent = '听书'

            btn.append(iconWrap, labelEl)
            btn.addEventListener('click', e => {
                // 必须掐断冒泡：站点在工具栏上有委托点击，放任冒泡会顺手打开别的面板
                e.preventDefault()
                e.stopPropagation()
                void startAudioPlay()
            })

            // 顺序：… 听书 → 日/夜 → 设置 → 回到顶部
            const themeBtn = document.getElementById('fqa-theme-toggle')
            const backTop = document.getElementById('fqa-back-top')
            if (themeBtn?.parentElement && toolbar.contains(themeBtn)) {
                themeBtn.insertAdjacentElement('beforebegin', btn)
            } else if (backTop?.parentElement && toolbar.contains(backTop)) {
                backTop.insertAdjacentElement('beforebegin', btn)
            } else {
                toolbar.appendChild(btn)
            }
            return
        }
        await sleep(200)
    }
    console.warn('[fqa:reader] 未找到阅读器工具栏，听书按钮未注入')
}

// let currentBook: Book | null = null
async function onUrlChange(_previous?: string): Promise<void> {
    // TODO: 记录并上报阅读历史和记录
    await insertContent()
}
async function onHashChange(_previous?: string): Promise<void> {
    // TODO: 支持从hash里解析并跳转到指定行
}
async function onLoad(): Promise<void> {
    async function fetchBookInfo(): Promise<void> {
        const pageState: any = (unsafeWindow as typeof unsafeWindow & {
            __INITIAL_STATE__?: { reader?: { chapterData?: { bookId?: string } }; page?: { bookId?: string } }
        }).__INITIAL_STATE__
        const bid = pageState?.reader?.chapterData?.bookId ?? pageState?.page?.bookId
        // 被屏蔽的书这里是空对象，取不到书号就不拉；insertContent 里会用 App 接口拿到的书号补
        if (!bid) return
        try {
            currentBook = await getBookInfoAndCatalog(bid)
        } catch (err) {
            console.warn('[fqa:reader] 取书籍信息失败:', err)
        }
    }
    void fetchBookInfo() // 后台继续执行
    /*
    if (!document.getElementById('fqa-inject-css-reader')) {
        const style = document.createElement('style')
        style.id = 'fqa-inject-css-reader'
        style.innerHTML = defaultcss
        document.head.appendChild(style)
    }
        */
    // 工具栏「听书」按钮：等工具栏出来后再克隆一个 reader-toolbar-item 插进去
    void ensureAudiobookButton()
    const bookshelfButton = document.querySelector("div.reader-toolbar-item") // 第一个按钮一定是书架状态
    // 没登录的话就走网页原线路，会要求登录
    if (userState.isLogin && bookshelfButton && bookshelfButton.innerHTML.includes('书架')) {
        const shelf = cloneElement(bookshelfButton)
        bookshelfButton.replaceWith(shelf)

        let inShelf = false
        let ready = false
        let busy = false

        async function ensureBookshelfState(): Promise<void> {
            while (!currentBook) {
                // 等 fetchBookInfo 飞回来
                await sleep(50)
            }
            inShelf = await isInBookshelf(currentBook.book_id)
            shelf.classList.toggle('reader-toolbar-item-disabled', inShelf)
            const label = shelf.lastChild
            if (label) label.textContent = inShelf ? '已在书架' : '加入书架'
            ready = true
        }
        void ensureBookshelfState()

        shelf.addEventListener('click', async () => {
            const book = currentBook
            // 状态还没同步好 / 书籍信息还没到，先不响应
            if (!ready || busy || !book) return
            busy = true
            try {
                if (inShelf) {
                    // 已加书架，按设置决定是否带确认移出书架
                    if (settings.shelfRemoveConfirm) {
                        if (!unsafeWindow.confirm(`确定要把《${book.title ?? '这本书'}》从书架移出吗？`)) return
                    }
                    await removeFromBookshelf(book.book_id)
                } else {
                    // 未加书架，直接加入书架
                    await addToBookshelf(book.book_id)
                }
                await ensureBookshelfState()
            } catch (error) {
                console.error('[fqa:reader] 书架操作失败:', error)
                unsafeWindow.alert(error instanceof Error ? error.message : '书架操作失败')
            } finally {
                busy = false
            }
        })
    }
    const btns = document.querySelector("div.muye-reader-btns") // single div
    if (btns) {
        // TODO: 直接覆写按钮行为，切章节由脚本完成
        // btns.innerHTML = btns.innerHTML // clear default onclick
        // 上一章
        // byte-btn byte-btn-dashed byte-btn-size-large byte-btn-shape-square muye-button chapter-btn last
        // 下一章
        // fatherdiv: chapter-btn next btn-next-relative-container
        // byte-btn byte-btn-primary byte-btn-size-large byte-btn-shape-square muye-button

        /*const prevBtn = btns.querySelector('.chapter-btn.last')
        const nextBtn = btns.querySelector('.chapter-btn.next')?.firstChild
        if (prevBtn) {

        }*/
    }
    initParaCommentToggle()
    initBackToTop()
    initReaderSettings()
    applyReaderPreferences()
    // 被屏蔽的书：尽早挂上目录观察，免得用户比正文先打开目录
    initBlockedReader()
    await insertContent()
}

function readerFilter(path: string, _query: URLSearchParams, _hash: string) {
    return path.startsWith('/reader') || path.startsWith('reader')
}

const _exports: HookConfig[] = [
    {
        id: 'readerHook_load',
        event: 'load',
        handler: onLoad,
        filter: readerFilter
    },
    {
        id: 'readerHook_urlChange',
        event: 'onUrlChange',
        handler: onUrlChange,
        filter: readerFilter
    },
    {
        id: 'readerHook_hashChange',
        event: 'onHashChange',
        handler: onHashChange,
        filter: readerFilter
    }
]

export default _exports