/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-01-02 19:32:01
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-02-14 15:12:35
 * @FilePath: \react-100\src\app\Hooks\useWindowPosition\index.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import { useState, useEffect } from "react";
import { defaultWindow } from "../../utils/shared";
import type { UseWindowPosition } from "./type";

const useWindowPosition: UseWindowPosition = (window = defaultWindow) => {
    const [screenTop, setScreenTop] = useState<number>(window?.screenTop || 0);
    const [screenLeft, setScreenLeft] = useState<number>(window?.screenLeft || 0);
    const [screenHeight, setScreenHeight] = useState<number>(window?.screen.height || 0);
    const [screenWidth, setScreenWidth] = useState<number>(window?.screen.width || 0);

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

export default useWindowPosition;