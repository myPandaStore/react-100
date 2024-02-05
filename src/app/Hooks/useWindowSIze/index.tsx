/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2023-12-29 10:39:42
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-02-05 14:41:14
 * @FilePath: \react-100\src\app\Hooks\useWindowSIze\index.tsx
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import { useState, useEffect } from 'react';
import type UseWindowSize from './type';
import { defaultWindow } from '@/app/utils/shared';

const useWindowSize: UseWindowSize = (window = defaultWindow) => {
    const [width, setWidth] = useState<number>(window?.innerWidth || 0);
    const [height, setHeight] = useState<number>(window?.innerHeight || 0);

    useEffect(() => {
        const update = () => {
            if (window) {
                setWidth(window.innerWidth);
                setHeight(window.innerHeight)
            }
        };

        window?.addEventListener('resize', update)
        return () => {
            window?.removeEventListener('resize', update)
        }
    }, [window])

    return { width, height };
}

export default useWindowSize