/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-02-01 10:06:51
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-02-01 15:29:33
 * @FilePath: \react-100\src\app\020\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import { useRef, useEffect, useState } from 'react'
import useRafFn from '../Hooks/useRafFn'
import { timestamp, random, distance, toHex } from '../utils'
import initCanvas from '../utils/initCanvas'
import Paper from '../components/paper'
import Note from '../components/note'

const { max, round } = Math

export default function Connect() {
    const el = useRef<HTMLCanvasElement | null>(null)
    const frame = useRef<() => void>(() => { })

    useEffect(() => {
        const canvas = el.current!
        const { ctx } = initCanvas(canvas)
        const { width, height } = canvas

        const timeout = 2000
        function getFade(t = 0, ts = 0) {
            return 1 - (ts - t) / timeout
        }

        let points: [number, number, number][] = []

        frame.current = () => {
            const ts = timestamp()

            points.push([
                random(500, -100),
                random(500, -100),
                ts
            ])

            ctx.clearRect(0, 0, width, height)
            ctx.lineWidth = 0.2
            const D = 100

            points = points.filter(([x, y, t], idx) => {
                const fade = getFade(t, ts)

                if (fade < 0) {
                    return false
                }

                if (idx !== 0) {
                    for (let ni = 1; ni < idx; ni++) {
                        const [x1, y1, t2] = points[ni - 1]
                        if (distance([x1, y1], [x, y]) < D) {
                            const fade2 = getFade(t2, ts)
                            const color = max(0, round(fade * fade2 * 255))
                            ctx.strokeStyle = `#000000${toHex(color)}`
                            ctx.beginPath()
                            ctx.moveTo(x1, y1)
                            ctx.lineTo(x, y)
                            ctx.stroke()
                        }
                    }
                }
                return true
            })
        }
    }, [])

    useRafFn(frame.current, true, { immediate: true })

    return (
        <>
            <Paper>
                <div className="box centered">
                    <canvas ref={el} width={400} height={400}></canvas>
                </div>
            </Paper>
            <Note></Note>
        </>
    )
}