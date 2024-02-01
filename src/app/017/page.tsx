/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-01-29 16:17:41
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-02-01 12:24:10
 * @FilePath: \react-100\src\app\017\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import { useRef, useEffect, useMemo, useState } from "react"
import initCanvas from "../utils/initCanvas"
import useRafFn from "../Hooks/useRafFn"
import { polar2cart, r90, r180, r15 } from "../utils/vector"
import Paper from "../components/paper"
import Note from "../components/note"

const { random } = Math
export default function Plum() {
    const el = useRef<HTMLCanvasElement | null>(null)
    const frame = useRef(() => { })
    const start = useRef(() => { })
    const [len, setLen] = useState(5)
    const [init, setInit] = useState(5)


    const { pause, resume } = useRafFn(frame.current, true, { immediate: true })

    useEffect(() => {
        const canvas = el.current!
        const { ctx } = initCanvas(canvas)
        const { width, height } = canvas

        let steps: Function[] = []
        let preSteps: Function[] = []

        let iterations = 0

        function step(x: number, y: number, rad: number) {
            const length = random() * len

            const [nx, ny] = polar2cart(x, y, length, rad)

            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(nx, ny)
            ctx.stroke()

            const rad1 = rad + random() * r15
            const rad2 = rad - random() * r15

            if (nx < -100 || nx > 500 || ny < -100 || ny > 500)
                return

            if (iterations <= init || random() > 0.5)
                steps.push(() => step(nx, ny, rad1))
            if (iterations <= init || random() > 0.5)
                steps.push(() => step(nx, ny, rad2))
        }

        frame.current = () => {
            iterations++
            preSteps = steps
            steps = []

            if (!preSteps.length) {
                pause()
            }

            preSteps.forEach(step => step())
        }
        start.current = () => {
            pause()
            iterations = 0
            ctx.clearRect(0, 0, width, height)
            ctx.lineWidth = 1
            ctx.strokeStyle = '#00000040'
            preSteps = []
            steps = random() < 0.5
                ? [
                    () => step(0, random() * 400, 0),
                    () => step(400, random() * 400, r180),
                ]
                : [
                    () => step(random() * 400, 0, r90),
                    () => step(random() * 400, 400, -r90),
                ]
            resume()
        }
        start.current()
        return () => {
            pause()
        }
    }, [len, pause, resume, init])


    function handleInit() {
        setInit(init % 8 + 1)
    }

    function handleLen() {
        setLen(len % 8 + 1)
    }

    // const { run: handleStart } = useThrottleFn(() => {
    //     start.current()
    // }, 500)
    function handleStart() {
        start.current()
    }

    return (
        <>
            <Paper>
                <div className="box centered" onClick={() => handleStart()}>
                    <canvas ref={el} width={400} height={400}></canvas>
                    <div>
                        init
                        <div className="ml-3 cursor-pointer" onClick={() => handleInit()} >{init}</div>
                    </div>
                    <div>
                        len
                        <div className="ml-3 cursor-pointer" onClick={() => handleLen()} >{len}</div>
                    </div>
                </div>
            </Paper>
            <Note>
                <>
                    <p>for each node, there is 50% chance for growing a new branch for its two branches.</p>
                    <br />
                    <p><b>init</b> - the initial iterations that guaranteed having 100% to grow.</p>
                    <p><b>len</b> - max length for each branch.</p>
                </>
            </Note>
        </>
    )
}