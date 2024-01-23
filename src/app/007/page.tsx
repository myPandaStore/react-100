/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-01-05 08:33:26
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-01-23 09:51:38
 * @FilePath: \react-100\src\app\007\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import { useRef, useEffect } from "react"
import { useMount } from "ahooks"
import { load } from "../utils/load"
import initCanvas from '../utils/initCanvas'
import Note from "../components/note"
import Paper from "../components/paper"
import { range, } from "../utils"
import { shuffle, hexToRgb } from "../utils"
import { pick } from "../utils/vector"


export default function Polar() {
    const el = useRef<HTMLCanvasElement | null>(null)
    const runner = useRef<HTMLIFrameElement | null>(null)


    // TODO: stats
    // await load('https://cdn.jsdelivr.net/npm/stats.js@0.17.0/build/stats.min.js')
    // // @ts-expect-error
    // const stats = new window.Stats()

    useEffect(() => {
        // init canvas
        const canvas = el.current!
        const width = 400
        const height = 400
        const { ctx } = initCanvas(canvas, width, height, 1)

        // color
        const colors = shuffle([
            '#30896C',
            '#3A8FB7',
            '#58B2DC',
            '#9B90C2',
            '#A8D8B9',
            '#BEC23F',
            '#D05A6E',
            '#D75455',
            '#F05E1C',
            '#F19483',
            '#F6C555',
        ]).map(i => hexToRgb(i))
        let colorA = [0, 0, 0]
        let colorB = [0, 0, 0]
        function recolor() {
            colorA = pick(colors)
            colorB = pick(colors, colorA)
        }
        recolor()

        let fn = (t: number, r: number, th: number) => 0
        // const fn = (t: number, r: number, th: number) => {
        //     return `cos(${t}%25${th})/1-tan(r-random()*.091)+`
        // }

        // draw every pixel
        const w2 = width / 2
        const h2 = height / 2

        function drawPixel(data: ImageData, x: number, y: number, r: number, g: number, b: number): void {
            const pixelIndex = (y * width + x) * 4
            data.data[pixelIndex] = r
            data.data[pixelIndex + 1] = g
            data.data[pixelIndex + 2] = b
            data.data[pixelIndex + 3] = 255
            // debugger
        }

        function pixel(data: any, x: number, y: number) {
            const rx = (x - w2) / w2
            const ry = (y - h2) / h2
            const radius = Math.sqrt(rx ** 2 + ry ** 2)
            const th = Math.atan2(ry, rx)

            return (t: number) => {
                // const raw = fn(t, radius, th)
                const raw = 100
                const value = +raw
                const it = isNaN(value) ? 0 : value
                const [r, g, b] = it < 0 ? colorA : colorB
                // debugger
                // console.log(r, g, b,)
                const abs = Math.abs(it)
                drawPixel(data, x, y, r * abs, g * abs, b * abs)
            }
        }


        const data = ctx.createImageData(width, height)
        const pxh = range(height)
        const pxw = range(width)
        const pixels: any[] = pxw.flatMap(x => pxh.map(y => pixel(data, x, y)))
        // console.log(pixels, 'pixels')
        const frame = (t: number) => {
            pixels.forEach(p => p(t))
            ctx.putImageData(data, 0, 0)
        }

        let ts = 0
        frame((+new Date() - ts) / 1000)
        const MathContext = `const {${Object.getOwnPropertyNames(Math).join(',')}}=Math`

        // eslint-disable-next-line no-eval


        // TODO:useWatch
        // fn = runner.current!.contentWindow!.eval(`()=>{
        //     ${MathContext};
        //     return (t,r,th) => {
        //     return ${exp.replace(/(\d+)(\w+)/g, (_, n, x) => `${n} * ${x}`)}
        //     }
        //   }`)()
    }, [])
    const canvasClass = el.current === null ? 'centered' : 'centered border border-black'


    return (
        <>
            <Paper>
                <div>
                    <canvas className={canvasClass} ref={el}></canvas>
                    <div className="box-description">
                        <p>author</p>
                        <iframe ref={runner} />
                    </div>
                </div>
            </Paper>
            <Note>
                <p>polar test</p>
            </Note>
        </>
    )
}