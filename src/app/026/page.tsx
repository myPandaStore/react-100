'use client'
import { useEffect, useRef } from "react"
import { load } from "../utils/load"
import Matter from 'matter-js'
import useWindowSize from "../Hooks/useWindowSIze"
import { useSearchParams } from "next/navigation"
import type { Vector } from "../utils/vector"
import { addVec, vec2mat } from "../utils/vector"
import { range } from "../utils"
// @ts-expect-error
import MatterAttractors from 'matter-attractors'
import Paper from "../components/paper"
import Note from "../components/note"

Matter.use(MatterAttractors)

const { Engine, Mouse, MouseConstraint, Render, World, Bodies, Runner } = Matter

export default function App() {
    const el = useRef<HTMLDivElement | null>(null)
    const viewport = useWindowSize()
    const debug = !!useSearchParams().get('debug')

    // TODO:首次页面挂载不符合预期
    // TODO:样式
    useEffect(() => {
        async function fetchPolyDecomp() {
            await Promise.all([
                load('https://cdn.jsdelivr.net/gh/schteppe/poly-decomp.js@master/build/decomp.min.js'),
            ])
        }
        fetchPolyDecomp()

        const { width, height } = viewport
        const engine = Engine.create()
        const render = Render.create({
            element: el.current!,
            engine,
            options: {
                width: width,
                height: height,
                background: 'transparent',
                wireframes: true,
                showVelocity: debug,
                // @ts-expect-error untyped
                pixelRatio: 'auto',
            },
        })
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
        render.mouse = mouse
        render.element.style.zIndex = '-1'
        engine.world.gravity.y = 0

        // TODO: 鼠标拖拽不生效
        World.add(engine.world, mouseConstraint)
        const gravity = 5e-5
        World.add(engine.world, Matter.Bodies.circle(
            width / 2,
            height / 2,
            0,
            {
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
            },
        ))

        const s = 18
        let points: Vector[] = []
        let bodies: Matter.Body[] = []
        const reset = () => {
            const ds = s / 2
            points = [
                [-ds, ds],
                [-ds, -ds],
                [ds, -ds],
                [ds, ds],
            ]

            bodies.forEach((b) => {
                World.remove(engine.world, b)
            })
            bodies = []
            const cx = width / 2
            const cy = height / 2
            const render = {
                fillStyle: 'transparent',
                strokeStyle: '#444',
                lineWidth: 0.5,
            }

            addBody(Bodies.rectangle(cx, cy, s, s, {
                render,
                isStatic: true,
            }))

            range(14).forEach((_, idx) => {
                const u = getU((idx + 1) % 4)
                const body = Bodies.fromVertices(
                    cx - idx * 2, cy - idx * 2,
                    [u],
                    {
                        frictionAir: 0.1,
                        friction: 0,
                        // isStatic: true,
                        render,
                    },
                    true,
                )
                addBody(body)
            })
        }
        const getU = (d = 0) => {
            const diffs: Vector[][] = [
                [[-s, 0], [-s, -s], [s, -s], [s, 0]],
                [[0, s], [0, -s], [s, -s], [s, s]],
                [[-s, s], [-s, 0], [s, 0], [s, s]],
                [[-s, s], [-s, -s], [0, -s], [0, s]],
            ]
            const diff = diffs[d]
            const newPoints = points.map((v, i) => addVec(v, diff[i]))
            const outer = shift(newPoints, d).map(([x, y]): Vector => [x - 0.3, y - 0.3])
            const inner = shift(points, d).reverse().map(([x, y]): Vector => [x + 0.3, y + 0.3])
            const u = [...outer, ...inner].map(vec2mat)
            points = newPoints
            return u
        }

        function shift<T>(arr: T[], offset = 0): T[] {
            const l = arr.length
            return arr.map((_, idx) => arr[(idx + offset) % l])
        }
        function addBody(body: Matter.Body) {
            bodies.push(body)

            World.add(engine.world, body)
        }
        reset()


        Runner.run(engine)
        Render.run(render)

        const cleanup = () => {
            World.clear(engine.world, true)
            Engine.clear(engine)
            Render.stop(render)
            render.canvas.remove()
        }
        return () => {
            cleanup()
        }

    }, [debug, viewport])

    return (
        <>
            <Paper>
                <div className="" ref={el}></div>
            </Paper>
            <Note>
                <p>change your window size</p>
            </Note>
        </>
    )
}