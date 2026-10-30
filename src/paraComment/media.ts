// 段评渲染细节：系统表情兜底、时间格式化、图片元素。

import type { ParaCommentImage } from '../types'
import { emojiTextNode } from '../utils/emoji'

/**
 * 正文文本 -> 文本节点，`[名字]` 换成对应 Unicode 表情。
 *
 * 表情表已抽到 utils/emoji.ts，段评与书评共用一份，这里只保留原来的调用形式。
 */
export function renderCommentText(raw: string): Text {
    return emojiTextNode(raw)
}

/** 秒级时间戳 -> YYYY-MM-DD HH:mm */
export function formatTime(ts: number): string {
    if (!Number.isFinite(ts) || ts <= 0) return ''
    const d = new Date(ts * 1000)
    const p = (n: number) => String(n).padStart(2, '0')
    return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`
}

/**
 * 评论附带的图片/表情包。
 *
 * 注意：它是评论另行附加的图，**不要**拿去替换正文里的 `[名字]`。
 * 加载失败时隐藏，避免留一个破图占位。
 */
export function makeImage(img: ParaCommentImage): HTMLImageElement {
    const el = document.createElement('img')
    el.className = 'fqa-pc-img'
    el.loading = 'lazy'
    el.referrerPolicy = 'no-referrer'
    el.alt = ''
    el.src = img.url
    el.addEventListener('error', () => {
        el.style.visibility = 'hidden'
    })
    return el
}
