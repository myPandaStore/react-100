/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-01-24 09:50:17
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-02-01 12:17:27
 * @FilePath: \react-100\src\app\014\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import { useEffect, useRef, useState, useMemo } from 'react';
import useRafFn from '../Hooks/useRafFn';
import initCanvas from '../utils/initCanvas';
import { SQRT_2, r90, r180, pick } from '../utils/vector';
import Paper from '../components/paper';
import Note from '../components/note';
import { range, shuffle, timestamp } from '../utils'

export default function App() {
    const el = useRef<HTMLCanvasElement | null>(null);
    const frame = useRef<() => void>(() => { })

    useEffect(() => {
        const canvas = el.current!
        const { ctx } = initCanvas(canvas)
        const { width, height } = canvas

        const duration = 1500
        const ts = timestamp() + 1000

        frame.current = () => {
            const t = Math.max(timestamp() - ts, 0)
            ctx.clearRect(0, 0, width, height);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 0.5

            for (const i of range(30)) {
                iterations(t - duration * 3 * i)
            }

        }

        function iterations(t: number) {
            if (t < 0) {
                return
            }

            const turn = t % (duration * 2) >= duration
            const rt = t % duration
            const rounds = Math.floor(t / (duration * 2))
            const size = Math.round(398 / Math.pow(SQRT_2, rounds))

            if (size < 5) {
                return
            }

            if (turn) {
                round2rect(size, Math.round(size * Math.pow(rt / 550, 2)))
            } else {
                rect2round(size, Math.round(Math.pow(rt / 60, 4)))
            }
        }

        const cx = 200
        const cy = 200
        function round2rect(size = 0, r = 0) {
            const x = cx - size / 2
            const y = cy - size / 2
            r = Math.min(r, size / 2)
            ctx.beginPath()
            // top
            ctx.moveTo(x + r, y)
            ctx.lineTo(x + size - r, y)
            ctx.arc(x + size - r, y + r, r, -r90, 0)
            // right
            ctx.lineTo(x + size, y + size - r)
            ctx.arc(x + size - r, y + size - r, r, 0, r90)
            // bottom
            ctx.lineTo(x + r, y + size)
            ctx.arc(x + r, y + size - r, r, r90, r180)
            // left
            ctx.lineTo(x, y + r)
            ctx.arc(x + r, y + r, r, r180, -r90)
            ctx.closePath()
            ctx.stroke()
        }

        function rect2round(size = 0, d = 0) {
            const hs = size / 2

            const h = hs + d
            const rad = Math.atan2(hs, h)
            const r = h / Math.cos(rad)

            ctx.beginPath()

            ctx.arc(cx, cy + d, r, -r90 - rad, -r90 + rad)
            ctx.arc(cx - d, cy, r, -rad, +rad)
            ctx.arc(cx, cy - d, r, r90 - rad, r90 + rad)
            ctx.arc(cx + d, cy, r, r180 - rad, r180 + rad)

            ctx.stroke()
        }
    }, [])

    useRafFn(frame.current, true, { immediate: true })

    return (
        <>
            <Paper >
                <canvas
                    ref={el}
                    width={400}
                    height={400}
                    className='centered'>
                </canvas>
            </Paper>
            <Note>

            </Note >
        </>
    )
}