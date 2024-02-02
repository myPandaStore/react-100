/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2023-12-15 20:22:11
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-02-02 18:36:27
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
import ClassNames from 'classnames';

export default function Paper({ children }: { children: JSX.Element }) {
    // init work pre next
    const pathname = usePathname();
    const no = pathname.split('/')[1]
    const index = works.findIndex((work) => work.no === no)
    const work = works[index]
    const prev = works[index - 1]
    const next = works[index + 1]

    // check hover
    const [isHovered, setIsHovered] = useState(false);
    const [preHovered, setPreHovered] = useState(false)
    const [nextHovered, setNextHovered] = useState(false)
    function handleMouseEnter() {
        setIsHovered(true);
    }
    function handleMouseLeave() {
        setIsHovered(false);
    }

    function handlePreMouseEnter() {
        setPreHovered(true);
    }
    function handlePreMouseLeave() {
        setPreHovered(false);
    }
    function handleNextMouseEnter() {
        setNextHovered(true);
    }
    function handleNextMouseLeave() {
        setNextHovered(false);
    }

    const bottomNavClass = 'z-10 bottom-nav fixed bottom-0 pl-10 '

    const preClass = ClassNames('pre opacity-0', { 'link': isHovered }, { '!opacity-100': preHovered },)
    const nextClass = ClassNames('next opacity-0', { 'link': isHovered }, { '!opacity-100': nextHovered, })

    useTitle(work ? `${no}. ${work.name}` : '404')

    //TODO full screen


    return (
        <div className="paper w-full" style={{ background: 'white' }}>
            <div className="nav cursor-pointer pl-10">
                <Link href={'/'}>
                    &lt;
                </Link>
            </div>
            <div
                className={bottomNavClass}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                {
                    prev &&
                    <div className={preClass}
                        onMouseEnter={handlePreMouseEnter}
                        onMouseLeave={handlePreMouseLeave}>
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
                    <div className={nextClass}
                        onMouseEnter={handleNextMouseEnter}
                        onMouseLeave={handleNextMouseLeave}>

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