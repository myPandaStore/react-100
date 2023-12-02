/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2023-11-30 20:05:53
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2023-12-02 16:59:32
 * @FilePath: \my-100\src\app\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */

import Image from 'next/image'
import { Router, Route, } from 'react-router'
import Link from 'next/link'

import { works } from './works'

export default function Home() {
  const workItems = works.map(work =>
    <li className='cursor-pointer' key={work.no}>
      <Link href={work.no}>
        {work.no}{work.name}
      </Link>
    </li>)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>100 days</h1>
      <ul>
        {workItems}
      </ul>
    </main>
  )
}


