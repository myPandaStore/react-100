/*
 * @Author: luckin yipeng.zhang@kunlun-inc.com
 * @Date: 2024-07-10 22:39:48
 * @LastEditors: luckin yipeng.zhang@kunlun-inc.com
 * @LastEditTime: 2024-07-11 22:15:30
 * @FilePath: /react-100/src/app/034/page.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import { useEffect, useRef } from "react"
import { p5i } from 'p5i'
import type { P5I } from 'p5i'
import Paper from '../components/paper'

export default function Page() {
    const el = useRef<any>(null)

    const { random, trunc, min } = Math
    const {
        mount, unmount,
        createCanvas, resizeCanvas, background, noFill,
        stroke, noise, noiseSeed, noLoop, cos, sin, line,
        beginShape, endShape, vertex,
        push, pop, translate,
        TWO_PI,
    } = p5i()

    const w = 400
    const h = 400

    const SCALE = 70
    const SCALE_Z = w * 1.5
    const LENGTH = 4
    const SPACING = 10
    const AMOUNT = 2000

    function getForceOnPoint(x: number, y: number, z: number) {
        // https://p5js.org/reference/#/p5/noise
        return (noise(x / SCALE, y / SCALE, z / SCALE_Z) - 0.5) * 2 * TWO_PI
    }

    let points: { x: number; y: number; t: number }[] = []

    function setup() {
        createCanvas(398, 398)
        background('#fff')
        stroke('#888')
        noFill()

        noiseSeed(+new Date())

        points = []
        for (let i = 0; i < AMOUNT; i++)
            points.push({ x: random() * w, y: random() * h, t: 0 })
    }

    function draw({ frameCount, mouseX, mouseY }: P5I) {
        background(255, 255, 255, 50)

        points = points
            .filter(({ x, y }) => x > 0 && x < w && y > 0 && y < h)

        const len = points.length
        const n = AMOUNT - points.length

        if (n > 0) {
            for (let i = 0; i < n; i++) {
                const { x, y } = points[trunc(random() * len)]
                points.push({
                    x: x + (random() - 0.5) * LENGTH * 50,
                    y: y + (random() - 0.5) * LENGTH * 50,
                    t: 0,
                })
            }
        }

        for (const p of points) {
            const { x, y, t } = p
            stroke(0, 0, 0, min(t * 10, 200))
            const rad = getForceOnPoint(x, y, mouseX + mouseY + frameCount / 2)
            const nx = x + cos(rad) * LENGTH
            const ny = y + sin(rad) * LENGTH
            line(x, y, nx, ny)
            p.x = nx
            p.y = ny
            p.t += 1
        }
    }

    function restart() {
        if (el.current)
            mount(el.current, { setup, draw })
    }

    useEffect(() => {
        restart()

        return () => {
            unmount()
        }
    }, [])

    return (
        <Paper>
            <div className="container centered box" ref={el} onClick={() => restart()}>
            </div>
        </Paper>
    )
}