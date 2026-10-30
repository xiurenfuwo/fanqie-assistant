// 记住最近读过的书。
//
// 有些书详情页会跳到 /page/undefined（服务端拿不到书号），但阅读页在浏览器里
// 是能正常渲染的，__INITIAL_STATE__ 里就带着 bookId。把读到的书号存下来，
// 详情页解析失败时就能自己补回去。

import { read, write } from './localStorage'

const KEY = 'fqa:last-book'

export interface LastBook {
    bookId: string
    title?: string
    t: number
}

export function rememberBook(bookId?: string, title?: string): void {
    if (!bookId || !/^\d{10,20}$/.test(String(bookId))) return
    const id = String(bookId)
    const prev = read(KEY) as LastBook | null
    if (prev?.bookId === id && prev?.title === title) return
    write(KEY, { bookId: id, title, t: Date.now() } as LastBook)
}

export function getLastBook(): LastBook | null {
    const v = read(KEY) as LastBook | null
    return v && typeof v.bookId === 'string' ? v : null
}
