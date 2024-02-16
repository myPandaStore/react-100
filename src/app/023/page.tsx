/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-02-16 09:42:40
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-02-16 11:46:32
 * @FilePath: \react-100\src\app\023\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import { useEffect, useRef, useState } from "react"
import initCanvas from "../utils/initCanvas"
import type { Vector } from '../utils/vector'
import { r30, SQRT_3 } from "../utils/vector"
import ClassNames from "classnames"
import Paper from "../components/paper"
import Note from "../components/note"

export default function Fractal() {
    const el = useRef<HTMLCanvasElement | null>(null)
    const next = useRef(() => void 0)
    const [shake, setShake] = useState<boolean>(false)
    const shakeClass = ClassNames(shake ? 'shake' : '')

    useEffect(() => {
        const { ctx } = initCanvas(el.current!)

        const TL = 1
        const TR = 1 << 1
        const L = 1 << 2
        const CL = 1 << 3
        const CR = 1 << 4
        const R = 1 << 5
        const BL = 1 << 6
        const CB = 1 << 7
        const BR = 1 << 8

        const C = CL | CR | CB
        const T = TL | TR
        // const RR = R | TR | BR
        // const LL = L | TL | BL
        const B = BR | BL

        const line = (a: Vector, b: Vector) => {
            ctx.beginPath()
            ctx.moveTo(...a)
            ctx.lineTo(...b)
            ctx.stroke()
        }

        const drawBox = (x: number, y: number, size: number, lines = 0b111111111) => {
            const c: Vector = [x, y] // 顶点
            const points: Vector[] = new Array(6)
                .fill(0)
                .map((_, i) => [
                    x + size * Math.cos(i % 6 * 2 * Math.PI / 6 + r30),
                    y + size * Math.sin(i * 2 * Math.PI / 6 + r30),
                ])

            ctx.strokeStyle = '#000000'
            ctx.lineWidth = 1

            if (lines & TL) {
                line(points[3], points[4])
            }
            if (lines & TR) {
                line(points[4], points[5])
            }
            if (lines & L) {
                line(points[2], points[3])
            }
            if (lines & CL) {
                line(c, points[3])
            }
            if (lines & CR) {
                line(c, points[5])
            }
            if (lines & R) {
                line(points[5], points[0])
            }
            if (lines & BL) {
                line(points[1], points[2])
            }
            if (lines & CB) {
                line(c, points[1])
            }
            if (lines & BR) {
                line(points[0], points[1])
            }
        }

        const cx = 200, cy = 200
        const SQRT_3_2 = SQRT_3 / 2
        let timeout: any
        let shakeTimeout: any
        let centers: Vector[] = [[cx, cy]]
        let size = 150
        let t = 0
        next.current = () => {
            setShake(true)
            timeout = setTimeout(() => {
                ctx.clearRect(0, 0, 400, 400)
                const new_centers: Vector[] = []

                const i = t % 4

                if (i === 1) {
                    size = size / 2
                }

                for (const [cx, cy] of centers) {
                    if (i === 0) {
                        drawBox(cx, cy, size)
                    }
                    else if (i === 1) {
                        // down
                        drawBox(cx, cy + size, size, C | B)

                        // right top
                        drawBox(cx + size * SQRT_3_2, cy - size / 2, size, C | TR | R | BL)

                        // left top
                        drawBox(cx - size * SQRT_3_2, cy - size / 2, size, C | TL | L | BR | R)
                        drawBox(cx + size * SQRT_3_2, cy + size / 2, size, BR | R)
                        drawBox(cx - size * SQRT_3_2, cy + size / 2, size, BL | L)
                        drawBox(cx, cy - size, size, T)
                    }
                    else if (i === 2) {
                        // down
                        drawBox(cx, cy + size, size, C | B)
                        // right top
                        drawBox(cx + size * SQRT_3_2, cy - size / 2, size, C | TR | R | BL)
                        drawBox(cx + size * SQRT_3_2, cy + size / 2, size, BR | R)
                        drawBox(cx - size * SQRT_3_2, cy + size / 2, size, BL | CL | TL | L)
                        drawBox(cx, cy - size, size, T | L | BL | CL)
                    }
                    else if (i === 3) {
                        drawBox(cx, cy + size, size, C | B)
                        drawBox(cx + size * SQRT_3_2, cy + size / 2, size, BR | CR | TR | R)
                        drawBox(cx - size * SQRT_3_2, cy + size / 2, size, BL | CL | TL | L)
                        drawBox(cx, cy - size, size)

                        new_centers.push(
                            [cx + size * SQRT_3_2, cy + size / 2],
                            [cx - size * SQRT_3_2, cy + size / 2],
                            [cx, cy - size],
                        )
                    }
                }

                if (new_centers.length) {
                    centers = new_centers
                }

                t += 1

                if (t >= 10) {
                    reset()
                }
            }, 100)
            shakeTimeout = setTimeout(() => {
                setShake(false)
            }, 200)
        }

        const reset = () => {
            t = 0
            size = 150
            centers = [[cx, cy]]
        }

        next.current()

        return () => {
            clearTimeout(timeout)
            clearTimeout(shakeTimeout)
        }
    }, [])

    return (
        <>
            <Paper >
                <div className="box centered">
                    <canvas className={shakeClass} ref={el} width={400} height={400} onClick={() => next.current()}></canvas>
                </div>
            </Paper>
            <Note>
                <p>click</p>
            </Note>
        </>
    )
}