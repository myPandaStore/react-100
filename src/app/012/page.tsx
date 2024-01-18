/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-01-17 15:31:29
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-01-18 20:26:10
 * @FilePath: \react-100\src\app\012\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import { useEffect, useRef, useState } from "react"
import initCanvas from "../utils/initCanvas"
import useRafFn from "../Hooks/useRafFn"
import { SQRT_3, Vector, r90 } from '../utils/vector'

export default function App() {
    const el = useRef<HTMLCanvasElement | null>(null)
    const [count, setCount] = useState(0)
    const [speed, setSpeed] = useState(1200)
    const speedLevel = useRef('x1')

    // const { pause, resume, active } = useRafFn(() => {
    //     setCount(count => count + 1)
    //     console.log(count)
    //     console.log(active())
    // })

    // todo setSpeed
    useEffect(() => {
        if (speedLevel.current === 'x0.5') {
            setSpeed(2400)
        }
        else if (speedLevel.current === 'x2') {
            setSpeed(600)
        }
    }, [])

    useEffect(() => {
        const canvas = el.current!
        const { ctx, dpi, remove } = initCanvas(canvas, 500, 500)
        const { width, height } = canvas

        // init variable
        const s = 35
        const hs = s / 2
        const r3s = s * SQRT_3 / 2
        const d = s / 2 + r3s
        const amount = Math.ceil(width / d) + 1
        const offset = -hs

        // draw function
        function draw(vec: Vector[]) {
            ctx.beginPath()
            ctx.moveTo(...vec[0])
            vec.slice(1).forEach(v => ctx.lineTo(...v))

            ctx.stroke()
            // ctx.fill()
        }

        // generate vectors

        // function move(vec, dx, dy) {

        // }
        function move(vec: Vector[], dx: number, dy: number): Vector[] {
            return vec.map(([x, y]) => [x + dx, y + dy])
        }

        function rotate(vec: Vector[], rad = 0): Vector[] {
            const sin = Math.sin(rad)
            const cos = Math.cos(rad)
            return vec.map(([x, y]) => [x * cos - y * sin, x * sin + y * cos])
        }

        // timestamp
        const timestamp = () => +Date.now();



        // draw in every frame 
        const frame = () => {
            // init canvas in every frame
            // ctx.clearRect(0, 0, width, height)
            ctx.strokeStyle = 'black'
            ctx.lineWidth = 2

            // draw diamond

            // generate one for test
            const testVector: Vector[] = [[0, 0], [60, 60], [60, 120], [0, 60], [0, 0]]

            let h: Vector[] = []
            let v: Vector[] = []

            // rotate
            const ts = timestamp() + 1000
            const t = Math.max(timestamp() - ts, 0)
            const duration = speed
            let r = t / duration * r90
            h = rotate(testVector, 120)
            console.log(h, testVector)

            for (const x of [1, ]) {
                for (const y of [1,]) {
                    draw(move(h, x * d + offset, y * d + offset))
                }
            }

            // draw squares

        }
        frame()
        // return () => {
        //     remove()
        // }
    }, [])

    return (
        <div className="centered">

            <canvas ref={el} >
            </canvas>
            {/* <button onClick={pause}>pause</button>
            <button onClick={resume}>resume</button>
            <p>{active()}</p> */}
        </div>
    )
}