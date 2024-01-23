/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2023-12-22 09:58:50
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-01-23 15:56:38
 * @FilePath: \react-100\src\app\components\turn.tsx
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import { useState, forwardRef, useImperativeHandle } from 'react'

type TurnType = {
    opt: string | number,
    options: (string | number)[],
    onTurn: () => void,
}
export default forwardRef(function Turn({ opt, options, onTurn }: TurnType, ref: any) {
    const index = options.indexOf(opt) || 0
    const [idx, setIdx] = useState<number>(index)
    opt = options[idx]
    const [active, setActive] = useState<boolean>(false)
    const [hover, setHover] = useState<boolean>(false)

    function handleClick() {
        setIdx((idx + 1) % options.length)
        onTurn()
    }
    function handleMouseEnter() {
        setHover(!hover)
        setActive(!active)
    }
    function handleMouseLeave() {
        setHover(!hover)
        setActive(!active)
    }
    const reset = () => {
        setIdx(0)
    }
    useImperativeHandle(ref, () => ({
        reset
    }), [])

    return (
        <div
            style={{ marginLeft: '-400px', translate: `50%`, cursor: 'pointer', opacity: active ? 1 : 0.2, textDecoration: hover ? 'underline' : 'none' }}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {opt}
        </div>
    )
})