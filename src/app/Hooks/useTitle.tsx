/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2023-12-16 08:58:53
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2023-12-16 09:20:18
 * @FilePath: \react-100\src\app\Hooks\useTitle.tsx
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import { useRef, useEffect } from 'react'

export default function useTitle(title: string): string {
    const documentDefined = typeof document !== 'undefined';
    const originalTitle = useRef(documentDefined ? document.title : '');
    const current = originalTitle.current

    useEffect(() => {
        if (!documentDefined) return;

        if (document.title !== title) document.title = title;

        return () => {
            document.title = current;
        };
    }, [documentDefined, originalTitle, current, title]);
    return current
};