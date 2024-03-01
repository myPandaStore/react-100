/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-03-01 20:11:42
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-03-01 21:08:42
 * @FilePath: \react-100\src\app\028\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import { useEffect, useRef } from "react"
import initCanvas from "../utils/initCanvas"
import useRafFn from "../Hooks/useRafFn"
import type { Vector } from "../utils/vector"
import { range, random, timestamp } from "../utils"
import { distance } from "../utils"
import { useMouse } from 'ahooks';
import Paper from "../components/paper"
import Note from "../components/note"

export default function Cast() {
    // https://ncase.me/sight-and-light/
    const el = useRef<HTMLCanvasElement | null>(null)
    const start = useRef<() => void>(() => { })
    const reset = useRef<() => void>(() => { })
    const { elementX: ex, elementY: ey } = useMouse(el.current);
    const lines = useRef<Vector[][]>([])
    const points = useRef<Vector[]>([])

    useEffect(() => {
        reset.current = () => {
            lines.current = [
                [[-1, -1], [-1, 401], [401, 401], [401, -1]],
                ...range(20).map((i): Vector[] => [[random(400), random(400)], [random(400), random(400)]]),
            ]
            points.current = lines.current.flatMap(i => i)
        }
        reset.current()
    }, [])

    useEffect(() => {
        const canvas = el.current!
        const { ctx } = initCanvas(canvas)

        function line(a: Vector, b: Vector) {
            ctx.beginPath()
            ctx.moveTo(...a)
            ctx.lineTo(...b)
            ctx.stroke()
        }

        function seg_insertion(from1: Vector, to1: Vector, from2: Vector, to2: Vector): Vector | undefined {
            const dX: number = to1[0] - from1[0]
            const dY: number = to1[1] - from1[1]

            const determinant: number = dX * (to2[1] - from2[1]) - (to2[0] - from2[0]) * dY
            if (determinant === 0)
                return undefined // parallel lines

            const lambda: number = ((to2[1] - from2[1]) * (to2[0] - from1[0]) + (from2[0] - to2[0]) * (to2[1] - from1[1])) / determinant
            const gamma: number = ((from1[1] - to1[1]) * (to2[0] - from1[0]) + dX * (to2[1] - from1[1])) / determinant

            // check if there is an intersection
            if (!(lambda >= 0 && lambda <= 1) || !(gamma >= 0 && gamma <= 1)) return undefined

            return [
                from1[0] + lambda * dX,
                from1[1] + lambda * dY,
            ]
        }

        function get_insertion(c: Vector, to: Vector) {
            let far = to
            let d = distance(c, to)
            lines.current.forEach((l) => {
                const insert = seg_insertion(c, to, l[0], l[1])
                if (!insert)
                    return
                const id = distance(c, insert)
                if (id < d) {
                    far = insert
                    d = id
                }
            })

            return far
        }

        let pts = timestamp()
        start.current = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            const ts = timestamp()
            const dt = ts - pts
            pts = ts

            ctx.strokeStyle = "black"
            lines.current.forEach((points: Vector[]) => {
                ctx.beginPath()
                ctx.moveTo(...points[points.length - 1])
                points.forEach((point) => ctx.lineTo(...point))
                ctx.stroke()
            })

            const c: Vector = [ex, ey]
            ctx.strokeStyle = "red"
            points.current.forEach((point, i) => {
                const insert = get_insertion(c, point)
                line(c, insert)
            }
            )
        }
    }, [ex, ey])

    useRafFn(start.current, true, { immediate: true })

    return (
        <>
            <Paper>
                <div className="box centered">
                    <canvas ref={el} width={400} height={400} onClick={() => reset.current()}></canvas>
                </div>
            </Paper>
            <Note>
                <a href="https://ncase.me/sight-and-light/">https://ncase.me/sight-and-light/</a>
            </Note>
        </>
    )
}