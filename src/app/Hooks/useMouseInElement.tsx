// /*
//  * @Author: luckin 1832114807@qq.com
//  * @Date: 2024-01-02 19:46:10
//  * @LastEditors: luckin 1832114807@qq.com
//  * @LastEditTime: 2024-01-02 20:48:41
//  * @FilePath: \react-100\src\app\Hooks\useMouseInElement.tsx
//  * @Description: 
//  * 
//  * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
//  */
// import { useRef } from "react";
// const isClient = typeof window !== "undefined";
// const defaultWindow = isClient ? window : void 0;

// // function useMouse(options: any = {}) {
// //     const { initialValue = { x: 0, y: 0 } } = options;
// //     const x = useRef(initialValue.x);
// //     const y = useRef(initialValue.y);
// // }

// // export default function useMouseInElement(target?: any, options: any = {}): any {
// //     // TODO: complete perfect type and logic
// //     const elementX = useRef(0);
// //     const elementY = useRef(0);
// //     const elementPositionX = useRef(0);
// //     const elementPositionY = useRef(0);

// //     // Calculate the distance between the current mouse position and the target element
// //     const {
// //         handleOutside = true,
// //         window = defaultWindow
// //     } = options;
// //     if (!target)
// //         return {}
// //     const {
// //         left,
// //         top,
// //         width,
// //         height
// //     } = target.getBoundingClientRect();
// //     if (window) {
// //         const { x, y, } = useMouse(options);
// //         const elX = x.current - elementPositionX.current;
// //         const elY = y.current - elementPositionY.current;
// //         elementX.current = elX;
// //         elementY.current = elY;
// //     }

// //     return { elementX, elementY };
// // }