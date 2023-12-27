/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2023-12-27 09:48:47
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2023-12-27 10:03:13
 * @FilePath: \react-100\src\app\utils\rafFn.tsx
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { useRef } from "react";
const isClient = typeof window !== "undefined";
const defaultWindow = isClient ? window : void 0;

export function useRafFn(fn: Function, options: { immediate?: boolean; window?: Window | undefined; } = {}) {
    const {
        immediate = true,
        window = defaultWindow
    } = options;
    const isActive = useRef<boolean>(false);
    function loop() {
        if (!isActive.current || !window)
            return;
        fn();
        window.requestAnimationFrame(loop);
    }
    loop()
    // function resume() {
    //     if (!isActive.current && window) {
    //         isActive.current = true;
    //         loop();
    //     }
    // }
    // function pause() {
    //     isActive.current = false;
    // }
    // if (immediate)
    //     resume();

    // tryOnScopeDispose(pause);
    // pause()
    // return {
    //     isActive,
    //     pause,
    //     resume
    // };
}

// function tryOnScopeDispose(fn) {
//     if (vueDemi.getCurrentScope()) {
//       vueDemi.onScopeDispose(fn);
//       return true;
//     }
//     return false;
//   }