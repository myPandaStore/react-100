/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-01-17 15:31:29
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-01-28 10:18:30
 * @FilePath: \react-100\src\app\012\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import { useEffect, useRef, useState } from "react"
import initCanvas from "../utils/initCanvas"
import useRafFn from "../Hooks/useRafFn"
import { SQRT_3, Vector, r90, r30, pick, r60 } from '../utils/vector'
import { range, shuffle } from '../utils'
import Turn from "../components/turn"
import Paper from "../components/paper"
import Note from "../components/note"
import { timestamp } from "../utils"

export default function App() {
    const turnRef = useRef(null)
    const el = useRef<HTMLCanvasElement | null>(null)
    const speeds = ['x0.5', 'x1', 'x2']
    const [speedLevel, setSpeedLevel] = useState('x1')
    const frame = useRef(() => { })
    const [wireFrame, setWireFrame] = useState(true)
    const [colors, setColors] = useState(['#6A8372', '#ffe7b3'])

    useEffect(() => {
        const colorPresets = [
            ['#444444', '#ffffff'],
            ['#6A8372', '#ffe7b3'],
            ['#B54434', '#E3916E'],
            ['#1E88A8', '#eefefd'],
        ]
        setColors(shuffle(pick(colorPresets)))
    }, [wireFrame])

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

        function draw(vec: Vector[]) {
            ctx.beginPath()
            ctx.moveTo(...vec[0])
            vec.slice(1).forEach(v => ctx.lineTo(...v))
            ctx.lineTo(...vec[0])

            if (wireFrame) {
                ctx.stroke()
            } else {
                ctx.fill()
            }
        }

        function move(vec: Vector[], dx = 0, dy = 0): Vector[] {
            return vec.map(([x, y]) => [x + dx, y + dy])
        }

        function rotate(vec: Vector[], rad = 0): Vector[] {
            const sin = Math.sin(rad)
            const cos = Math.cos(rad)
            return vec.map(([x, y]) => [x * cos - y * sin, x * sin + y * cos])
        }

        // diamond
        const diamond: Vector[] = [
            [-hs, 0],
            [0, -r3s],
            [hs, 0],
            [0, r3s]
        ]
        function drawDiamonds(h: Vector[], v: Vector[]) {
            for (const x of range(amount)) {
                for (const y of range(amount)) {
                    draw(
                        move(
                            (x + y) % 2 ? h : v,
                            x * d + offset,
                            y * d + offset
                        )
                    )
                }
            }
        }

        // square
        const square: Vector[] = [
            [-hs, -hs],
            [-hs, hs],
            [hs, hs],
            [hs, -hs],
        ]
        function drawSquares(h: Vector[], v: Vector[]) {
            for (const x of range(amount)) {
                for (const y of range(amount)) {
                    draw(
                        move(
                            (x + y) % 2 ? h : v,
                            (x - 0.5) * d + offset,
                            (y - 0.5) * d + offset
                        )
                    )
                }
            }
        }


        // draw in every frame 
        const ts = timestamp() + 1000
        // console.log(speedLevel)
        frame.current = () => {
            // console.log(speedLevel)
            ctx.clearRect(0, 0, width, height)

            ctx.strokeStyle = 'black'
            ctx.lineWidth = 1

            let h: Vector[] = []
            let v: Vector[] = []
            const t = Math.max(timestamp() - ts, 0)
            const duration = speedLevel === 'x0.5'
                ? 2400
                : speedLevel === 'x1'
                    ? 1200
                    : 600
            let r = t / duration * r90
            const turn = Math.trunc(t / duration) % 2
            const cycle = Math.trunc(t / duration) % 4

            if (turn) {
                // draw diamond
                if (!wireFrame) {
                    ctx.rect(0, 0, width, height)
                    ctx.fillStyle = colors[1]
                    ctx.fill()
                    ctx.fillStyle = colors[0]
                }
                if (cycle === 1) {
                    r += 90
                }
                h = rotate(diamond, r)
                v = rotate(diamond, r + r90)
                drawDiamonds(h, v)

            } else {
                // draw squares
                if (!wireFrame) {
                    ctx.rect(0, 0, width, height)
                    ctx.fillStyle = colors[0]
                    ctx.fill()
                    ctx.fillStyle = colors[1]
                }
                if (cycle === 2) {
                    h = rotate(square, r + r60)
                    v = rotate(square, r - r60)
                } else {
                    h = rotate(square, r + r30)
                    v = rotate(square, r - r30)
                }
                drawSquares(h, v)
            }
        }
        // function stop() {
        //     ctx.clearRect(0, 0, width, height)
        //     // canvas.remove()
        // }
        // return () => {
        //     stop()
        // }
    }, [speedLevel, colors, wireFrame])

    const { pause, resume } = useRafFn(frame.current)

    function handleTurnClick() {
        const next = (speeds.indexOf(speedLevel) + 1) % speeds.length
        setSpeedLevel(speeds[next])
    }

    const canvasClass = el.current === null ? '' : 'border border-black'

    // TODO:square and diamond 切换有点卡顿

    //TODO: turn or useRafFn 
    // 第一次click不触发 useRafFn里面的speedLevesl
    // console.log(turnRef?.current?.reset)
    // if (turnRef.current) {
    //     console.log(turnRef.current['reset'])
    // }
    return (
        <>
            <Paper >
                <div className="centered">
                    <canvas ref={el} className={canvasClass}>
                    </canvas>
                    <button onClick={() => {
                        setWireFrame(!wireFrame)
                        setSpeedLevel(speeds[0])
                        // @ts-ignore
                        turnRef.current!.reset()
                    }
                    }
                    >wireFrame</button>
                    <Turn
                        ref={turnRef}
                        options={speeds}
                        opt={speedLevel}
                        onTurn={handleTurnClick} />
                </div>
            </Paper>
            <Note>
                <div>
                    <button onClick={pause} className="mr-2">pause</button>
                    <button onClick={resume}>resume</button>
                    <p>draw diamond & square in every frame</p>
                </div>
            </Note>
        </>
    )
}