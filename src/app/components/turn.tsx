/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2023-12-22 09:58:50
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2023-12-24 16:16:46
 * @FilePath: \react-100\src\app\components\turn.tsx
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { useState } from 'react'

type TurnType = {
    opt: string,
    options: string[],
    onTurn: () => void,
}
export default function Turn({ opt, options, onTurn }: TurnType) {
    const index = options.indexOf(opt) || 0
    const [idx, setIdx] = useState<number>(index)
    opt = options[idx]
    const [active, setActive] = useState<boolean>(false)
    const [hover, setHover] = useState<boolean>(false)

    function handleClick() {
        setIdx((idx + 1) % options.length)
        setActive(!active)
        onTurn()
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
            {opt}
        </div>
    )
}