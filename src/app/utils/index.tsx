/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2023-12-23 10:30:46
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-01-28 10:17:17
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

export type ColorVector = [number, number, number]

export function hexToRgb(hex: string): ColorVector {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : [0, 0, 0]
}

export const timestamp = () => +Date.now();
