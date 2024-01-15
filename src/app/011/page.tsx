/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-01-14 20:02:12
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-01-15 10:46:20
 * @FilePath: \react-100\src\app\011\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import { useDeviceOrientation } from '../Hooks'


export default function Ship() {
    const orientation = useDeviceOrientation()
    // console.log('orientation is:', orientation)

    const theta = Math.random() * 2 * Math.PI
    const transformStyle = `rotate(${theta}rad)`

    return (
        <div className="centered" style={{ transform: transformStyle }}>
            <p>A ship in harbor is safe,<br />but that is not what ships <br />are built for.</p>
            <br />
            <em>- John A. Shedd</em>
        </div>
    )
}