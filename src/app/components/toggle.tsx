/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2023-12-21 15:24:47
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2023-12-24 16:17:20
 * @FilePath: \react-100\src\app\components\toggle.tsx
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { useState } from 'react'

export default function Toggle({ children, onToggle }: { children: JSX.Element, onToggle: () => void }) {
    const [active, setActive] = useState<boolean>(false)
    const [hover, setHover] = useState<boolean>(false)

    function handleClick() {
        onToggle()
        setActive(!active)
    }
    function handleMouseEnter() {
        setHover(!hover)
    }
    function handleMouseLeave() {
        setHover(!hover)
    }

    return (
        <div
            style={{ width: '400px', cursor: 'pointer', opacity: active ? 1 : 0.2, textDecoration: hover ? 'underline' : 'none' }}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </div>
    )
}