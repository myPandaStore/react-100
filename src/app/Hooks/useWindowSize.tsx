/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2023-12-29 10:39:42
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-01-02 20:06:34
 * @FilePath: \react-100\src\app\Hooks\useWindowSize.tsx
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { useRef, useState } from 'react';

// TODO: defaultWindow is common property which could be split into a const variable
const isClient = typeof window !== "undefined";
const defaultWindow = isClient ? window : void 0;


export default function useWindowSize({ window = defaultWindow, initialWidth = 0, initialHeight = 0 } = {}) {
    const [width, setWidth] = useState<number>(initialWidth);
    const [height, setHeight] = useState<number>(initialHeight);
    const update = () => {
        if (window) {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight) 
        }
    };
    // TODO: complete tryOnMounted
    // update();
    // shared.tryOnMounted(update);
    // TODO: complete useEventListenner
    // useEventListener("resize", update, { passive: true });
    window?.addEventListener('resize', () => {
        update();
    })
    return { width, height };
}