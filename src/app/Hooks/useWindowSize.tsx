/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2023-12-29 10:39:42
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-01-04 09:48:11
 * @FilePath: \react-100\src\app\Hooks\useWindowSize.tsx
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import { useState } from 'react';
const isClient = typeof window !== "undefined";
const defaultWindow = isClient ? window : void 0;

export default function useWindowSize(window: any = defaultWindow) {
    const [width, setWidth] = useState<number>(window?.innerWidth);
    const [height, setHeight] = useState<number>(window?.innerHeight);

    const update = () => {
        if (window) {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight)
        }
    };

    window?.addEventListener('resize', () => {
        update();
    })

    return { width, height };
}