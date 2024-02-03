/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-02-03 14:04:56
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-02-03 15:19:15
 * @FilePath: \react-100\src\app\021\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import { useEffect, useRef, useState } from "react"
import useRafFn from '../Hooks/useRafFn'
import initCanvas from "../utils/initCanvas"
import { timestamp } from "../utils"
import { pick } from "../utils/vector"
import Paper from "../components/paper"
import Note from "../components/note"

const { sqrt, pow } = Math
export default function Gravity() {
    const el = useRef<HTMLCanvasElement | null>(null)
    const frame = useRef<() => void>(() => { })
    const palette = [
        ['#B1B479', '#A35E47', '#B1B479', '#A35E47'],
        ['#CB1B45', '#A5A051', '#F9BF45', '#006284'],
        ['#F17C67', '#F17C67', '#F7D94C', '#F7D94C'],
        ['#69B0AC', '#90B44B', '#69B0AC', '#90B44B'],
        ['#222222', '#999999', '#222222', '#999999'],
    ]
    const pattern = useRef(0x1111)
    const colors = useRef(palette[0])
    let ts = timestamp()

    function reset() {
        ts = timestamp()
        pattern.current = pick([
            0x0101,
            0x0011,
            0x1111,
            0x1010,
            0x1100,
        ])
        colors.current = pick(palette)
    }


    useEffect(() => {
        const canvas = el.current!
        const { ctx } = initCanvas(canvas)
        const { width, height } = canvas

        const amount = 25
        const ratio = 30
        const cycle = sqrt(ratio * 2)
        const interval = cycle / amount
        const G = height / ratio

        function down(offset = 0) {
            ctx.beginPath()
            ctx.moveTo(0, offset)
            ctx.lineTo(width, offset)
            ctx.stroke()
        }

        function right(offset = 0) {
            ctx.beginPath()
            ctx.moveTo(offset, 0)
            ctx.lineTo(offset, height)
            ctx.stroke()
        }

        function up(offset = 0) {
            ctx.beginPath()
            ctx.moveTo(0, height - offset)
            ctx.lineTo(width, height - offset)
            ctx.stroke()
        }

        function left(offset = 0) {
            ctx.beginPath()
            ctx.moveTo(width - offset, 0)
            ctx.lineTo(width - offset, height)
            ctx.stroke()
        }

        frame.current = () => {
            const t = timestamp() - ts
            ctx.clearRect(0, 0, width, height)

            for (let i = 0; i < amount; i++) {
                const it = (t / 1000 - i * interval) % cycle
                if (it < 0) {
                    continue
                }

                const offset = G * pow(it, 2) / 2

                if (pattern.current & 0x0001) {
                    ctx.strokeStyle = colors.current[0]
                    down(offset)
                }
                if (pattern.current & 0x0010) {
                    ctx.strokeStyle = colors.current[1]
                    up(offset)
                }
                if (pattern.current & 0x0100) {
                    ctx.strokeStyle = colors.current[2]
                    right(offset)
                }
                if (pattern.current & 0x1000) {
                    ctx.strokeStyle = colors.current[3]
                    left(offset)
                }
            }
        }
    }, [ts])

    useRafFn(frame.current, true, { immediate: true })

    return (
        <>
            <Paper>
                <div className="box centered" onClick={() => reset()}>
                    <canvas ref={el} width={400} height={400}></canvas>
                </div>
            </Paper>
            <Note>

            </Note>
        </>
    )
}