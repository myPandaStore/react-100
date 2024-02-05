/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-01-02 19:32:01
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-02-05 13:28:46
 * @FilePath: \react-100\src\app\Hooks\useWindowPosition.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import { useState, useEffect } from "react";
import { defaultWindow } from "../utils/shared";

export default function useWindowPosition(window: any = defaultWindow) {
    const [screenTop, setScreenTop] = useState(window?.screenTop);
    const [screenLeft, setScreenLeft] = useState(window?.screenLeft);
    const [screenHeight, setScreenHeight] = useState(window?.screenHeight);
    const [screenWidth, setScreenWidth] = useState(window?.screenWidth);

    useEffect(() => {
        const updatePosition = () => {
            if (window) {
                setScreenTop(window.screenTop)
                setScreenLeft(window.screenLeft)
                setScreenHeight(window.screen.height)
                setScreenWidth(window.screen.width)
            }
        }
        updatePosition()
    }, [window])

    return {
        screenTop,
        screenLeft,
        screenHeight,
        screenWidth
    }
}