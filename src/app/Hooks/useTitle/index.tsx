/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2023-12-16 08:58:53
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-02-14 15:20:08
 * @FilePath: \react-100\src\app\Hooks\useTitle\useTitle.tsx
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import { useRef, useEffect } from 'react'
import type { UseTitle } from './type'

const useTitle: UseTitle<string> = (title) => {
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

export default useTitle;