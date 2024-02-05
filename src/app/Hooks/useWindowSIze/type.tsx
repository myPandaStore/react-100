/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-02-05 11:54:33
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-02-05 14:37:34
 * @FilePath: \react-100\src\app\Hooks\useWindowSIze\type.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
type UseWindowSize = (Window?: (Window & typeof globalThis) | undefined) => { width: number, height: number }

export default UseWindowSize