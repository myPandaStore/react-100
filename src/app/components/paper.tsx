/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2023-12-15 20:22:11
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2023-12-24 16:12:33
 * @FilePath: \react-100\src\app\components\paper.tsx
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */

'use client'
import Link from 'next/link'
import { works } from '../works'
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useTitle, } from '../Hooks/index';

export default function Paper({ children }: { children: JSX.Element }) {
    // init work pre next
    const pathname = usePathname();
    const no = pathname.split('/')[1]
    const index = works.findIndex((work) => work.no === no)
    const work = works[index]
    const prev = works[index - 1]
    const next = works[index + 1]
    // const { slot } = props

    // check hover
    const [isHovered, setIsHovered] = useState(false);
    function handleMouseEnter() {
        setIsHovered(true);
    }
    function handleMouseLeave() {
        setIsHovered(false);
    }
    let computedBottomNavClass = 'bottom-nav fixed bottom-0 pl-10 '
    const computedPrevAndNextClass = isHovered ?
        'opacity-1 mt-0'
        :
        'opacity-0 -mt-6 block transition-all ease-in-out delay-150'

    // change title according to different sub project
    useTitle(work ? `${no}. ${work.name}` : '404')

    //TODO full screen


    return (
        <div className="paper w-full">
            <div className="nav cursor-pointer pl-10">
                <Link href={'/'}>
                    &lt;
                </Link>
            </div>
            <div
                className={computedBottomNavClass}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {
                    prev &&
                    <div className={computedPrevAndNextClass}>
                        <Link href={prev.no}>
                            <span>{prev.name}</span>
                            <span>{prev.no}</span>
                        </Link>
                    </div>

                }
                <div className="current cursor-pointer">
                    <span>{work.name}</span>
                    <span>{work.no}</span>
                </div>
                {
                    next &&
                    <div className={computedPrevAndNextClass}>
                        <Link href={next.no}>
                            <span>{next.name}</span>
                            <span>{next.no}</span>

                        </Link>
                    </div>

                }
                <span className='opacity-20'>{work.date}</span>
            </div>
            <div >
                {children}
            </div>
        </div>
    )
}