// 被屏蔽书籍的详情页兜底。
//
// 有些书站点详情页拿不到数据，只剩页眉页脚、中间全空（书号是对的，正文在
// 阅读页仍能正常看）。这里用 App 接口取一次书籍信息 + 目录，然后用**站点自己的
// 类名**把详情页结构搭出来（.page > .page-wrap > .page-header + .page-body-wrap），
// 插到页脚之前 —— 这样站点 CSS 直接命中，外观和正常详情页一致。
//
// 结构上有两处必须严格照抄，否则样式会整体走样：
//   1. .author 必须是 .page-header-info 的**子节点**。站点样式选择器是后代选择器
//      （.page-header-info .author），挂到 .page-header 下就完全不生效，作者块会
//      从右侧竖栏掉到封面下方、变成左对齐的一块。
//   2. 那排按钮全部绝对定位，「开始阅读」(.info-btn) 和「加入书架」(.add-bookshelf-btn)
//      的位置由站点 CSS 给定，脚本追加的按钮靠 placeButton 按实际宽度往后排。

import { getAuthorBioFromHomepage, getBookInfoAndCatalog, isDefaultAuthorDesc } from './api/book'
import { addToBookshelf } from './api/bookshelf'
import { placeButton } from './detailButtons'
import { mountBackTop } from './backTop'
import { startDownload } from './download'
import {
    clearImageScanCache,
    getCachedImageScan,
    markCatalogImages,
    scanBookImages,
    type ImageScanResult,
} from './imageScan'
import { settings } from './settings'
import { sleep } from './utils'
import type { Book } from './types'
import downloadcss from './assets/download.css?raw'

const ROOT_ID = 'fqa-book-fallback'
const STYLE_ID = 'fqa-book-fallback-style'
/** 与 downloadHook 共用的样式 id，谁先注入都只留一份 */
const DL_STYLE_ID = 'fqa-download-style'

function ensureStyle(): void {
    // 「下载」「检查插图」的外观在 download.css 里。正常详情页由 downloadHook 注入，
    // 但那时要看 settings.enableDownload；兜底页不依赖它，自己保证一份。
    if (!document.getElementById(DL_STYLE_ID)) {
        const dl = document.createElement('style')
        dl.id = DL_STYLE_ID
        dl.textContent = downloadcss
        document.head.appendChild(dl)
    }
    if (document.getElementById(STYLE_ID)) return
    const style = document.createElement('style')
    style.id = STYLE_ID
    style.textContent = `
/* 站点按钮禁用态 */
.muye-button[disabled]{opacity:.6;cursor:default}

/* 简介 / 目录那张白卡要有灰色衬底。
   站点底色来自 body 的 #f6f6f6，但 .muye 自带白底会把它盖住，
   而兜底页的根节点正好是 .muye。所以显式铺两层灰：
   - .page       负责卡片上下留白（.page-body-wrap 的 28/30px 外边距区域）
   - .page-body-wrap 负责卡片左右两侧的 20px 内边距区域
   页头 .page-wrap 与卡片 .page-body 仍是站点自己的白色，灰底只从它们背后透出来。
   .page 上的 overflow:hidden 是为了把 .page-body-wrap 的下外边距算进高度，
   灰底才能一直延到卡片下方。 */
#fqa-book-fallback .page {
    background-color: #f6f6f6;
    overflow: hidden;
}
#fqa-book-fallback .page-body-wrap {
    background-color: #f6f6f6;
}

/* 作者头像占位：没有头像时用作者名首字。
   尺寸/圆角/描边照抄站点 .page-header-info .author-img（70x70、1px 描边），
   并且必须是 inline-block——站点那个 <img> 就是 inline 元素，
   改成 flex/block 会改变基线对齐，整块会相对作者名上下偏移。 */
#fqa-book-fallback .author-img.fqa-author-avatar-fallback {
    display: inline-block;
    width: 70px;
    height: 70px;
    box-sizing: border-box;
    border: 1px solid #f1f1f1;
    border-radius: 50%;
    background: linear-gradient(135deg, #ffe3d3, #ffcfb3);
    color: #fa6725;
    font-size: 28px;
    font-weight: 600;
    line-height: 68px; /* 减掉上下各 1px 描边，字才真正居中 */
    text-align: center;
    vertical-align: middle;
    user-select: none;
}


@media (prefers-color-scheme: dark) {
    #fqa-book-fallback .author-img.fqa-author-avatar-fallback {
        background: linear-gradient(135deg, #4a3a32, #3a2d27);
        color: #ff8a4c;
    }
}

`
    document.head.appendChild(style)
}

