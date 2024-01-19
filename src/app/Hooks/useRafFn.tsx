/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2023-12-27 09:48:47
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-01-19 10:28:29
 * @FilePath: \react-100\src\app\Hooks\useRafFn.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2023-12-27 09:48:47
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-01-17 17:16:04
 * @FilePath: \react-100\src\app\Hooks\useRafFn.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import { useCallback, useEffect, useMemo, useRef } from "react";
import useLatest from "./useLatest";

// export type RafLoopReturns = readonly [() => void, () => void, () => boolean];
type RafLoopReturns = {
    resume: () => void;
    pause: () => void;
    active: () => boolean;
}
export default function useRafFn(
    callback: FrameRequestCallback,
    initiallyActive = true,
): RafLoopReturns {
    const raf = useRef<number | null>(null);
    const rafActivity = useRef<boolean>(false);
    const rafCallback = useLatest(callback);

    const step = useCallback(
        (time: number) => {
            if (rafActivity.current) {
                rafCallback.current(time);
                raf.current = requestAnimationFrame(step);
            }
        },
        [rafCallback],
    );

    const result = useMemo(
        () => {
            return {
                pause: () => {
                    // stop
                    if (rafActivity.current) {
                        rafActivity.current = false;
                        raf.current && cancelAnimationFrame(raf.current);
                    }
                },
                resume: () => {
                    // start
                    if (!rafActivity.current) {
                        rafActivity.current = true;
                        raf.current = requestAnimationFrame(step);
                    }
                },
                active: (): boolean => rafActivity.current, // isActive
            }
        },
        [step],
    );

    useEffect(() => {
        if (initiallyActive) {
            result.resume();
        }

        return result.pause;
    }, [initiallyActive, result]);

    return result;
}