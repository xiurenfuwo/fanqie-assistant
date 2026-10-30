// 被网页端屏蔽的书籍 —— 判断 + 目录弹窗补齐。
//
// 站点对这类书的处理是「装作能看、其实什么都没给」：
//   - 详情页只剩页眉页脚（见 bookFallback.ts），这里管阅读页；
//   - 阅读页 __INITIAL_STATE__.reader.chapterData 是空对象，目录弹窗自然是空的；
//   - 导航栏标题（h1.muye-reader-nav-title）里没有章节名。
// 正文脚本本来就能从 App 接口拿到，所以只要识别出这种状态，用同一份接口数据补上即可。

import { getCatalog } from './api/catalog'
import type { Book, ChapterItem } from './types'
import { fromNow } from './utils/time'

/** 站点把章节数据放在 reader.chapterData；屏蔽书这里是空对象 {} */
export function readReaderState(): any | undefined {
    const state: any = (unsafeWindow as typeof unsafeWindow & { __INITIAL_STATE__?: any }).__INITIAL_STATE__
    const chapter = state?.reader?.chapterData
    return chapter && Object.keys(chapter).length ? chapter : undefined
}

/**
 * 当前阅读页是不是「被屏蔽」状态。
 *
 * 判据只看站点给没给数据，不发请求：状态里没有 chapterData，或者有 chapterData
 * 却没有正文（且页面自己没有目录），都算。
 */
export function isBlockedReader(): boolean {
    const chapter = readReaderState()
    if (!chapter) return true
    if (chapter.content) return false
    if (chapter.isChapterLock || chapter.isPaidPublication) return true
    const state: any = (unsafeWindow as typeof unsafeWindow & { __INITIAL_STATE__?: any }).__INITIAL_STATE__
    const page = state?.page
    return !(page?.chapterList?.length || page?.chapterTotal > 0)
}

/* ------------------------------ 目录弹窗 ------------------------------ */

const CATALOG_CONTENT_SEL = '#catalog-content'
const DIALOG_SEL = '.reader-catalog'
const CHAPTERS = '.reader-catalog-chapters'

/** 弹窗顶部那几行（书名 / 状态 / 作者 / 封面 / 目录数）。只在弹窗内查找，避免误伤页面其它同名节点 */
function fillHeader(book: Book | null | undefined, chapters: ChapterItem[]): void {
    const dialog = document.querySelector<HTMLElement>(DIALOG_SEL)
    if (!dialog) return

    const total = chapters.length
    // 书名：站点是文字 + 一个右箭头 svg（点击跳详情页），改文字时要把箭头留着
    // 已有书名就跳过（正常书 / 已补过）；没有才写，避免把站点的书名覆盖成空
    const nameNode = dialog.querySelector<HTMLElement>('.reader-catalog-book-name')
    if (nameNode && book?.title) {
        const arrow = nameNode.querySelector('svg')
        const current = nameNode.textContent?.replace(/\s/g, '') ?? ''
        if (!current) {
            nameNode.textContent = book.title
            if (arrow) nameNode.appendChild(arrow)
        }
    }

    const descNode = dialog.querySelector<HTMLElement>('.reader-catalog-desc')
    if (descNode) {
        const text = descNode.textContent ?? ''
        // 站点对被屏蔽的书也会渲染出残缺的「・更新」（状态和时间都是空的）。
        // 判空不能只看有没有字：去掉分隔符后只剩「更新」两个字同样算没内容。
        const meaningful = text.replace(/[・\s]/g, '').replace(/^更新$/, '')
        if (!meaningful) {
            const desc = buildCatalogDesc(book, chapters)
            if (desc) descNode.textContent = desc
        }
    }

    const authorNode = dialog.querySelector<HTMLElement>('.reader-catalog-author')
    if (authorNode && book?.author && !authorNode.textContent?.trim()) {
        authorNode.textContent = book.author
    }

    const coverImg = dialog.querySelector<HTMLImageElement>('.reader-catalog-header-left img')
    if (coverImg && book?.cover_url && !coverImg.getAttribute('src')) {
        coverImg.src = book.cover_url
        coverImg.alt = book.title ?? ''
    }

    const operatorLeft = dialog.querySelector<HTMLElement>('.reader-catalog-operator-left')
    if (operatorLeft) operatorLeft.textContent = `目录・${total}`
}