/** 页面是不是「只有壳」：没有目录项、也没有任何章节链接 */
function pageLooksEmpty(): boolean {
    if (document.querySelector('.page-directory-content .chapter-item')) return false
    // 正常详情页一定会渲染出指向章节的链接；被屏蔽的页面一个都没有
    if (document.querySelector('a[href^="/reader/"]')) return false
    return true
}

function el<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    className?: string,
    text?: string,
): HTMLElementTagNameMap[K] {
    const node = document.createElement(tag)
    if (className) node.className = className
    if (text !== undefined) node.textContent = text
    return node
}

/**
 * 站点详情页的按钮。
 *
 * 只管外观类，不写内联位置：「开始阅读」「加入书架」的位置由站点 CSS
 * （.info-btn / .add-bookshelf-btn）给定，脚本追加的按钮交给 placeButton。
 */
function siteButton(primary: boolean, extra = ''): HTMLButtonElement {
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className =
        `byte-btn ${primary ? 'byte-btn-primary' : 'byte-btn-default'} ` +
        'byte-btn-size-large byte-btn-shape-square muye-button' +
        (extra ? ` ${extra}` : '')
    return btn
}

/**
 * 作者主页链接。
 *
 * 站点详情页的实现（Page.84c15430.js，实测）是把 onClick 挂在 **.author-info**
 * 上，而不是作者名那个 <a> 上：
 *
 *   <div className="author-info" onClick={() => {
 *     const { authorId } = parseOriginalAuthors(originalAuthors)
 *     window.open("/author-page/" + page.authorId + "-" + authorId)
 *   }}>
 *     <img className="author-img" …/>
 *     <a onClick={e => e.preventDefault()}>…作者名…</a>
 *     <div className="author-desc">…</div>
 *   </div>
 *
 * 所以整块（头像 + 名字 + 简介）都可点，点哪儿效果一样。
 * 前缀 `page.authorId` 是网页端体系的作者 id；兜底页拿不到页面状态，
 * 用 App 接口里语义最接近的 author_info.user_id 代替。
 */
function authorPageUrl(book: Book): string | null {
    const authorId = book.author_id?.trim()
    if (!authorId) return null
    const uid = (book.author_uid ?? '').trim() || authorId
    return `/author-page/${uid}-${authorId}`
}

/**
 * 作者栏（必须是 .page-header-info 的子节点，见文件头注释）。
 *
 * 结构严格对齐正常详情页（实测）：
 *   <div class="author">
 *     <div class="author-divider"></div>
 *     <div class="author-info" onclick=跳作者主页>   ← 点击区域是这里
 *       <img class="author-img" src="…" alt="书名作者作者名">
 *       <a>                                          ← 本身不带 href
 *         <div class="author-name">
 *           <span class="author-name-logo"></span>
 *           <span class="author-name-text">作者名</span>
 *         </div>
 *       </a>
 *       <div class="author-desc">作者简介</div>
 *     </div>
 *   </div>
 *
 * 头像用接口的 author_info.user_avatar；没有就退回首字占位（站点自己也有一张
 * 写死的默认头像，这里用占位更直观）。作者简介为空时不渲染这一行，避免撑高。
 */
