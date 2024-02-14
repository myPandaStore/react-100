/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2023-12-27 09:48:47
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-02-14 15:25:02
 * @FilePath: \react-100\src\app\Hooks\useRafFn\index.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useLatest from "../useLatest";
import type { UseRafFn } from "./type";

const useRafFn: UseRafFn = (
    callback,
    initiallyActive,
    options
) => {
    const raf = useRef<number | null>(null);
    const rafActivity = useRef<boolean>(false);
    const rafCallback = useLatest(callback);
    const { immediate } = options
    const [trigger, setTrigger] = useState('')

    // trigger re-render so that useRaffn can get the setted frame.current in useEffect
    useEffect(() => {
        if (immediate) {
            setTrigger('1')
        }
    }, [immediate])

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
    }, [initiallyActive, result, callback]);

    return result;
}

export default useRafFn;