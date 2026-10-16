// 段评渲染细节：系统表情兜底、时间格式化、图片元素。

import type { ParaCommentImage } from '../types'

/**
 * 番茄官方 53 个系统表情名 -> Unicode 兜底。
 *
 * 正文里的 `[名字]` 是系统表情。服务端只在少数评论里附带对应表情图，
 * 大多数情况拿不到原版图，这里统一用 Unicode 近似，避免正文出现 `[名字]` 原文。
 * 名单取自 APP 内置的 assets/emoji_config.json。
 */
const EMOJI_UNICODE: Record<string, string> = {
    微笑: '😊', 偷笑: '🤭', 笑: '😄', 什么: '🤔', 害羞: '😳',
    爱慕: '😍', 飞吻: '😘', 奸笑: '😏', 尬笑: '😅', 思考: '🤔',
    撇嘴: '😒', 做鬼脸: '😜', 酷: '😎', 翻白眼: '🙄', 惊呆: '😲',
    震惊: '😱', 送心: '💝', 委屈: '🥺', 快哭了: '😢', 笑哭: '😂',
    哭: '😭', 大笑: '😆', 舔屏: '🤤', 怒: '😡', 捂脸: '🤦',
    吐: '🤮', 恐惧: '😨', 抓狂: '😫', 敬礼: '🫡', 石化: '😵',
    OK: '👌', 赞: '👍', 爱心: '❤️', 伤心: '💔', KISS: '💋',
    懂了: '💡', 探究: '🔍', 重拳出击: '👊', 吃瓜: '🍉', 盯: '👀',
    你细品: '🤨', 赶稿中: '✍️', 注意: '⚠️', 饱了: '😋', 码住: '📌',
    学会了: '🎓', 顶帖: '⬆️', 求爆更: '🙏', 求关注: '📣', 我也强推: '🤝',
    雀食神作: '🐦', 已种草: '🌱', 书架加一: '📚',
}

const EMOJI_TOKEN = /\[[^\]]{1,12}\]/g

/** 正文文本 -> 文本节点，`[名字]` 换成对应 Unicode 表情 */
export function renderCommentText(raw: string): Text {
    return document.createTextNode(raw.replace(EMOJI_TOKEN, token => EMOJI_UNICODE[token.slice(1, -1)] ?? token))
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
