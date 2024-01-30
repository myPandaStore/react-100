/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2023-11-30 20:05:53
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-01-30 09:51:53
 * @FilePath: \react-100\src\app\layout.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import './globals.css'

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '100 days',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='h-screen'>
      {/* <body className={inter.className}>{children}</body> */}
      <body className='h-full flex'>{children}</body>

    </html>
  )
}
