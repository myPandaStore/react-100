/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-02-15 10:17:23
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-02-15 12:02:26
 * @FilePath: \react-100\src\app\022\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import { useThrottle, useRafInterval, useInterval } from 'ahooks'
import { useEffect, useRef, useState } from 'react'
import initCanvas from '../utils/initCanvas'
import { Engine, Render, World, Bodies, Runner, Body } from 'matter-js'
import { range, random, } from '../utils'

export default function Field() {
    const el = useRef<HTMLDivElement | null>(null)
    const canvas = useRef<HTMLCanvasElement | null>(null)
    const runner = useRef<HTMLIFrameElement | null>(null)
    const fnX = useRef((t: number, x: number, y: number) => 0)
    const fnY = useRef((t: number, x: number, y: number) => 0)
    const [expX, setExpx] = useState('sin(x / 10) / 2')
    const [expY, setExpY] = useState('sin(y / 10) / 2')

    // const throttledX = useThrottle(expX, { wait: 500 })
    // const throttledY = useThrottle(expY, { wait: 500 })

    let presetIndex = 0
    const presets = [
        ['sin(x / 10) / 2', 'sin(y / 10) / 2'],
        ['sin(x / 15) / 1.5', 'sin(y / 15) / 1.5'],
    ]
    const roll = () => {
        presetIndex = (presetIndex + 1) % presets.length
        const [a, b] = presets[presetIndex]
        setExpx(a)
        setExpY(b)
    }

    const cx = 200
    const cy = 200
    const field = (_x = 0, _y = 0) => {
        const x = cx - _x
        const y = cy - _y

        return [
            fnX.current(0, x, y),
            fnY.current(0, x, y)
        ]
    }
    const dot = (x: number = 0, y: number = 0) => {
        return Bodies.circle(x, y, 1, {
            frictionAir: 0.01,
            friction: 2,
            render: {
                fillStyle: 'transparent',
                strokeStyle: 'black',
                lineWidth: 1
            }
        })
    }

    const dots = range(1000).map(i => dot(random(400), random(400)))

    useRafInterval(() => {
        console.log('test')
        for (const dot of dots) {
            const [fx, fy] = field(dot.position.x, dot.position.y)
            Body.setVelocity(dot, { x: fx, y: fy })
        }
    }, 1000)
    useEffect(() => {
        const { ctx } = initCanvas(canvas.current!)
        const engine = Engine.create()
        const render = Render.create({
            element: el.current as HTMLDivElement,
            engine,
            options: {
                width: 400,
                height: 400,
                background: 'transparent',
                wireframes: false,
                // @ts-expect-error untyped
                pixelRatio: 'auto',
                // showVelocity: true,
                // showAngleIndicator: true
            }
        })
        engine.gravity.y = 0
        const fieldArrow = () => {
            ctx.clearRect(0, 0, 400, 400)
        }

        // animation
        const MathContext = `const {${Object.getOwnPropertyNames(Math).join(',')}}=Math`

        try {
            // eslint-disable-next-line no-eval
            // @ts-expect-error anyway
            fnX.current = runner.value!.contentWindow!.eval(`()=>{
                  ${MathContext};
                  return (t,x,y) => {
                    return ${expX}
                  }
                }`)()
            // @ts-expect-error anyway
            fnY.current = runner.value!.contentWindow!.eval(`()=>{
                  ${MathContext};
                  return (t,x,y) => {
                    return ${expY}
                  }
                }`)()

            // console.log(expX, expY, 'ok')
            // f.reset()
            fieldArrow()
        }
        catch (e) {
            // console.log(expX, expY, e.message)
        }



        World.add(engine.world, dots)

        // setInterval(() => {
        //     console.log('interval-1')
        //     for (const dot of dots) {
        //         const [fx, fy] = field(dot.position.x, dot.position.y)
        //         Body.setVelocity(dot, { x: fx, y: fy })
        //     }
        // }, 1000)



        // setInterval(() => {
        //     roll()
        // }, 10000)
        Render.run(render)
        Runner.run(engine)

        const clean = () => {
            World.clear(engine.world, true)
            Render.stop(render)
            Engine.clear(engine)
            render.canvas.remove()
        }

        return () => {
            clean()
        }
    }, [expX, expY, dots])
    return (
        <>
            <div className="box centered" ref={el}>
                <canvas ref={canvas} width={400} height={400}></canvas>
            </div>
            <iframe ref={runner} sandbox='allow-same-origin'></iframe>
        </>
    )
}