/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-02-14 15:03:08
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-02-14 15:13:57
 * @FilePath: \react-100\src\app\Hooks\useWindowPosition\type.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
export type UseWindowPosition = (window?: (Window & typeof globalThis) | undefined) =>
    {
        screenTop: number,
        screenLeft: number,
        screenHeight: number,
        screenWidth: number
    }