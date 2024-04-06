/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-04-06 10:18:32
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-04-06 11:33:21
 * @FilePath: \react-100\src\app\031\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import { p5i } from 'p5i'
import type { P5I } from 'p5i'
import { useEffect, useRef } from 'react'
import Paper from "../components/paper"
import Note from "../components/note"
import { distance, } from '../utils'
import { r60, SQRT_3 } from "../utils/vector"

const { abs, atan2, min } = Math

// 处理 node_modules\p5\lib\p5.min.js (2:428474) @ window
//  ReferenceError: window is not defined
let myCreateCanvas: P5I['createCanvas'],
    myBackground: P5I['background'],
    myStrokeWeight: P5I['strokeWeight'],
    myMap: P5I['map'],
    myStroke: P5I['stroke'],
    myPush: P5I['push'],
    myTranslate: P5I['translate'],
    myLine: P5I['line'],
    myRotate: P5I['rotate'],
    myFill: P5I['fill'],
    myNoStroke: P5I['noStroke'],
    myPop: P5I['pop'],
    myMount: P5I['mount'],
    myUnmount: P5I['unmount']
if (typeof window !== 'undefined') {
    console.log('window is defined')
    let { createCanvas, background, strokeWeight, map, stroke, push, translate, pop, line, rotate, fill, noStroke, mount, unmount } = p5i()
    myCreateCanvas = createCanvas
    myBackground = background
    myStrokeWeight = strokeWeight
    myMap = map
    myStroke = stroke
    myPush = push
    myTranslate = translate
    myLine = line
    myRotate = rotate
    myFill = fill
    myNoStroke = noStroke
    myPop = pop
    myMount = mount
    myUnmount = unmount
} else {
    console.log('window is undefined')
}

export default function Lines() {
    const el = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        const h = 400
        const w = 400
        function setup() {
            myCreateCanvas(w, h)
        }

        function draw({ mouseX, mouseY }: P5I) {
            myBackground('transparent')

            const columns = 30
            const rows = 30
            const n = 10
            for (let i = 0; i < rows - 1; i++) {
                for (let j = 0; j < columns - 1; j++) {
                    const q = i - rows / 2
                    const r = j - columns / 2
                    const s = -q - r

                    if (abs(q) > n || abs(r) > n || abs(s) > n)
                        continue

                    // https://www.redblobgames.com/grids/hexagons/#hex-to-pixel-axial
                    const cx = w / 2
                    const cy = h / 2
                    const margin = 10
                    const currentOffset = {
                        x: cx + margin * (q * SQRT_3 + r * SQRT_3 / 2),
                        y: cx + margin * (r * 3 / 2),
                    }

                    const d = distance([currentOffset.x, currentOffset.y], [mouseX, mouseY])
                    const gravity = 1 - min(d / 400, 1)

                    const len = 9
                    const length = len * gravity
                    const delta = {
                        x: currentOffset.x + length / 2 - margin / 2 - mouseX,
                        y: currentOffset.y - mouseY,
                    }

                    let theta = atan2(delta.y, delta.x)
                    const deltaThreshold = 40

                    theta += r60 * gravity

                    const strokeWidth = 2
                    myStrokeWeight(strokeWidth)
                    myStroke(100)

                    if (abs(delta.x) < deltaThreshold && abs(delta.y) < deltaThreshold) {
                        const amt = (abs(delta.x) + abs(delta.y)) / 2
                        const amtMapped = myMap(amt, 0, deltaThreshold, -50, 255)
                        myStroke(100, amtMapped)
                    }

                    myPush()
                    myTranslate(currentOffset.x, currentOffset.y)
                    myRotate(theta)

                    myLine(0, 0, length, 0)
                    myPop()

                    myFill(250, 150, 0)
                    myNoStroke()
                }
            }
        }

        myMount(el.current as HTMLDivElement, { setup, draw })

        return () => {
            myUnmount()
        }
    },[])



    return (
        <>
            <Paper>
                <div ref={el} className='centered'>
                </div>
            </Paper>
            <Note>
                <p>lines</p>
            </Note>
        </>
    )
}