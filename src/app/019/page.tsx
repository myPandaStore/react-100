/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-01-31 08:38:45
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-01-31 10:08:29
 * @FilePath: \react-100\src\app\019\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import { useEffect, useRef, useState } from "react"
import useRafFn from "../Hooks/useRafFn"
import initCanvas from "../utils/initCanvas"
import { Vector } from "../utils/vector"
import { range, random, inbound, colorInterpration, hexToRgb } from "../utils"
// @ts-ignore
import { sampleSize } from 'lodash-es'
import Paper from "../components/paper"
import Note from "../components/note"

const { trunc } = Math

export default function RustApp() {
    const el = useRef<HTMLCanvasElement | null>(null)
    const frame = useRef(() => {
    })
    const start = useRef(() => { })
    const [color, setColor] = useState<string>('#000000')

    //TODO: uncessary useEffect for trigger re-render so that useRafn fn can be set exactly.
    useEffect(() => {
        setColor('red')
    }, [])

    const { resume, pause } = useRafFn(frame.current)

    const [tick, setTick] = useState(0)
    const maxTicks = 5000
    const iterations = 3

    const pattele = [
        '#ffffff',
        '#f7ebbe',
        '#F2D399',
        '#F2AC57',
        '#F27F3D',
        '#8C4130',
        '#592A2A',
    ].map(hexToRgb)

    useEffect(() => {
        const canvas = el.current!
        const width = 400
        const height = 400
        const { ctx } = initCanvas(canvas, width, height, 1)
        const data = ctx.createImageData(width, height)

        let rustness = range(width).map(i => new Array(height).fill(0))

        function clear() {
            rustness = rustness.map(col => col.map(i => 0))
            updateCanvas()
        }

        function randomVectors(n = 5): Vector[] {
            return range(n).map(i => [trunc(random(400)), trunc(random(400))])
        }

        function updateCanvas() {
            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    const rust = rustness[x][y]
                    const [r, g, b] = colorInterpration(pattele, rust)

                    const pixellindex = (y * width + x) * 4
                    data.data[pixellindex] = r
                    data.data[pixellindex + 1] = g
                    data.data[pixellindex + 2] = b
                    data.data[pixellindex + 3] = 255
                }
            }

            ctx.putImageData(data, 0, 0)
        }

        class Stain {
            constructor(
                public activePoints: Vector[],
                public iterations = 5
            ) { }

            next() {
                if (!this.iterations) {
                    return
                }
                this.iterations -= 1

                const newPoints: Vector[] = []

                this.activePoints.forEach((point) => {
                    const [x, y] = point

                    rustness[x][y] += random(0.1, 0)

                    const points: Vector[] = [
                        [x, y],
                        [x, y + 1],
                        [x + 1, y],
                        [x, y - 1],
                        [x - 1, y],
                        [x + 1, y + 1],
                        [x + 1, y - 1],
                        [x - 1, y + 1],
                        [x - 1, y - 1],
                    ]

                    newPoints.push(
                        ...points
                            .filter(v => !newPoints.some(n => n[0] === v[0] && n[1] === v[1]))
                            .filter(v => inbound(v))
                            .filter(([x, y]) => {
                                if (rustness[x][y] === 0)
                                    return true
                                if (rustness[x][y] >= 1)
                                    return false
                                if (rustness[x][y] > 0.8)
                                    return random() > 0.5
                                else
                                    return random() > 0.2
                            },
                            ),
                    )

                    this.activePoints = sampleSize(newPoints, 200)
                }
                )
            }
        }

        let stains: Stain[] = []

        frame.current = () => {
            setTick(tick + 1)
            for (let i = 0; i < iterations; i++) {
                stains.forEach((stain) => {
                    stain.next()
                    stain.next()
                    stain.next()
                    stain.next()
                })
            }

            updateCanvas()

            if (tick >= maxTicks) {
                pause()
            }
        }

        start.current = () => {
            setTick(0)
            pause()
            clear()
            stains = [
                new Stain([
                    [0, trunc(random(400))],
                    [trunc(random(400)), 0],
                    [399, trunc(random(400))],
                    [trunc(random(400)), 399],
                ], maxTicks * iterations),
                new Stain(randomVectors(40), maxTicks * iterations / 2),
                new Stain(randomVectors(3), maxTicks * iterations / 1.5),
            ]
            resume()
        }

        start.current()

        return () => {
            pause()
        }
    }, [pattele, pause, resume, tick])

    return (
        <>
            <Paper>
                <div className="box centered" onClick={() => {
                    start.current()
                }
                }>
                    <canvas ref={el} width={400} height={400}></canvas>
                </div>
            </Paper>
            <Note></Note>
        </>
    )
}
