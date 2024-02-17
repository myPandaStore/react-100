/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-02-17 19:50:26
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-02-17 19:51:02
 * @FilePath: \react-100\src\app\utils\color.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
export function hslToRgb(h: number, s: number, l: number): [number, number, number] {
    let r, g, b

    if (s === 0) {
        r = g = b = l // achromatic
    }
    else {
        const hue2rgb = function hue2rgb(p: number, q: number, t: number) {
            if (t < 0) t += 1
            if (t > 1) t -= 1
            if (t < 1 / 6) return p + (q - p) * 6 * t
            if (t < 1 / 2) return q
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
            return p
        }

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s
        const p = 2 * l - q
        r = hue2rgb(p, q, h + 1 / 3)
        g = hue2rgb(p, q, h)
        b = hue2rgb(p, q, h - 1 / 3)
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}