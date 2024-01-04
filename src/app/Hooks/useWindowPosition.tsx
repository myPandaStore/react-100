/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-01-02 19:32:01
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-01-04 10:57:43
 * @FilePath: \react-100\src\app\Hooks\useWindowPosition.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import { useState } from "react";
import { useMount,useThrottleFn } from 'ahooks';
// import { use } from "matter-js";
const isClient = typeof window !== "undefined";
const defaultWindow = isClient ? window : void 0;


export default function useWindowPosition(window: any = defaultWindow) {

    const [screenTop, setScreenTop] = useState(window?.screenTop);
    const [screenLeft, setScreenLeft] = useState(window?.screenLeft);
    const [screenHeight, setScreenHeight] = useState(window?.screenHeight);
    const [screenWidth, setScreenWidth] = useState(window?.screenWidth);

    const updatePosition = () => {
        if (window) {
            setScreenTop(window.screenTop)
            setScreenLeft(window.screenLeft)
            setScreenHeight(window.screen.height)
            setScreenWidth(window.screen.width)
        }
    }
  
    useMount(() => {
        updatePosition()
    })

    return {
        screenTop,
        screenLeft,
        screenHeight,
        screenWidth
    }
}