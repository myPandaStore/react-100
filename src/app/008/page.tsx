/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-01-05 10:54:01
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-01-05 10:55:14
 * @FilePath: \react-100\src\app\008\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import useWatch from "../utils/useWatch";
import { useState } from "react";
export default function App() {
    const [prev, setPrev] = useState()
    const [count, setCount] = useState(0);

    const stop = useWatch(count, (prevCount) => {
        console.log('prevCount: ', prevCount);
        console.log('currentCount: ', count);
        setPrev(prevCount)
    })

    const add = () => setCount(prevCount => prevCount + 1)

    return (
        <div>
            <p> 当前的count是{count}</p>
            <p> 前一次的count是{prev}</p>
            {count}
            <button onClick={add} className="btn">+</button>
            <button onClick={stop} className="btn">停止观察旧值</button>
        </div>
    )
}
