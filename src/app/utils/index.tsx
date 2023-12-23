/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2023-12-23 10:30:46
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2023-12-23 10:33:41
 * @FilePath: \react-100\src\app\utils\index.tsx
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */

export function shuffle<T>(arr: T[]): T[] {
    const array = arr.slice(0)
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array
}
export function range(to: number) {
    return new Array(to).fill(0).map((_, i) => i)
}