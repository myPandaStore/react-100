/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2023-11-30 20:05:53
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2023-12-25 19:35:01
 * @FilePath: \react-100\src\app\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */

import Link from 'next/link'
import { works } from './works'

export default function Home() {
  const workItems = works.map(work =>
    <li className='cursor-pointer' key={work.no}>
      <Link href={work.no} className='link mr-4 block'>
        <span>
          {work.no}
        </span>
        <b>
          {work.name}
        </b>
      </Link>
    </li>)
  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-between p-24">
      <h1 className='font-mono text-3xl font-bold mb-4'>100 days</h1>
      <ul>
        {workItems}
      </ul>
    </main>
  )
}


