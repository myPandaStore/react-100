/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2023-12-11 17:46:01
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2023-12-11 17:47:17
 * @FilePath: \my-100\src\app\003\sum.test.tsx
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
// sum.test.js
import { expect, test } from 'vitest'
import { sum } from './sum'

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
})