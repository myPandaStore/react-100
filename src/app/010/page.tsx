/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-01-14 14:27:11
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-02-05 12:34:13
 * @FilePath: \react-100\src\app\010\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import { useRef, useEffect, useState, useCallback } from "react";
import Matter from "matter-js";
import useWindowSize from "../Hooks/useWindowSIze";
import { range } from '../utils'
import Paper from "../components/paper";
import Note from "../components/note";

export default function Mbox() {
    const el = useRef(null);
    const viewport = useWindowSize();
    const [sphere, setSphere] = useState(true)

    const toggleShape = useCallback(() => {
        setSphere(!sphere)
    }, [sphere])

    useEffect(() => {
        // init some object from Matter
        const { Bodies, Body, Engine, Render, World, MouseConstraint, Mouse, Runner } = Matter;
        const engine = Engine.create();
        const render = Render.create({
            element: el.current!,
            engine,
            options: {
                width: 800,
                height: 600,
                wireframes: false,
                background: 'transparent',

            }
        })

        render.canvas.width = viewport.width;
        render.canvas.height = viewport.height;
        render.canvas.style.height = `${viewport.height}px`;
        render.canvas.style.width = `${viewport.width}px`;

        engine.gravity.y = 0;

        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        })
        World.add(engine.world, mouseConstraint)

        // generate 9 * 9 blocks
        const rows = 9;
        const size = 50;
        const r9 = range(rows)
        const offset = {
            x: (viewport.width - size * rows) / 2,
            y: (viewport.height - size * rows) / 2
        }
        const blocks = r9.flatMap(ix => r9.map(iy => {
            let body: Matter.Body = undefined!

            const pos = {
                x: offset.x + ix * size + size * 0.5,
                y: offset.y + iy * size + size * 0.5
            }

            const options = {
                frictionAir: 0.1,
                friction: 0,
                render: {
                    fillStyle: `rgb(${30 + ix * 26},${80 + iy * 22},${90 + (9 - ix) * (8 - iy)})`,
                    strokeStyle: 'black',
                    lineWidth: 0,
                },
            }

            function init() {
                if (body) {
                    World.remove(engine.world, body)
                }
                body = sphere
                    ? Bodies.circle(pos.x, pos.y, size / 2, options)
                    : Bodies.rectangle(pos.x, pos.y, size, size, options)
                World.add(engine.world, [body])
            }

            function getDistance() {
                return Math.sqrt((pos.x - body.position.x) ** 2 + (pos.y - body.position.y) ** 2)
            }

            function restore(factor: number = 0.05) {
                Body.setVelocity(body,
                    {
                        x: factor * (pos.x - body.position.x),
                        y: factor * (pos.y - body.position.y)
                    })
                Body.setAngularVelocity(body, -body.angle * factor)
            }

            function reset() {
                Body.setAngularVelocity(body, 0)
                Body.setVelocity(body, { x: 0, y: 0 })
                Body.setPosition(body, { x: pos.x, y: pos.y })
                Body.setInertia(body, 0)
            }

            function shake(multiplier: number = 30) {
                Body.setVelocity(body,
                    {
                        x: (Math.random() - 0.5) * 2 * multiplier,
                        y: Math.random() - 0.5 * 2 * multiplier
                    })

                Body.setAngularVelocity(body, (Math.random() - 0.5) * 2)
            }

            init()
            return {
                getDistance,
                restore,
                reset,
                shake
            }
        }))
        function restoreAll() {
            blocks.map(i => ({ ...i, distance: i.getDistance() }))
                .sort((a, b) => b.distance - a.distance)
                .forEach((i, idx) => i.restore(idx < 2 ? 0.2 : 0.08))
        }

        // handle event
        let restoreCount = 0
        let timer: ReturnType<typeof setInterval> | null = null
        let timeout: ReturnType<typeof setTimeout> | null = null


        function start() {
            if (restoreCount) {
                restoreCount = 60
                return
            }
            stop()
            restoreCount = 60
            timeout = setTimeout(() => {
                timer = setInterval(() => {
                    restoreCount--
                    restoreAll()
                    if (restoreCount <= 0) {
                        stop()
                    }
                }, 100)
            }, 2000)
        }

        function stop() {
            if (timer) {
                clearInterval(timer)
            }
            if (timeout) {
                clearTimeout(timeout)
            }
            restoreCount = 0
        }

        function reset() {
            stop()
            blocks.forEach(i => i.reset())
        }



        function shake() {
            stop()
            blocks.forEach(i => i.shake())
            start()
        }

        window.addEventListener('keydown', (e) => {
            if (e.key === 'r') {
                reset()
            } else if (e.key === 's') {
                toggleShape()
            } else if (e.key === 'a') {
                shake()
            }
        })
        window.addEventListener('mouseup', start)
        window.addEventListener('mousedown', stop)
        Runner.run(engine)
        Render.run(render)
        return () => {
            Render.stop(render);
            Engine.clear(engine);
            World.clear(engine.world, true);
            render.canvas.remove();
            window.removeEventListener('mouseup', start)
            window.removeEventListener('mousedown', stop)
        }
    }, [viewport, sphere, toggleShape])
    return (
        <>
            <Paper>
                <div className="centered" ref={el}></div>
            </Paper>
            <Note>
                <div>
                    <p>drag them</p>
                    <br />
                    <a onClick={toggleShape}>toggle shape</a>
                </div>
            </Note>
        </>
    )
}