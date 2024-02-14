/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-02-14 14:52:53
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-02-14 15:00:24
 * @FilePath: \react-100\src\app\Hooks\useRafFn\type.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
export type RafLoopReturns = {
    resume: () => void;
    pause: () => void;
    active: () => boolean;
}

export type UseRafFn = (
    callback: FrameRequestCallback,
    initiallyActive: boolean,
    options: {
        immediate?: boolean;
    }) => RafLoopReturns;