function buildAuthor(book: Book): HTMLElement {
    const author = el('div', 'author')
    author.appendChild(el('div', 'author-divider'))

    const info = el('div', 'author-info')
    const authorName = book.author || '佚名'

    if (book.author_avatar) {
        const img = el('img', 'author-img')
        img.src = book.author_avatar
        img.alt = `${book.title ?? ''}作者${authorName}`
        img.loading = 'lazy'
        // 加载失败退回首字占位，不至于留一个破图
        img.addEventListener(
            'error',
            () => img.replaceWith(buildAvatarFallback(authorName)),
            { once: true },
        )
        info.appendChild(img)
    } else {
        info.appendChild(buildAvatarFallback(authorName))
    }

    // 与站点一致：<a> 不带 href，只负责阻止默认行为；真正的跳转在 .author-info 上
    const link = el('a')
    link.addEventListener('click', event => event.preventDefault())
    const nameBox = el('div', 'author-name')
    nameBox.appendChild(el('span', 'author-name-logo'))
    nameBox.appendChild(el('span', 'author-name-text', authorName))
    link.appendChild(nameBox)
    info.appendChild(link)

    // 站点结构里有 .author-desc，但内容为空时不留空块（会让作者栏高度凭空多一截）
    const desc = book.author_desc?.trim()
    if (desc) info.appendChild(el('div', 'author-desc', desc))

    // 整块可点：和站点一样在新标签页打开作者主页
    const url = authorPageUrl(book)
    if (url) {
        info.style.cursor = 'pointer'
        info.title = `查看${authorName}的主页`
        info.addEventListener('click', event => {
            event.preventDefault()
            window.open(url, '_blank', 'noopener')
        })
    }
    author.appendChild(info)
    return author
}

/** 没有头像时的占位：作者名首字，尺寸与 .author-img 同（70x70 圆形） */
function buildAvatarFallback(authorName: string): HTMLElement {
    const avatar = el('div', 'author-img fqa-author-avatar-fallback', authorName.slice(0, 1))
    avatar.setAttribute('role', 'img')
    avatar.setAttribute('aria-label', `作者${authorName}`)
    return avatar
}

function buildHeader(book: Book, buttons: HTMLElement[] = []): HTMLElement {
    const header = el('div', 'page-header')

    // 面包屑：站点是 .route-trackers.book-route-trackers > a(首页) + a(书名)
    const crumb = el('div', 'route-trackers book-route-trackers')
    const home = el('a', undefined, '首页')
    home.href = '/'
    const current = el('a', undefined, book.title || '未知书名')
    crumb.append(home, current)
    header.appendChild(crumb)

    const headerInfo = el('div', 'page-header-info')

    // 封面（站点结构：.muye-book-cover > .book-cover > img.book-cover-img + .book-effect）
    const coverWrap = el('div', 'muye-book-cover img is-book')
    const bookCover = el('div', 'book-cover')
    bookCover.style.borderRadius = '4px'
    if (book.cover_url) {
        const img = el('img', 'book-cover-img loaded')
        img.src = book.cover_url
        img.alt = book.title ?? ''
        bookCover.appendChild(img)
    }
    bookCover.appendChild(el('div', 'book-effect book-animate-effect'))
    coverWrap.appendChild(bookCover)
    headerInfo.appendChild(coverWrap)

    const box = el('div', 'info')

    // 书名：站点是 .info-name > h1，字号粗细都靠这个
    const nameBox = el('div', 'info-name')
    nameBox.appendChild(el('h1', undefined, book.title || '未知书名'))
    box.appendChild(nameBox)

    // 状态 + 分类：状态用 .info-label-yellow，分类是若干个 .info-label-grey
    const labelBox = el('div', 'info-label')
    if (book.status) {
        labelBox.appendChild(el('span', 'info-label-yellow', book.status === '连载' ? '连载中' : book.status))
    }
    for (const tag of (book.category ?? '').split(',').map(t => t.trim()).filter(Boolean)) {
        labelBox.appendChild(el('span', 'info-label-grey', tag))
    }
    box.appendChild(labelBox)

    // 字数：站点是 .info-count > .info-count-word > .detail + .text
    const words = (book.chapter_list ?? []).reduce((n, c) => n + (c.char_count || 0), 0)
    if (words > 0) {
        const count = el('div', 'info-count')
        const word = el('div', 'info-count-word')
        word.appendChild(el('span', 'detail', (words / 10000).toFixed(1)))
        word.appendChild(el('span', 'text', '万字'))
        count.appendChild(word)
        box.appendChild(count)
    }

    // 最近更新：站点是 .info-last > a.chapter-item-title + .info-last-time
    const lastChapter = (book.chapter_list ?? []).slice(-1)[0]
    if (lastChapter) {
        const last = el('div', 'info-last')
        const a = el('a', 'chapter-item-title')
        a.href = `/reader/${lastChapter.item_id}`
        a.target = '_blank'
        a.appendChild(el('span', 'info-last-title', `最近更新：${lastChapter.title}`))
        last.appendChild(a)
        if (book.update_time) last.appendChild(el('span', 'info-last-time', book.update_time))
        box.appendChild(last)
    }

    // 按钮直接挂在 .info 上（站点就是这么放的，位置由 CSS / placeButton 决定）
    if (buttons.length) box.append(...buttons)
    headerInfo.appendChild(box)

    // 作者栏：必须放进 .page-header-info，否则站点样式不命中
    headerInfo.appendChild(buildAuthor(book))

    header.appendChild(headerInfo)
    return header
}

