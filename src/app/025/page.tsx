/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-02-25 20:16:08
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-02-27 21:28:24
 * @FilePath: \react-100\src\app\025\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import { useRef, useEffect, useState } from "react"
import initCanvas from "../utils/initCanvas"
import { distance } from "../utils/vector"
import { random } from "../utils"
import { useSearchParams } from "next/navigation"
import { defaultWindow } from "../utils/shared"
import Paper from "../components/paper"
import Note from "../components/note"
import type { Line, LineSegment } from "./type"
import type { Vector } from '../utils/vector'

export default function Cross() {
    const el = useRef<HTMLCanvasElement | null>(null)
    const next = useRef<() => void>(() => { })
    const reset = useRef<() => void>(() => { })
    const [pattern, setPattern] = useState<number>(0)
    const searchParams = useSearchParams()
    const debug = searchParams.get('debug')

    defaultWindow?.addEventListener('keydown', (e) => {
        if (e.key === 'r') {
            setPattern((p) => (p + 1) % 4)
            reset.current()
        }
    })

    useEffect(() => {
        const { ctx } = initCanvas(el.current!)
        const { width, height } = ctx.canvas
        const MAX_LINES = 1000

        function isTruthy<T>(x: T | undefined): x is T {
            return Boolean(x)
        }

        // ax + by + c = 0
        let lines: LineSegment[] = []

        const line = (left: Vector, right: Vector) => {
            ctx.beginPath()
            ctx.moveTo(...left)
            ctx.lineTo(...right)
            ctx.stroke()
        }

        const dot = ([x, y]: Vector, color = 'red') => {
            if (!debug) {
                return
            }
            ctx.beginPath()
            ctx.fillStyle = color
            ctx.arc(x, y, 2, 0, Math.PI * 2)
            ctx.fill()
        }

        const randomPoint = (p = 0): Vector => {
            switch (p) {
                case 1:
                    // around
                    let cx = random() > 0.5 ? width - 1 : 1
                    let cy = random() * height
                    if (random() > 0.5)
                        [cx, cy] = [cy, cx]
                    return [cx, cy]
                case 2:
                    // center
                    return [200 + random(1, -1) * 50, 200 + random(1, -1) * 50];
                case 3:
                    // cross center
                    if (random() > 0.5) {
                        return [200, random() * height]
                    } else {
                        return [random() * width, 200]
                    };
                default:
                    return [random() * width, random() * height];

            }
        }

        const randomRad = (p = 0): number => {
            return random(1, -1) * Math.PI
        }

        const cross = ([a1, b1, c1]: Line, { line: [a2, b2, c2], left, right }: LineSegment): Vector | undefined => {
            // a1x + b1y + c1 = 0
            // a2x + b2y + c2 = 0
            // (a1 - a2)x + c1 - c2 = 0
            // b = 1
            const x = -(c1 - c2) / (a1 - a2)
            if (x < left[0] || x > right[0])
                return
            const [, y] = solve([a1, b1, c1], x)
            return [x, y]
        }

        const solve = ([a, b, c]: Line, x: number): Vector => {
            // ax+by+c=0
            // b = 1
            // y=-c-ax
            const y = -(c + a * x) / b
            return [x, y]
        }

        reset.current = () => {
            lines = []
            ctx.clearRect(0, 0, width, height)
        }
        next.current = () => {
            const cp = randomPoint(pattern) // change this to have different gen points
            const [cx, cy] = cp

            const rad = randomRad(pattern)
            // a / b = tan(rad)
            // a * cx + b * cy + c = 0
            // b = 1
            // a = tan(rad) / cx
            // c = - (cy + a * cx)

            const a = Math.tan(rad)
            const b = 1
            const c = -(cy + a * cx)

            dot(cp)

            const l: Line = [a, b, c]

            const points = lines.map(l2 => cross(l, l2)).filter(isTruthy)

            const { p: left } = [...points.filter(([x, y]) => x <= cx), solve(l, 0)]
                .map(p => ({ p, d: distance(cp, p) }))
                .sort((a, b) => a.d - b.d)[0]
            const { p: right } = [...points.filter(([x, y]) => x >= cx), solve(l, width)]
                .map(p => ({ p, d: distance(cp, p) }))
                .sort((a, b) => a.d - b.d)[0]

            dot(left, 'green')
            dot(right, 'orange')

            line(left, right)

            lines.push({ line: l, left, right })

        }
        const interval = setInterval(() => {
            if (lines.length >= MAX_LINES) {
                reset.current()
            }
            next.current()
        }, 50)

        return () => {
            clearInterval(interval)
        }
    }, [pattern, debug])

    return (
        <>
            <Paper >
                <div className="box centered">
                    <canvas ref={el} width={400} height={400} onClick={() => reset.current()}></canvas>
                </div>
            </Paper>
            <Note></Note>
        </>
    )
}