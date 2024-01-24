/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2023-12-22 10:37:07
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-01-24 10:07:41
 * @FilePath: \react-100\src\app\utils\vector.tsx
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
export type Vector = [number, number]

export const r180 = Math.PI
export const r90 = Math.PI / 2
export const r60 = Math.PI / 3
export const r30 = Math.PI / 6
export const r15 = Math.PI / 12
export const r120 = Math.PI / 3 * 2
export const r360 = Math.PI * 2
export const SQRT_3 = Math.sqrt(3)
export const SQRT_2 = Math.sqrt(2)

export function exclude<T>(arr: T[], current: T): T[] {
    return arr.filter(item => item !== current)
}

export function pick<T>(arr: T[], current?: T): T {
    if (current) {
        return pick(exclude(arr, current))
    }
    return arr[Math.floor(Math.random() * arr.length)]
}

export function get<T>(arr: T[], index: number) {
    return arr[index % arr.length]
}