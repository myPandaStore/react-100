/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-02-15 10:17:23
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-02-15 15:42:31
 * @FilePath: \react-100\src\app\022\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import { useEffect, useRef, useState } from 'react'
import initCanvas from '../utils/initCanvas'
import { Engine, Render, World, Bodies, Runner, Body } from 'matter-js'
import { range, random, } from '../utils'
import { useSearchParams } from 'next/navigation'
import Paper from '../components/paper'
import Note from '../components/note'

export default function Field() {
    const el = useRef<HTMLDivElement | null>(null)
    const canvas = useRef<HTMLCanvasElement | null>(null)
    const runner = useRef<HTMLIFrameElement | null>(null)
    const fnX = useRef((t: number, x: number, y: number) => 0)
    const fnY = useRef((t: number, x: number, y: number) => 0)
    const [expX, setExpx] = useState('sin(x / 10) / 2')
    const [expY, setExpY] = useState('sin(y / 10) / 2')
    const presetIndex = useRef(0)
    const showArraws = useRef(false)
    showArraws.current = useSearchParams().get('debug') != null

    useEffect(() => {
        const presets = [
            ['sin(x / 10) / 2', 'sin(y / 10) / 2'],
            ['sin(x / 15) / 1.5', 'sin(y / 15) / 1.5'],
        ]
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

        const roll = () => {
            presetIndex.current = (presetIndex.current + 1) % presets.length
            const [a, b] = presets[presetIndex.current]
            setExpx(a)
            setExpY(b)
        }

        const arrow = (fromX = 0, fromY = 0, tox = 0, toy = 0) => {
            const headlen = 2 // length of head in pixels
            const dx = tox - fromX
            const dy = toy - fromY
            const angle = Math.atan2(dy, dx)
            ctx.strokeStyle = '#ff505050'
            ctx.lineWidth = 0.3
            ctx.moveTo(fromX, fromY)
            ctx.lineTo(tox, toy)
            ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6))
            ctx.moveTo(tox, toy)
            ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6))
            ctx.stroke()
        }

        const fieldArrow = () => {
            ctx.clearRect(0, 0, 400, 400)
            if (showArraws.current) {
                for (let x = 5; x <= 400; x += 10) {
                    for (let y = 5; y <= 400; y += 10) {
                        const [dx, dy] = field(x, y)
                        arrow(x, y, x + dx * 10, y + dy * 10)
                    }
                }
            }
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
            return Bodies.circle(x, y, 0.5, {
                frictionAir: 0.001,
                friction: 2,
                render: {
                    fillStyle: 'transparent',
                    strokeStyle: 'black',
                    lineWidth: 1
                }
            })
        }

        const dots = range(1000).map(i => dot(random(400), random(400)))

        const MathContext = `const {${Object.getOwnPropertyNames(Math).join(',')}}=Math`

        try {
            // eslint-disable-next-line no-eval
            // @ts-expect-error anyway
            fnX.current = runner.current.contentWindow!.eval(`()=>{
                  ${MathContext};
                  return (t,x,y) => {
                    return ${expX}
                  }
                }`)()
            // @ts-expect-error anyway
            fnY.current = runner.current.contentWindow!.eval(`()=>{
                  ${MathContext};
                  return (t,x,y) => {
                    return ${expY}
                  }
                }`)()
            fieldArrow()
        }
        catch (e: any) {
            console.log(expX, expY, e.message)
        }

        setInterval(() => {
            for (const dot of dots) {
                const [fx, fy] = field(dot.position.x, dot.position.y)
                Body.setVelocity(dot, { x: fx, y: fy })
            }
        }, 1000)

        setInterval(() => {
            roll()
        }, 10000)

        World.add(engine.world, dots)
        Render.run(render)
        Runner.run(engine)

        const clean = () => {
            fnX.current = () => 0
            fnY.current = () => 0
            stop()
            World.clear(engine.world, true)
            Render.stop(render)
            Engine.clear(engine)
            render.canvas.remove()
        }

        return () => {
            clean()
        }
    }, [expX, expY])
    return (
        <>
            <Paper>
                <>
                    <div className="box centered" ref={el}>
                        <canvas ref={canvas} width={400} height={400}></canvas>
                    </div>
                    <iframe ref={runner} sandbox='allow-same-origin'></iframe>
                </>
            </Paper>
            <Note></Note>
        </>
    )
}