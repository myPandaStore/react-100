/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2023-12-21 11:32:22
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-01-22 10:59:36
 * @FilePath: \react-100\src\app\utils\initCanvas.tsx
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
export default function initCanvas(canvas: HTMLCanvasElement, width = 400, height = 400, _dpi?: number): { ctx: CanvasRenderingContext2D, dpi: number, remove: () => void } {
  const ctx = canvas.getContext('2d')!

  const dpr = window.devicePixelRatio || 1
  // @ts-expect-error
  const bsr = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1

  const dpi = _dpi || dpr / bsr

  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  // canvas.width = dpi * width
  // canvas.height = dpi * height
  canvas.width = width
  canvas.height = height
  ctx.scale(dpi, dpi)

  const remove = () => {
    canvas.remove()
  }

  return { ctx, dpi, remove }
}