/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-01-02 19:32:01
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-01-02 20:13:48
 * @FilePath: \react-100\src\app\Hooks\useWindowPosition.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import { useRef } from "react";

export default function useWindowPosition() {
    // console.log(window)
    const screenTop = useRef(window.screenTop);
    const screenLeft = useRef(window.screenLeft);
    // TODO: timeout fn in useRaFn

    return {
        screenTop,
        screenLeft
    }
}