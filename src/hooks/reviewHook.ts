// 详情页「目录 / 书评」切换的入口。
//
// 只在 /page/<bookId> 上工作，和下载钩子相互独立（下载功能关掉也照样有书评）。
// 离开详情页时把挂载的东西拆掉，避免 SPA 里残留。

import type { HookConfig } from '../config'
import { ensureDetailTabs, teardown } from '../detailTabs'

function parseBookId(path: string): string {
    return path.match(/^\/page\/(\d+)/)?.[1] ?? ''
}

function isPagePath(path: string): boolean {
    return /^\/page\/\d+/.test(path)
}

async function main(_previous?: string): Promise<void> {
    const path = window.location.pathname
    if (!isPagePath(path)) {
        teardown()
        return
    }
    const bookId = parseBookId(path)
    if (!bookId) return
    await ensureDetailTabs(bookId)
}

const _exports: HookConfig[] = [
    {
        id: 'reviewHook_load',
        event: 'load',
        filter: path => isPagePath(path),
        handler: main,
    },
    {
        id: 'reviewHook_urlChange',
        event: 'onUrlChange',
        // 已挂载时也要进来看一眼，否则离开详情页没机会拆
        filter: (path) => isPagePath(path) || document.getElementById('fqa-dt-tabs') !== null,
        handler: main,
    },
]

export default _exports