/** 目录接口下发的卷名形如「第一卷：默认」，站点只显示「第一卷」 */
function cleanVolumeTitle(title?: string): string {
    return (title ?? '').replace(/[：:]\s*默认$/, '').trim()
}

function buildBody(book: Book): HTMLElement {
    const wrap = el('div', 'page-body-wrap')
    const body = el('div', 'page-body')

    if (book.summary) {
        const header = el('div', 'page-abstract-header')
        // 站点是 .page-abstract-header > h2，直接文本（没有 span）
        header.appendChild(el('h2', undefined, '作品简介'))
        body.appendChild(header)
        // 站点正文包在 <p> 里，这里保持一致，换行与行高的表现才对得上
        const content = el('div', 'page-abstract-content')
        content.appendChild(el('p', undefined, book.summary))
        body.appendChild(content)
    }

    const chapters = book.chapter_list ?? []
    const dirHeader = el('div', 'page-directory-header')
    const h3 = el('h3')
    h3.appendChild(el('span', undefined, '目录'))
    h3.appendChild(el('span', 'directory-dot'))
    h3.appendChild(document.createTextNode(`${chapters.length}章`))
    dirHeader.appendChild(h3)
    body.appendChild(dirHeader)

    const dir = el('div', 'page-directory-content')
    const inner = el('div')
    const volumes = book.volume_list?.length
        ? book.volume_list
        : [{ title: '', chapter_list: chapters } as any]
    volumes.forEach((vol, idx) => {
        const volTitle = cleanVolumeTitle(vol.title)
        if (volTitle) {
            const vh = el('div', idx === 0 ? 'volume volume_first' : 'volume')
            vh.appendChild(document.createTextNode(volTitle))
            vh.appendChild(el('span', 'volume-dot'))
            vh.appendChild(document.createTextNode(`共${vol.chapter_list.length}章`))
            inner.appendChild(vh)
        }
        const chapterBox = el('div', 'chapter')
        for (const ch of vol.chapter_list) {
            const item = el('div', 'chapter-item')
            const a = el('a', 'chapter-item-title', ch.title)
            a.href = `/reader/${ch.item_id}`
            a.target = '_blank'
            item.appendChild(a)
            chapterBox.appendChild(item)
        }
        inner.appendChild(chapterBox)
    })
    dir.appendChild(inner)
    body.appendChild(dir)

    wrap.appendChild(body)
    return wrap
}

/**
 * 把兜底块插到页脚之前。
 *
 * 被屏蔽页的 DOM 是 `#app > div > (muye-header, …, 页脚)`，没有 .page 容器。
 * 先找到「和页眉同一个父节点」的那个祖先，作为外壳；再找页脚在外壳下的直接子节点，
 * 插到它前面，位置就和正常详情页一致。
 */
