/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2023-12-21 15:24:47
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2023-12-24 17:04:11
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
    
    }
    function handleMouseEnter() {
        setHover(!hover)
        setActive(!active)
    }
    function handleMouseLeave() {
        setHover(!hover)
        setActive(!active)
    }

    return (
        <div
            style={{ marginLeft: '-400px', translate: `50%`, cursor: 'pointer', opacity: active ? 1 : 0.2, textDecoration: hover ? 'underline' : 'none' }}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </div>
    )
}