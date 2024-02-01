/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-02-01 10:06:51
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-02-01 12:25:49
 * @FilePath: \react-100\src\app\020\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import { useRef, useEffect, useState } from 'react'
import useRafFn from '../Hooks/useRafFn'

export default function Connect() {
    const el = useRef<HTMLCanvasElement | null>(null)
    const frame = useRef(() => { console.log('init') })
    const [num, setNum] = useState(0)

    useEffect(() => {
        console.log('mount')
        frame.current = () => {
            console.log('render')
        }
    }, [])
    useRafFn(frame.current, true, { immediate: true })

    return (
        <div className="box centered">
            <canvas ref={el} width={400} height={400}></canvas>
        </div>
    )
}