function mount(root: HTMLElement): void {
    const header = document.querySelector('.muye-header')
    const shell = header?.parentElement ?? document.querySelector('#app > div') ?? document.body

    let footerRoot: Element | null = null
    const probe = document.querySelector<HTMLElement>('[class*="zone-footer"]')
    for (let n: HTMLElement | null = probe; n; n = n.parentElement) {
        if (n.parentElement === shell) {
            footerRoot = n
            break
        }
    }
    shell.insertBefore(root, footerRoot)
    // 站点详情页组件自带的「回到顶部」兜底页没有，按同样的结构补一个
    mountBackTop(shell, footerRoot)
}

/** 扫描结果的人话总结（与正常详情页的「检查插图」保持一致） */
function describeScan(r: ImageScanResult): string {
    const lines = [`共 ${r.total} 章，已检查 ${r.scanned} 章。`]
    lines.push(r.hits.length ? `其中 ${r.hits.length} 章含插图。` : '未发现含插图的章节。')
    if (r.skipped.length) lines.push(`${r.skipped.length} 章为付费/锁定章，未检查。`)
    if (r.failed.length) lines.push(`${r.failed.length} 章获取失败，结论可能不完整。`)
    return lines.join('\n')
}

let renderedFor = ''

/** 详情页内容为空时补一块自己的视图 */
export async function ensureBookFallback(bookId: string): Promise<void> {
    if (!bookId || renderedFor === bookId) return
    // 给站点一点时间把自己渲染出来，别抢正常的详情页
    await sleep(700)
    if (window.location.pathname !== `/page/${bookId}`) return
    if (!pageLooksEmpty()) return

    let book: Book
    try {
        book = await getBookInfoAndCatalog(bookId)
    } catch (err) {
        console.warn('[fqa:fallback] 取书籍信息失败:', err)
        return
    }
    if (!book?.chapter_list?.length) {
        console.warn('[fqa:fallback] 接口也没有这本书的数据')
        return
    }

    // 作者简介：详情接口里那句是平台默认话术（「关注我，掌握书籍最新动态」），
    // 作者自己写的介绍只在作者主页里，去那儿取一次；取不到就把默认话术清掉，
    // 免得显示成一句假简介。
    try {
        if (book.author_id) {
            const bio = await getAuthorBioFromHomepage(book.author_uid ?? '', book.author_id)
            if (bio) book.author_desc = bio
            else if (isDefaultAuthorDesc(book.author_desc)) book.author_desc = ''
        }
    } catch (err) {
        console.warn('[fqa:fallback] 取作者简介失败:', err)
    }

    ensureStyle()
    document.getElementById(ROOT_ID)?.remove()

    /* ---------------- 按钮 ---------------- */

    // 开始阅读：站点是 button > a，点击交给浏览器原生跳转
    const first = book.chapter_list[0]?.item_id
    const readBtn = siteButton(true, 'info-btn')
    if (first) {
        const link = el('a', undefined, '开始阅读')
        link.href = `/reader/${first}`
        readBtn.appendChild(link)
    } else {
        readBtn.textContent = '开始阅读'
        readBtn.disabled = true
    }

    // 加入书架：外观用站点的 .add-bookshelf-btn（灰底），行为走脚本自己的接口
    const shelfBtn = siteButton(false, 'add-bookshelf-btn')
    const shelfText = el('span', undefined, '加入书架')
    shelfBtn.appendChild(shelfText)
    shelfBtn.addEventListener('click', event => {
        event.preventDefault()
        event.stopPropagation()
        if (shelfBtn.dataset.busy === '1' || shelfBtn.dataset.done === '1') return
        shelfBtn.dataset.busy = '1'
        void addToBookshelf(book.book_id)
            .then(() => {
                shelfBtn.dataset.done = '1'
                shelfText.textContent = '已加书架'
            })
            .catch(err => {
                console.warn('[fqa:fallback] 加入书架失败:', err)
                shelfText.textContent = '加入失败'
                window.setTimeout(() => {
                    shelfText.textContent = '加入书架'
                }, 1500)
            })
            .finally(() => {
                shelfBtn.dataset.busy = '0'
            })
    })

    // 下载
    const dlBtn = siteButton(true, 'fqa-dl-entry')
    dlBtn.textContent = '下载'
    dlBtn.disabled = !settings.enableDownload
    dlBtn.addEventListener('click', event => {
        event.preventDefault()
        event.stopPropagation()
        if (!settings.enableDownload) return
        void startDownload(book.book_id, { format: settings.downloadFormat })
    })

    // 检查插图（手动触发；右键清缓存，与正常详情页一致）
    const scanBtn = siteButton(true, 'fqa-img-entry')
    scanBtn.textContent = '检查插图'
    scanBtn.title = '左键检查插图 · 右键清除本书缓存'
    scanBtn.addEventListener('click', event => {
        event.preventDefault()
        event.stopPropagation()
        if (scanBtn.dataset.busy === '1') return

        const cached = getCachedImageScan(bookId)
        if (cached) {
            markCatalogImages(bookId)
            scanBtn.textContent = cached.hits.length ? `插图 ${cached.hits.length} 章` : '无插图'
            scanBtn.title = describeScan(cached)
            return
        }

        scanBtn.dataset.busy = '1'
        scanBtn.textContent = '检查中 0%'
        void scanBookImages(bookId, p => {
            if (p.phase === 'retry') {
                scanBtn.textContent = `重试 ${p.retryDone ?? 0}/${p.retryTotal ?? 0}`
                return
            }
            const pct = p.total ? Math.round((p.done / p.total) * 100) : 0
            scanBtn.textContent = `检查中 ${pct}%`
        })
            .then(result => {
                markCatalogImages(bookId, result.hits)
                scanBtn.textContent = result.hits.length ? `插图 ${result.hits.length} 章` : '无插图'
                scanBtn.title = describeScan(result)
            })
            .catch(err => {
                scanBtn.textContent = '检查失败'
                console.warn('[fqa:fallback] 检查插图失败:', err)
            })
            .finally(() => {
                scanBtn.dataset.busy = '0'
            })
    })
    scanBtn.addEventListener('contextmenu', event => {
        event.preventDefault()
        event.stopPropagation()
        if (scanBtn.dataset.busy === '1') return
        const cleared = clearImageScanCache(bookId)
        markCatalogImages(bookId)
        scanBtn.textContent = cleared ? '已清除' : '无缓存'
        window.setTimeout(() => {
            scanBtn.textContent = '检查插图'
        }, 1500)
    })

    /* ---------------- 组装 ---------------- */

    const page = el('div', 'page')
    const pageWrap = el('div', 'page-wrap')
    pageWrap.appendChild(buildHeader(book, [readBtn, shelfBtn, dlBtn, scanBtn]))
    page.appendChild(pageWrap)

    // 与站点结构一致：.page-body-wrap 是 .page 的子节点、和 .page-wrap 平级。
    // 不能塞进 .page-wrap 里 —— .page-wrap 带 background-color:#fff 且铺满整宽，
    // 会把下方整块刷白，简介/目录的灰色衬底就永远透不出来。
    page.appendChild(buildBody(book))

    const root = el('div', 'muye muye-page')
    root.id = ROOT_ID
    root.appendChild(page)

    mount(root)

    // 被屏蔽的书，站点详情页只剩空壳，标题还停在默认的「小说,番茄小说网_好看的小说尽在番茄小说官网」。
    // 正常详情页是「<书名>完整版在线免费阅读_<书名>小说_番茄小说官网」，这里对齐。
    if (book.title) {
        document.title = `${book.title}完整版在线免费阅读_${book.title}小说_番茄小说官网`
    }

    // 进文档后才有 offsetWidth，位置要在这之后算
    placeButton(dlBtn, [readBtn, shelfBtn])
    placeButton(scanBtn, [readBtn, shelfBtn, dlBtn])

    renderedFor = bookId
}
