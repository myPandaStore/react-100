/*
 * @Author: luckin yipeng.zhang@kunlun-inc.com
 * @Date: 2024-06-11 14:56:03
 * @LastEditors: luckin yipeng.zhang@kunlun-inc.com
 * @LastEditTime: 2024-06-11 17:26:32
 * @FilePath: /react-100/src/app/033/page.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import { useRef, useEffect, useState } from "react"
import initCanvas from '../utils/initCanvas'
import useRafFn from "../Hooks/useRafFn"
import Paper from '../components/paper'

export default function Page() {
    const el = useRef(null)
    const draw = useRef(() => { })
    const clear = useRef(() => { })
    const [a, setA] = useState(0)
    const [b, setB] = useState(0)
    const [c, setC] = useState(0)
    const [d, setD] = useState(0)

    useEffect(() => {
        const canvas = el.current!
        const { ctx } = initCanvas(canvas)
        const size = 400
        const fill = 0.15

        let x = 0
        let y = 0
        let t = 0
        x = y = 0
        draw.current = () => {
            t += 1
            if (t > 30) {
                return
            }
            const _a = a
            const _b = b
            const _c = c
            const _d = d
            const s = size / 5
            const center = size / 2
            for (let j = 50; j--;) {
                for (let i = 1e3; i--;) {
                    ctx.fillRect(x * s + center, y * s + center, fill, fill)
                    const xn = Math.sin(_a * y) - Math.cos(_b * x)
                    const yn = Math.sin(_c * x) - Math.cos(_d * y)
                    x = xn
                    y = yn
                }
            }
        }

        clear.current = () => {
            x = y = t = 0
            ctx.clearRect(0, 0, size, size)
        }
    }, [a, b, c, d])

    useRafFn(draw.current, true, { immediate: true })

    function roll(i: number) {
        switch (i) {
            case 0:
                setA((Math.random() * 10 - 5))
                break;
            case 1:
                setB((Math.random() * 10 - 5))
                break;
            case 2:
                setC((Math.random() * 10 - 5))
                break;
            case 3:
                setD((Math.random() * 10 - 5))
                break;
            default:
                throw new Error('Unexpected value')
        }

        clear.current()
    }

    function shuffle() {
        setA((Math.random() * 10 - 5))
        setB((Math.random() * 10 - 5))
        setC((Math.random() * 10 - 5))
        setD((Math.random() * 10 - 5))
        clear.current()
    }
    return (
        <Paper>
            <div className="centered">
                <canvas style={{ border: '1px solid black' }} width="400" height="400" ref={el} onClick={() => shuffle()}></canvas>
                <div style={{ color: 'black' }} className="flex justify-between content-center" >
                    <div onClick={() => { roll(0) }}> a {Number(a) < 0 ? '' : '+'}{Number(a).toFixed(2)}</div>
                    <div onClick={() => { roll(1) }}> b {Number(b) < 0 ? '' : '+'}{Number(b).toFixed(2)}</div>
                    <div onClick={() => { roll(2) }}> c {Number(c) < 0 ? '' : '+'}{Number(c).toFixed(2)}</div>
                    <div onClick={() => { roll(3) }}> d {Number(d) < 0 ? '' : '+'}{Number(d).toFixed(2)}</div>
                </div>
            </div>
        </Paper>

    )
}