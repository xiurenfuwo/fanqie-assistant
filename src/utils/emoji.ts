// 评论正文里的系统表情。
//
// 番茄正文里的 `[名字]` 是系统表情（如 `[微笑]`）。服务端只在少数评论里
// 附带对应表情图，大多数情况拿不到原版图，所以统一换成 Unicode 近似，
// 避免界面上直接露出 `[名字]` 原文。
//
// 名单取自 APP 内置的 assets/emoji_config.json，段评与书评共用这一份。

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

/** 只匹配 `[1~12 个字]`，避免把正文里的书名号、方括号引用误判成表情 */
const EMOJI_TOKEN = /\[[^\]]{1,12}\]/g

/**
 * 把正文里的 `[名字]` 换成 Unicode 表情。
 *
 * 不认识的 token 原样保留 —— 有些作者会用 `[注释]` 这类写法，
 * 直接吞掉反而会丢内容。
 */
export function replaceEmojiTokens(raw: string): string {
    if (!raw || raw.indexOf('[') === -1) return raw
    return raw.replace(EMOJI_TOKEN, token => EMOJI_UNICODE[token.slice(1, -1)] ?? token)
}

/** 段评用：直接产出文本节点 */
export function emojiTextNode(raw: string): Text {
    return document.createTextNode(replaceEmojiTokens(raw))
}
