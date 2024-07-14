/*
 * @Author: luckin yipeng.zhang@kunlun-inc.com
 * @Date: 2024-07-10 22:39:48
 * @LastEditors: luckin yipeng.zhang@kunlun-inc.com
 * @LastEditTime: 2024-07-14 15:22:42
 * @FilePath: /react-100/src/app/035/page.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import { useEffect, useRef, useState } from "react"
import { p5i } from 'p5i'
import type { P5I } from 'p5i'
import Paper from '../components/paper'
import { useMouse, useThrottleFn, useDebounceFn, useDebounceEffect } from 'ahooks';
// import { useDebounceEffect } from 'ahooks';

export default function Page() {
    const el = useRef<any>()
    const {
        mount,
        unmount,
        createCanvas,
        background,
        noFill,
        stroke,
        strokeCap,
        strokeWeight,
        arc,
        push,
        pop,
        vertex,
        sin,
        cos,
        lerp,
        pow,
        millis,
        PI,
        TWO_PI,
        BEVEL,
        CLOSE,
        SQUARE,
    } = p5i()
    const mouse = useMouse(el.current)
    // const [elementX, setElementX] = useState(mouse.elementX)
    // const [elementY, setElementY] = useState(mouse.elementY)

    useEffect(() => {
        interface Ring {
            i: number
            spinSpeed: number
            diameter: number
            arcLength: number
            arcAngle: number
            weight: number
            color: number
            opacity: number
        }

        const rings: Ring[] = []
        const count = 50

        function setup({ windowWidth, windowHeight, random, floor }: P5I) {
            createCanvas(400, 400)

            for (let i = 0; i < count; i++) {
                const diameter = (i + 5) / count * 2
                const arcLength = random(PI * 0.1, PI)
                const arcAngle = random(-PI * 2, PI * 2)
                const spinSpeed = random(-1, 1)
                rings.push({
                    i,
                    spinSpeed,
                    diameter,
                    arcLength,
                    arcAngle,
                    weight: random(5, 30),
                    color: random(255),
                    opacity: random(100, 255),
                })
            }
        }

        // TODO: 切换场景闪烁
        const draw = ({ width, height, arc, translate }: P5I) => {
            background('#fff')

            const minDim = Math.min(width, height)

            noFill()
            strokeCap(SQUARE)

            let d = minDim
            d -= d * 0.25

            const t = millis() / 500

            const x = mouse.elementX - 200
            const y = mouse.elementY - 200

            for (const { i, diameter, arcLength, arcAngle, spinSpeed, color, weight, opacity } of rings) {
                push()
                const spin = t * spinSpeed
                translate(x * i / count / 2, y * i / count / 2)
                strokeWeight(weight)
                stroke(color, color, color, opacity)

                arc(
                    width / 2,
                    height / 2,
                    diameter * d,
                    diameter * d,
                    spin + arcAngle,
                    spin + arcAngle + Math.PI * arcLength,
                )
                pop()
            }
        }

        mount(el.current!, { setup, draw })
        return () => {
            unmount()
        }
    }, [mouse.clientX, mouse.elementY])

    return (
        <Paper>
            <div>
                <div className="container centered box" ref={el} >
                </div>
                <div>
                    <p>
                        Client - x: {mouse.clientX}, y: {mouse.clientY}
                    </p>
                    <p>
                        Page - x: {mouse.pageX}, y: {mouse.pageY}
                    </p>
                    <p>
                        Screen - x: {mouse.screenX}, y: {mouse.screenY}
                    </p>
                </div>
            </div>

        </Paper>
    )
}