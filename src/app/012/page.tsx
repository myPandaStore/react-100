/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-01-17 15:31:29
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-01-17 17:25:14
 * @FilePath: \react-100\src\app\012\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import { useEffect, useRef, useState } from "react"
import initCanvas from "../utils/initCanvas"
import useRafFn from "../Hooks/useRafFn"

export default function App() {
    const el = useRef<HTMLCanvasElement | null>(null)
    const [count, setCount] = useState(0)

    const [pause, resume, active] = useRafFn(() => {
        setCount(count => count + 1)
        console.log(count)
    })

    useEffect(() => {
        const canvas = el.current!
        const { ctx, dpi, remove } = initCanvas(canvas, 500, 500)

        return () => {
            remove()
        }
    }, [])

    return (
        <div>

            <canvas ref={el}>
            </canvas>
            <button onClick={pause}>pause</button>
            <button onClick={resume}>resume</button>
            <p>{active()}</p>
        </div>
    )
}