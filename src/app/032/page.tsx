/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-04-07 15:18:19
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-04-07 15:54:43
 * @FilePath: \react-100\src\app\032\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import { p5i } from 'p5i'
import type { P5I } from 'p5i'
import { useEffect, useRef } from 'react'
import { SQRT_2 } from '../utils/vector'
import Paper from '../components/paper'
import Note from '../components/note'

const { trunc } = Math
// TODO:自己重新发一个包解决需要手动fix p5i.js 在react环境中下面的问题
// 处理 node_modules\p5\lib\p5.min.js (2:428474) @ window
//  ReferenceError: window is not defined
let myCreateCanvas: P5I['createCanvas'],
    myBackground: P5I['background'],
    myRect: P5I['rect'],
    myEllipse: P5I['ellipse'],
    myTriangle: P5I['triangle'],
    myStroke: P5I['stroke'],
    myPop: P5I['pop'],
    myPush: P5I['push'],
    myTranslate: P5I['translate'],
    myRotate: P5I['rotate'],
    myRectMode: P5I['rectMode'],
    myCenter: P5I['CENTER'],
    myPI: P5I['PI'],
    myMillis: P5I['millis'],
    mySin: P5I['sin'],
    myCos: P5I['cos'],
    myMount: P5I['mount'],
    myUnmount: P5I['unmount']

if (typeof window !== 'undefined') {
    const {
        createCanvas, millis, rectMode,
        rotate, push, pop, translate, ellipse, background, rect, triangle, stroke,
        sin, cos,
        mount, unmount,
        CENTER, PI,
    } = p5i()
    myCreateCanvas = createCanvas
    myMillis = millis
    myRectMode = rectMode
    myRotate = rotate
    myPush = push
    myPop = pop
    myTranslate = translate
    myEllipse = ellipse
    myBackground = background
    myRect = rect
    myTriangle = triangle
    myStroke = stroke
    mySin = sin
    myCos = cos
    myMount = mount
    myUnmount = unmount
    myCenter = CENTER
    myPI = PI
}

export default function LineToCircle() {
    const el = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const w = 800
        const h = 800

        const size = 398
        const ds = size / 2

        const cx = w / 2
        const cy = h / 2
        let st = 0
        function setup() {
            st = myMillis()
            myCreateCanvas(w, h)
            myRectMode(myCenter)
            myStroke('#333')
        }

        const ROUND = 1000 * myPI

        function draw({ mouseX, mouseY }: P5I) {
            const t = myMillis() - st

            const pattern = trunc(t / ROUND) % 3
            const mode = trunc(t / ROUND / 3)

            // if (mode === 0)
            //     myBackground('white')

            const s = mySin(t / 1000) ** 3
            const rad = t / 3500 * (1 + t / 50000)

            myPush()
            myTranslate(cx, cy)
            myRotate(rad)
            if (pattern === 1) {
                myEllipse(0, 0, size, s * size)
            }
            else if (pattern === 2) {
                const h = ds * s / SQRT_2
                myTriangle(0, h, -ds, -h, ds, -h)
            }
            else {
                myRect(0, 0, size, s * size)
            }

            myPop()
        }

        myMount(el.current! as HTMLDivElement, { setup, draw })
        return () => {
            myUnmount()
        }
    }, [])

    return (
        <>
            <Paper>
                <div className='centered' ref={el}>
                </div>
            </Paper>
            <Note>
                <p>remember release a customizable package</p>
            </Note>
        </>
    )
}