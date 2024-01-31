/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2023-12-23 10:30:46
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-01-31 09:34:14
 * @FilePath: \react-100\src\app\utils\index.tsx
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { Vector } from "./vector";
import { clamp } from 'lodash-es'

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

export function random(max = 1, min = 0) {
    return Math.random() * (max - min) + min
}

export function inbound([x, y]: Vector, width = 400, height = 400) {
    return x >= 0 && x < width && y >= 0 && y < height
}

export function colorInterpration(vectors: ColorVector[], n: number): ColorVector {
    if (n >= 1) {
        return vectors[vectors.length - 1]
    }

    const normalized = clamp(n, 0, 1) * (vectors.length - 1)
    const integar = Math.trunc(normalized)
    const frac = normalized - integar
    const nfrac = 1 - frac

    const [a1, a2, a3] = vectors[integar]
    const [b1, b2, b3] = vectors[integar + 1]

    return [
        a1 * nfrac + b1 * frac,
        a2 * nfrac + b2 * frac,
        a3 * nfrac + b3 * frac,
    ]
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
