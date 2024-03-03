/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-03-03 10:48:26
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-03-03 16:03:59
 * @FilePath: \react-100\src\app\029\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import { useEffect, useRef, useState } from "react"
import initCanvas from "../utils/initCanvas"
import type { Vector } from "../utils/vector"
import useRafFn from "../Hooks/useRafFn"
import { timestamp, range, distance } from "../utils"
import { hslToRgb } from "../utils/color"
import { useMouse } from 'ahooks';
import { r360 } from "../utils/vector"
import Note from "../components/note"
import Paper from "../components/paper"

const { tan, PI, round, atan2, cos, sin } = Math

export default function Kaleidoscope() {
    const el = useRef<HTMLCanvasElement | null>(null)
    const reset = useRef<() => void>(() => { })
    const start = useRef<() => void>(() => { })
    const next = useRef<() => void>(() => { })
    const [edges, setEdges] = useState(8)
    const [hue, setHue] = useState(0)
    const { elementX: ex, elementY: ey } = useMouse(el.current);

    const points = useRef<Vector[]>([])
    const lines = useRef<[Vector, Vector, string][]>([])
    useEffect(() => {
        reset.current = () => {
            // reset line & points
            points.current = range(edges).map(i => [200, 200])
            lines.current = []
        }
        reset.current()
    }, [edges])

    useEffect(() => {
        const canvas = el.current!
        const { ctx } = initCanvas(canvas)

        function getColor() {
            return `rgb(${hslToRgb(hue, 0.7, 0.5).join(',')})`
        }

        function line(a: Vector, b: Vector) {
            ctx.beginPath()
            ctx.moveTo(...a)
            ctx.lineTo(...b)
            ctx.stroke()
        }

        function getLines() {
            const c: Vector = [ex, ey]
            const p = points.current[0]
            const rad = atan2(c[1] - p[1], c[0] - p[0])
            const len = distance(c, p)
            const d = r360 / edges

            return points.current.map((p, i): [Vector, Vector] => {
                const np: Vector = [
                    p[0] + cos(rad + d * i) * len,
                    p[1] + sin(rad + d * i) * len,
                ]
                return [np, p]
            })
        }

        let pts = timestamp()
        start.current = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            const ts = timestamp()
            const dt = ts - pts
            pts = ts

            // draw next lines
            lines.current.forEach(([p1, p2, c]) => {
                ctx.strokeStyle = c
                line(p1, p2)
            })

            // init lines
            getLines().map(p => line(...p))
        }

        next.current = () => {
            const l = getLines()
            const c = getColor()
            lines.current.push(...l.map(([a, b]) => [a, b, c] as [Vector, Vector, string]))
            points.current = l.map(i => i[0])
            setHue((hue + 0.05) % 1)
        }


    }, [edges, ex, ey, hue])

    useRafFn(start.current, true, { immediate: true })

    return (
        <>
            <Paper>
                <div className="box centered">
                    <canvas ref={el} width={400} height={400} onClick={() => next.current()}></canvas>
                    <div className="link cursor-pointer" onClick={()=>setEdges(edges+1)}>
                        edges: {edges}
                    </div>
                    <div className="link cursor-pointer" onClick={() => reset.current()}>reset</div>
                </div>
            </Paper>
            <Note>
            </Note>
        </>
    )
}
