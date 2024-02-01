/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-01-28 20:21:36
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-02-01 12:23:15
 * @FilePath: \react-100\src\app\016\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import { useRef, useEffect, useState } from 'react'
import useRafFn from '../Hooks/useRafFn'
import { timestamp } from '../utils'
import initCanvas from '../utils/initCanvas'
import Paper from '../components/paper'
import Note from '../components/note'

const { cos, sin, abs, random, max, round } = Math
type Color = { r?: number, g?: number, b?: number }

export default function App() {
    const el = useRef<HTMLCanvasElement | null>(null)
    const frame = useRef(() => { })
    const [coeff, setCoeff] = useState<number[]>([
        0, 0, 0, 0, 0, 0,
        2, 3, 2, 2, 6, -2,
        8, 2, 1, 2, -5.3, 3,
    ])


    const ts = timestamp()
    useEffect(() => {
        const canvas = el.current!
        const { ctx, dpi } = initCanvas(canvas)
        const { width, height } = canvas
        const data = ctx.createImageData(width, height)

        const drawPixel = (data: ImageData, x: number, y: number, { r, g, b }: Color, alpha = 1) => {
            if (x < 0 || x >= width || y < 0 || y >= width)
                return
            const pixelindex = (y * width + x) * 4
            if (r != null)
                data.data[pixelindex] = data.data[pixelindex] * (1 - alpha) + r * alpha
            if (g != null)
                data.data[pixelindex + 1] = data.data[pixelindex + 1] * (1 - alpha) + g * alpha
            if (b != null)
                data.data[pixelindex + 2] = data.data[pixelindex + 2] * (1 - alpha) + b * alpha
        }
        const clear = () => {
            const length = data.data.length * 4
            for (let i = 0; i < length; i += 1)
                data.data[i] = i % 4 === 3 ? 255 : 0
        }

        // anti-aliasing
        const aa = 0.25
        const ellipse = (cx: number, cy: number, a: number, b: number, rad: number, color: Color) => {
            const cosRad = cos(rad)
            const sinRad = sin(rad)
            const a2 = a ** 2 || 1
            const b2 = b ** 2 || 1
            cx = round(cx)
            cy = round(cy)

            const box = round(max(abs(a), abs(b)) * 2)

            for (let x = -box; x < box; x++) {
                for (let y = -box; y < box; y++) {
                    const distance = (x * cosRad + y * sinRad) ** 2 / a2 + (x * sinRad - y * cosRad) ** 2 / b2 - 1
                    if (distance < aa)
                        drawPixel(data, x + cx, y + cy, color, 1 - max(0, distance) / aa)
                }
            }
        }

        const distance = dpi * 40
        const amount = round(width / distance)
        const offset = 18 * dpi
        frame.current = () => {
            const t = timestamp() - ts
            clear()
            const C = coeff
            const rad = t / 2000

            for (let x = 0; x < amount; x++) {
                for (let y = 0; y < amount; y++) {
                    ellipse(offset + x * distance, offset + y * distance, (C[0] + x) * C[1], (C[2] + y) * C[3], (C[4] + rad) * C[5], { r: 255 })
                    ellipse(offset + x * distance - 4, offset + y * distance, (C[6] + x) * C[7], (C[8] + y) * C[9], (C[10] + rad) * C[11], { g: 255 })
                    ellipse(offset + x * distance, offset + y * distance - 4, (C[12] + x) * C[13], (C[14] + y) * C[15], (C[16] + rad) * C[17], { b: 255 })
                }
            }

            ctx.putImageData(data, 0, 0)
        }
    }, [ts, coeff])
    useRafFn(frame.current, true, { immediate: true })

    function randomCoeff(idx: number) {
        if (idx % 2)
            return (random() - 0.5) * 12
        else
            return (random() - 0.5) * 20
    }

    function rollAtt(idx: number): any {
        const nextCoeff = coeff.map((c, i) => i === idx ? randomCoeff(i) : c)
        console.log(idx, nextCoeff)
        setCoeff(nextCoeff)

    }

    const coeffItems = coeff.map((c, idx) =>
        <div
            className="coeff-item"
            key={idx}
            onClick={() => rollAtt(idx)}
            style={{ cursor: 'pointer', color: c < 0 ? '#CBD5E0' : '#718096' }}
        >
            {c}
        </div>
    )
    return (
        <>
            <Paper >
                <div className="box centered">
                    <canvas ref={el}></canvas>
                    {coeffItems}
                </div>
            </Paper>
            <Note></Note>
        </>
    )
}