/**
 * 书名下面那行「连载中・22小时前更新」，与站点 Reader 组件的拼法一致：
 *
 *   g.i[creationStatus] + '・' + relTime(lastChapter.firstPassTime) + '更新'
 *
 * 站点原文：未完结时取**最后一章**的 firstPassTime 算相对时间；完结（DONE）
 * 时整段返回空串，只留状态。这里照抄，区别是时间戳从 ChapterItem.update_time
 * 反解（接口层只保留了格式化后的字符串）。
 *
 * book 可能还没到手（currentBook 是异步填的），这时状态退化成「连载中」——
 * 目录本身有更新就是连载中，这个判断对被屏蔽的书足够用，总比留个「・更新」强。
 */
function buildCatalogDesc(book: Book | null | undefined, chapters: ChapterItem[]): string {
    const status = book?.status === '连载' ? '连载中' : book?.status || '连载中'
    // 完结书站点不显示这次更新时间
    if (status === '完结') return status

    const last = chapters.slice(-1)[0]
    const updated = last ? fromNow(parseChapterTime(last)) : ''
    // 拿不到有效时间就退化成接口给的 update_time，别显示「从未更新」
    const rel = updated && updated !== '从未' ? updated : ''
    const tail = rel ? `${rel}更新` : book?.update_time ? `${book.update_time}更新` : ''

    return [status, tail].filter(Boolean).join('・') || '目录由脚本补全'
}

/** ChapterItem.update_time 是 'YYYY-MM-DD HH:mm:ss'，换成时间戳给 fromNow */
function parseChapterTime(chapter: ChapterItem): number {
    const parsed = Date.parse((chapter.update_time ?? '').replace(' ', 'T'))
    return Number.isFinite(parsed) ? parsed : 0
}

/**
 * 章节行，结构与站点完全一致：
 *   <div class="chapter" data-item-id="…"><div class="chapter-text">标题</div></div>
 *
 * 点击不需要在这里处理：paraComment 里已经有一层目录项点击接管（按 data-item-id
 * 关目录、改 URL，再由导航钩子重渲染），它不依赖 React，对我们补的节点同样生效。
 */
function buildChapterRow(chapter: ChapterItem, currentItemId: string): HTMLElement {
    const row = document.createElement('div')
    row.className = 'chapter'
    row.setAttribute('data-item-id', chapter.item_id)
    if (chapter.item_id === currentItemId) row.classList.add('active')

    const text = document.createElement('div')
    text.className = 'chapter-text'
    text.textContent = chapter.title
    text.title = chapter.title
    row.appendChild(text)
    return row
}

/** 目录接口下发的卷名形如「第一卷：默认」，站点只显示「第一卷」 */
function cleanVolumeTitle(title?: string): string {
    return (title ?? '').replace(/[：:]\s*默认$/, '').trim()
}

/**
 * 找目录弹窗里放章节的那个容器。
 *
 * 站点是 `#catalog-content > .reader-catalog-chapters`。但弹窗挂载是分步的：
 * 先出现 .reader-catalog 和顶部信息，章节容器可能晚一拍；也有主题/改版把 id 或
 * 这层包裹省掉的情况。所以逐级放宽，取第一个命中的。
 */
function findChapterRoot(): HTMLElement | null {
    const direct = document.querySelector<HTMLElement>(`${CATALOG_CONTENT_SEL} ${CHAPTERS}`)
    if (direct) return direct
    const byClass = document.querySelector<HTMLElement>(`${DIALOG_SEL} ${CHAPTERS}`)
    if (byClass) return byClass
    const content = document.querySelector<HTMLElement>(CATALOG_CONTENT_SEL)
    if (content) return content
    // 弹窗还在挂载：返回 null，由调用方等下一轮
    return null
}

/** 弹窗里还没有章节（容器都还没出现也算「需要补」，交给重试逻辑等） */
export function catalogNeedsFill(): boolean {
    const root = findChapterRoot()
    if (!root) return true
    return !root.querySelector('.chapter')
}

