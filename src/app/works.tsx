/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2023-12-02 15:37:03
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-01-05 10:53:54
 * @FilePath: \react-100\src\app\works.tsx
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
export const info = [
  {
    name: 'Tic-Tac-Toe',
    date: '12/02',
    draft: true,
  },
  {
    name: 'react-thinking',
    date: '12/03',
    draft: true,
  },
  {
    name: 'Mass',
    date: '12/12',
    draft: true,
  },
  {
    name: 'Hex',
    date: '12/21',
    draft: true,
  },
  {
    name: 'WaveBox',
    date: '12/27',
    draft: true,
  },
  {
    name: 'DragBox',
    date: '12/28',
    draft: true,
  },
  {
    name: 'Polar',
    date: '1/5',
    draft: true,
  }, {
    name: 'useWatch-test',
    date: '1/5',
    draft: true,
  }
]

export const works = info.map((info, idx) => {
  return {
    ...info,
    no: `${idx + 1}`.padStart(3, '0'),
  }
})
