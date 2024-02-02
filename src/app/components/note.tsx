/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-01-18 09:52:05
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-02-02 18:01:15
 * @FilePath: \react-100\src\app\components\note.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import { usePathname } from 'next/navigation';
import { useState } from 'react'
import classNames from 'classnames';

export default function Note({ children = null }: { children?: JSX.Element | null }): JSX.Element {
    const pathname = usePathname();
    const no = pathname.split('/')[1]
    const link = 'https://github.com/myPandaStore/react-100/tree/master/src/app/' + no + '/page.tsx'
    const [active, setActive] = useState<boolean>(false)
    const base = 'content fixed left-1/2 max-w-screen-md'
    const activeClass = 'pointer-events-auto -translate-x-1/2 translate-y-0'
    const nonActiveClass = 'pointer-events-none -translate-x-1/2 translate-y-full'
    const contentClass = classNames(base, active ? activeClass : nonActiveClass)

    return (
        <div className="note ">
            <div
                style={{ width: '400px', minHeight: '100px' }}
                className={contentClass}>
                {children}
                <br />
                <a
                    href={link}
                    style={{ fontSize: 'unset' }}
                    className="link">
                    source
                </a>
            </div>
            <div
                className="handle cursor-pointer fixed bottom-0 right-1/2 translate-x-1/2"
                onClick={() => setActive(!active)}
            >i
            </div>
        </div>
    )
}