/**
 * 用接口数据把目录弹窗填满。
 *
 * 站点弹窗的骨架（.reader-catalog / -header / -operator / -content-wrap / #catalog-content）
 * 即使没有数据也照样渲染，只有 .reader-catalog-chapters 是空的。
 * 这里只往里面填内容，节点结构与类名保持站点原样，CSS 直接命中。
 */
export async function ensureCatalogFilled(
    book: Book | null | undefined,
    bookId: string,
    currentItemId: string,
): Promise<void> {
    if (!bookId) return
    let catalog
    try {
        catalog = await getCatalog(bookId)
    } catch (err) {
        console.warn('[fqa:blocked] 取目录失败:', err)
        return
    }
    const chapters: ChapterItem[] = (catalog?.chapter_list ?? []).filter(Boolean)
    if (!chapters.length) {
        console.warn('[fqa:blocked] 接口也没有这本书的目录')
        return
    }
    // 头部信息每次都刷新：书名/状态/作者可能在首次进入时还没拿到，后来才补上
    fillHeader(book, chapters)

    // 容器可能比弹窗晚出现：最多等约 1.5 秒，每帧再看一次
    let root: HTMLElement | null = null
    for (let i = 0; i < 20; i++) {
        root = findChapterRoot()
        if (root) break
        await new Promise<void>(resolve => requestAnimationFrame(() => resolve()))
    }
    if (!root) return
    // 已经有章节（站点填过，或我们上一轮填过）就不动，免得和站点的分页 / 倒序打架
    if (root.querySelector('.chapter')) return

    const frag = document.createDocumentFragment()

    /**
     * 一个卷：外层 <div> 包住 volume-header 和若干 chapter-outer-container。
     *
     * 结构必须严格照抄站点（Reader 组件的渲染结果）：
     *   <div class="reader-catalog-chapters">
     *     <div>                                  ← 每个卷一层
     *       <div class="volume-header">…</div>
     *       <div class="chapter-outer-container"><div class="chapter">…</div></div>
     *       <div class="chapter-outer-container"><div class="chapter">…</div></div>
     *       …
     *     </div>
     *   </div>
     *
     * 「一行两章」靠的是 .chapter-outer-container 自身 display:inline-block + width:50%，
     * 所以**每章必须各自占一个容器**。曾经把所有章节塞进同一个 container，
     * 结果只有一个 inline-block 盒子，再怎么调宽度也只能一行一章。
     */
    const appendVolume = (title: string, list: ChapterItem[], showHeader: boolean): void => {
        if (!list.length) return
        const group = document.createElement('div')

        if (showHeader) {
            const header = document.createElement('div')
            header.className = 'volume-header'
            header.appendChild(document.createTextNode(`${title} · 共${list.length}章`))
            const arrow = document.createElement('i')
            arrow.className = 'arrow'
            header.appendChild(arrow)
            group.appendChild(header)
        }

        for (const chapter of list) {
            const outer = document.createElement('div')
            outer.className = 'chapter-outer-container'
            outer.appendChild(buildChapterRow(chapter, currentItemId))
            group.appendChild(outer)
        }
        frag.appendChild(group)
    }

    const volumes = catalog.volume_list ?? []
    if (volumes.length > 1) {
        for (const vol of volumes) {
            appendVolume(
                cleanVolumeTitle(vol.title),
                (vol?.chapter_list ?? []).filter(Boolean),
                true,
            )
        }
    } else {
        // 只有一卷：站点同样会显示「第N卷 · 共X章」，这里保持一致
        const title = volumes.length === 1 ? cleanVolumeTitle(volumes[0]!.title) : ''
        appendVolume(title, chapters, !!title)
    }

    // 直接往容器里塞；不先清空，避免万一 container 里站点还留着「加载中」占位时被顺带清掉别的东西
    root.appendChild(frag)
    // 目录是异步补的，paraComment 里「打开目录定位到当前章」的那次 locate 早在弹窗挂载时就跑完了，
    // 那时还没有章节行。这里补完后自己再定位一次，让当前章停在顶部。
    const active = root.querySelector<HTMLElement>('.chapter.active')
    if (active) {
        try {
            active.scrollIntoView({ block: 'start', behavior: 'auto' })
        } catch {
            /* 弹窗已关闭时滚动容器不存在，忽略 */
        }
    }
    console.debug('[fqa:blocked] 已补齐目录:', chapters.length, '章 ->', root.className || root.id)
}
