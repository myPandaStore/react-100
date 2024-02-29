/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-02-29 20:41:57
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-02-29 21:30:35
 * @FilePath: \react-100\src\app\027\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import { useEffect, useRef } from "react"
import initCanvas from "../utils/initCanvas"
import useRafFn from "../Hooks/useRafFn"
import { timestamp, range, ColorVector } from "../utils"
import { Vector, r360, r180 } from "../utils/vector"
import { random } from "../utils"
import Paper from "../components/paper"
import Note from "../components/note"

const { round } = Math
export default function Knitting() {
    const el = useRef<HTMLCanvasElement | null>(null)
    const start = useRef<() => void>(() => { })
    const reset = useRef<() => void>(() => { })

    useEffect(() => {
        const { ctx } = initCanvas(el.current!)
        let pts = timestamp()
        let lines: Line[] = []

        class Line {
            tail: Vector
            isActive: boolean
            length: number
            ignored: Line[]

            constructor(public head: Vector, public rad: number, public color: ColorVector, public speed = 5) {
                this.tail = head
                this.isActive = true
                this.length = 0
                this.ignored = []
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.beginPath()
                ctx.lineWidth = 1
                ctx.strokeStyle = `rgb(${this.color.join(",")})`
                ctx.moveTo(...this.head)
                ctx.lineTo(...this.tail)
                ctx.stroke()
            }

            grow(t: number, lines: Line[]) {
                if (!this.isActive) {
                    return
                }
                this.length += this.speed * t
                const x = this.head[0] + Math.cos(this.rad) * this.length
                const y = this.head[1] + Math.sin(this.rad) * this.length
                this.tail = [x, y]

                if (x < 0 || x > 400) {
                    this.isActive = false
                    const n = new Line(this.tail, r180 - this.rad, this.color, this.speed)
                    n.ignored.push(this)
                    lines.push(n)
                } else if (y < 0 || y > 400) {
                    this.isActive = false
                    const n = new Line(this.tail, - this.rad, this.color, this.speed)
                    n.ignored.push(this)
                    lines.push(n)
                } else {
                    this.check_insertions(lines)
                }
            }

            has_insertion(line: Line): Vector | undefined {
                const from1 = this.head
                const to1 = this.tail
                const from2 = line.head
                const to2 = line.tail

                const dX: number = to1[0] - from1[0]
                const dY: number = to1[1] - from1[1]
                const determinant: number = dX * (to2[1] - from2[1]) - (to2[0] - from2[0]) * dY
                if (determinant === 0) {
                    return undefined // parallel lines
                }

                const lambda: number = ((to2[1] - from2[1]) * (to2[0] - from1[0]) + (from2[0] - to2[0]) * (to2[1] - from1[1])) / determinant
                const gamma: number = ((from1[1] - to1[1]) * (to2[0] - from1[0]) + dX * (to2[1] - from1[1])) / determinant
                // check if there is an intersection
                if (!(lambda >= 0 && lambda <= 1) || !(gamma >= 0 && gamma <= 1)) return undefined

                return [
                    from1[0] + lambda * dX,
                    from1[1] + lambda * dY,
                ]

            }
            check_insertions(lines: Line[]) {
                for (const line of lines) {
                    if (line === this || this.ignored.includes(line)) {
                        continue
                    }
                    const insert = this.has_insertion(line)
                    if (insert) {
                        this.tail = insert
                        this.isActive = false

                        const reflex = new Line(
                            insert,
                            -(-r180 + (line.rad - this.rad) + line.rad),
                            mergeColor(this.color, line.color),
                            (this.speed + line.speed) / 2,
                        )
                        reflex.ignored.push(this)
                        reflex.ignored.push(line)

                        line.ignored.push(this)
                        line.ignored.push(reflex)

                        lines.push(reflex)
                        return
                    }
                }
            }
        }
        const mergeColor = ([a, b, c]: ColorVector, [a2, b2, c2]: ColorVector): ColorVector => {
            return [
                (a + a2) / 2,
                (b + b2) / 2,
                (c + c2) / 2,
            ]
        }

        const randomLine = () => {
            return new Line(
                [random(400), random(400)],
                random() * r360,
                [round(random(256)), round(random(256)), round(random(256))],
                random(10, 3)
            )
        }
        reset.current = () => {
            lines = range(60).map(randomLine)

        }
        reset.current()

        start.current = () => {
            ctx.clearRect(0, 0, 400, 400)
            const ts = timestamp()
            const dt = ts - pts
            pts = ts

            lines.forEach((l) => {
                l.grow(dt / 1000, lines)
                l.draw(ctx)
            })
        }
    }, [])

    useRafFn(start.current, true, { immediate: true })

    return (
        <>
            <Paper>

                <div className="box centered">
                    <canvas ref={el} width={400} height={400} onClick={() => reset.current()}></canvas>
                </div>
            </Paper>
            <Note></Note>
        </>
    )
}