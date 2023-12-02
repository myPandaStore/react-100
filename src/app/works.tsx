/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2023-12-02 15:37:03
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2023-12-02 15:45:52
 * @FilePath: \my-100\src\app\works.tsx
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
export const info = [
    {
      name: 'Draft',
      date: '11/01',
      draft: true,
    },
    {
      name: 'Draft',
      date: '11/01',
      draft: true,
    },
  ]
  
  export const works = info.map((info, idx) => {
    return {
      ...info,
      no: `${idx + 1}`.padStart(3, '0'),
    }
  })
  