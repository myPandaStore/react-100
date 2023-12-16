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
import { Engine, Render, Bodies, World, } from 'matter-js'
import Page from '../components/paper'

function noop(): void {
    console.log('noop')
}

const f = {
    add: noop
}

export default function App() {

    return (
        <Page slot={Mass()} />
    )
}


function Mass() {
    const canvasRef = useRef<any>()
    const engine = useRef(Engine.create())

    f.add = () => {
        console.log('f.add')
        const boxA = Bodies.rectangle(180, -40, 80, 80, { render: wireFrame })
        World.add(engine.current.world, [boxA])
    }

    const wireFrame = {
        fillStyle: 'transparent',
        strokeStyle: 'black',
        lineWidth: 1,
    }

    useEffect(() => {
        const render = Render.create({
            element: canvasRef.current,
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


        f.add()

        Engine.run(engine.current)
        Render.run(render)

        return () => {
            Render.stop(render)
            World.clear(engine.current.world, true)
            Engine.clear(engine.current)
            render.canvas.remove()
            render.textures = {}
        }
    }, [])


    return (
        <div
            onClick={f.add}
            ref={canvasRef} className='w-full flex justify-center items-center'
        >
        </div>
    )
}

