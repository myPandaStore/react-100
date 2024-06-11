/*
 * @Author: luckin yipeng.zhang@kunlun-inc.com
 * @Date: 2024-06-11 10:43:31
 * @LastEditors: luckin yipeng.zhang@kunlun-inc.com
 * @LastEditTime: 2024-06-11 11:29:26
 * @FilePath: /react-100/src/app/033/page.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import { useRef, useEffect } from 'react'
import initCanvas from '../utils/initCanvas'
import useRafFn from '../Hooks/useRafFn'

export default function Page() {
    const el = useRef<HTMLCanvasElement | null>(null)
    const draw = useRef(() => { })
    useEffect(() => {
        const canvas = el.current!
        const { ctx } = initCanvas(canvas)

        let x = 0
        let y = 0
        let t = 0
        x = y = 0
    
        draw.current = () => {
            t+=1
            if(t>30){
                return
            }
            const _a=0
        }
    }, [])

    useRafFn(
        draw.current,
        true,
        { immediate: true }
    )
    return (
        <div style={{background: "white"}}>
            <canvas ref={el}></canvas>
        </div>
    )
}