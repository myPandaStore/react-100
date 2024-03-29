/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2023-12-11 17:49:34
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-01-22 19:16:29
 * @FilePath: \react-100\src\app\003\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2023-12-11 17:45:52
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2023-12-16 10:57:01
 * @FilePath: \react-100\src\app\003\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
"use client"
import { useEffect, useRef } from 'react'
import { Engine, Render, Bodies, World, Runner, } from 'matter-js'
import Paper from '../components/paper'
import Note from '../components/note'
import noop from '../utils/noop'

const f = {
    add: noop,
    stop: noop
}

export default function App() {

    return (
        <>
            <Paper>
                <Mass />
            </Paper>
            <Note>
                <p>hands-on <a href="https://brm.io/matter-js" target='_blank'>Matter.js</a></p>
            </Note>
        </>
    )
}

const wireFrame = {
    fillStyle: 'transparent',
    strokeStyle: 'black',
    lineWidth: 1,
}
function Mass() {
    const canvasRef = useRef<HTMLDivElement | null>(null)
    const engine = useRef(Engine.create())

    f.add = () => {
        const boxA = Bodies.rectangle(180, -40, 80, 80, { render: wireFrame })
        World.add(engine.current.world, [boxA])
    }

    useEffect(() => {
        const render = Render.create({
            element: canvasRef.current!,
            engine: engine.current,
            options: {
                width: 400,
                height: 400,
                background: '#ffffff',
                wireframes: false,
            }
        })


        const ground = Bodies.rectangle(400, 200, 410, 50,
            { isStatic: true, render: wireFrame },
        )

        World.add(engine.current.world, [
            ground
        ])

        f.stop = () => {
            Render.stop(render)
            World.clear(engine.current.world, true)
            Engine.clear(engine.current)
            render.canvas.remove()
        }
        f.add()

        Runner.run(engine.current)
        Render.run(render)
        return () => {
            f.stop()
        }
    }, [])


    return (
        <div
            onClick={f.add}
            ref={canvasRef} className='centered flex justify-center items-center border border-black'
        >
        </div>
    )
}

