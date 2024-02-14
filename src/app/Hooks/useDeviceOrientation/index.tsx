/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-01-15 10:24:21
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-02-14 14:50:11
 * @FilePath: \react-100\src\app\Hooks\useDeviceOrientation\index.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import { useState, useEffect, useDebugValue } from "react";
import type { UseDeviceOrientation, ConfigurableWindow, OrientationType } from './type'
import { defaultWindow } from "@/app/utils/shared";

const useDeviceOrientation: UseDeviceOrientation = (options: ConfigurableWindow = {}) => {
    const { window = defaultWindow } = options;
    const isSupported = Boolean(window && "DeviceOrientationEvent" in window);
    const [isAbsolute, setIsAbsolute] = useState(false);
    const [alpha, setAlpha] = useState<OrientationType>(null);
    const [beta, setBeta] = useState<OrientationType>(null);
    const [gamma, setGama] = useState<OrientationType>(null);

    useEffect(() => {
        if (isSupported && window) {
            window.addEventListener("deviceorientation", (event) => {
                setIsAbsolute(event.absolute);
                setAlpha(event.alpha);
                setBeta(event.beta);
                setGama(event.gamma);
            });
        }
    }, [isSupported, window])

    useDebugValue({ isSupported, isAbsolute, alpha, beta, gamma });
    return {
        isSupported,
        isAbsolute,
        alpha,
        beta,
        gamma
    };
}

export default useDeviceOrientation;