/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-02-17 15:03:22
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-02-17 20:31:03
 * @FilePath: \react-100\src\app\024\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import { useEffect, useRef, useState } from "react"
import Matter from 'matter-js'
// @ts-expect-error missing types
import MatterAttractors from 'matter-attractors'
import { hslToRgb } from "../utils/color"
import { range, random, } from "../utils"
import { timestamp } from "../utils"
import Paper from "../components/paper"
import Note from "../components/note"

const { Engine, Mouse, MouseConstraint, Render, World, Bodies, Events, Runner } = Matter
Matter.use(MatterAttractors)

const { sin, cos, max, round } = Math

interface Ball {
    hue: number
    size: number
    body: Matter.Body
    roundness: number
    edges: number
    isEgg?: boolean
}

export default function Clone() {
    const el = useRef<HTMLDivElement | null>(null)
    const [seenEgg, setSeeEgg] = useState<boolean>(false)

    function clamp(n: number, min: number, max: number) {
        if (n < min)
            return min
        if (n > max)
            return max
        return n
    }

    useEffect(() => {
        const engine = Engine.create()
        const render = Render.create({
            element: el.current as HTMLElement,
            engine,
            options: {
                width: 400,
                height: 400,
                background: 'transparent',
                wireframes: false,
                showVelocity: true,
                // @ts-expect-error untyped
                pixelRatio: 'auto',
            }
        })
        engine.world.gravity.y = 0
        const world = engine.world

        let balls: Ball[] = []

        const createBall = (hue: number, size: number, roundness = 0.1, edges = 5, x = 200, y = 200, isEgg = false): Ball => {
            isEgg = isEgg || ((hue <= 0.02 || hue >= 0.99) && roundness > 0.7)

            const options: any = {
                frictionAir: 0.1,
                friction: 0,
                render: {
                    fillStyle: `rgb(${hslToRgb(hue, 0.6, 0.6).join(',')})`,
                    strokeStyle: 'white',
                    lineWidth: 2,
                },
            }

            if (isEgg) {
                options.render.sprite = {
                    texture: '/020-goldfish.png',
                    xScale: (size / 200) * 0.9,
                    yScale: (size / 200) * 0.9,
                }
            }

            const body = (roundness >= 0.7 || isEgg)
                ? Bodies.circle(x, y, size, options)
                : Bodies.polygon(x, y, edges, size, {
                    chamfer: { radius: range(edges).map(i => roundness * size) },
                    ...options,
                })

            const ball = { body, hue, size, roundness, edges, isEgg }
            balls.push(ball)
            World.add(world, body)

            if (!seenEgg && isEgg) {
                setTimeout(() => {
                    alert('Congarts on finding the easter egg! 🎉 \nThanks for playing!')
                }, 800)
                setSeeEgg(true)
            }

            return ball
        }

        const clone = (ball: Ball) => {
            const r = random(1, -1)
            let hue = ball.hue + random(0.07, -0.07)
            if (hue < 0)
                hue += 1
            if (hue > 1)
                hue -= 1

            const size = ball.size <= 20 ? ball.size * random(1.2, 1) : max(ball.size * random(1.2, 0.8), 20)
            const offset = (ball.size + size) * 0.9
            const roundness = clamp(ball.roundness + random(0.2, -0.2), 0, 0.75)
            let edges = ball.edges
            if (roundness >= 0.75)
                edges = clamp(Math.round(edges * random(2, -2)), 3, 7)

            return createBall(
                hue,
                size,
                roundness,
                edges,
                ball.body.position.x + offset * sin(r),
                ball.body.position.y + offset * cos(r),
                ball.isEgg,
            )
        }

        const gravity = 5e-6
        World.add(world, Matter.Bodies.circle(200, 200, 0, {
            isStatic: true,
            plugin: {
                attractors: [
                    (bodyA: Matter.Body, bodyB: Matter.Body) => {
                        return {
                            x: (bodyA.position.x - bodyB.position.x) * gravity,
                            y: (bodyA.position.y - bodyB.position.y) * gravity,
                        }
                    },
                ],
            },
        }))
        clone(clone(createBall(random(0.2, 0.6), random(30, 20))))

        const mouse = Mouse.create(render.canvas)
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false,
                },
            },
        })
        World.add(world, mouseConstraint)

        let start = 0
        Events.on(mouseConstraint, 'startdrag', (e) => {
            start = timestamp()
        })

        Events.on(mouseConstraint, 'enddrag', (e) => {
            if (timestamp() - start > 300)
                return
            // @ts-ignore
            const body = e.body
            const ball = balls.find(i => i.body === body)
            if (ball) {
                clone(ball)
                cleanup()
            }
        })

        function cleanup() {
            balls = balls.filter((b) => {
                const { x, y } = b.body.position
                if (x > -100 && x < 500 && y > -100 && y < 500)
                    return true

                World.remove(world, b.body)
                return false
            })
        }

        Render.run(render)
        Runner.run(engine)
        return () => {
            Render.stop(render)
            render.canvas.remove()
        }
    }, [seenEgg])
    return (
        <>
            <Paper >
                <div className="box centered" ref={el}>

                </div>
            </Paper>
            <Note>
                {!seenEgg
                    ? <p>it is not always perfect to make clones.</p>
                    : <p>Congrats!</p>
                }
            </Note>
        </>
    )
}