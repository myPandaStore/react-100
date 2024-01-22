'use client'
import { useRef, useEffect, useState, IframeHTMLAttributes, Fragment, useMemo } from 'react';
import initCanvas from '../utils/initCanvas'
import useRafFn from '../Hooks/useRafFn';
import { range } from '../utils';
import Paper from '../components/paper'
import Note from '../components/note';

type RafControlType = {
    resume: () => void;
    pause: () => void;
    active: () => boolean;
}
export default function App() {
    const plum = useRef<HTMLCanvasElement | null>(null);
    const runner = useRef(null);
    const frame = useRef(() => { })
    const rafControl = useRef<RafControlType>({
        resume: () => { },
        pause: () => { },
        active: () => false,
    })
    const stopped = useRef(true)
    const fnX = useRef((t: number, x: number, y: number) => 0)
    const fnY = useRef((t: number, x: number, y: number) => 0)

    const [expX, setExpx] = useState('x + (random() - 0.5) * 2')
    const [expY, setExpY] = useState('y + (random() - 0.5) * 2')

    const f = useMemo(() => ({
        start: () => { },
        stop: () => { },
    }), [])

    const [MathContext, setMathContext] = useState('')
    useEffect(() => {
        setMathContext(`const {${Object.getOwnPropertyNames(Math).join(',')}}=Math`)
    }, [])

    useEffect(() => {
        const canvas = plum.current!;
        const width = 400
        const height = 400
        const { ctx } = initCanvas(canvas, width, height)

        const data = ctx.createImageData(width, height)

        function drawPixel(data: ImageData, x: number, y: number, r: number, g: number, a: number) {
            x = x % width
            y = y % height
            if (x < 0) {
                x += width
            }
            if (y < 0) {
                y += width
            }
            const pixelindex = (y * width + x) * 4
            data.data[pixelindex] = r
            data.data[pixelindex + 1] = g
            data.data[pixelindex + 2] = a
            data.data[pixelindex + 3] = 255
        }

        const cx = width / 2
        const cy = height / 2
        let t = 0
        let ix = cx
        let iy = cy
        function iteration() {
            try {
                t += 1
                const nx = +fnX.current(t, ix, iy)
                const ny = +fnY.current(t, ix, iy)

                const tx = Math.round(cx + nx)
                const ty = Math.round(cy - ny)

                drawPixel(data, tx, ty, 0, 0, 0)

                ix = nx
                iy = ny
            } catch (error) {
                console.log(error)
                stop()
            }
        }

        frame.current = () => {
            try {
                if (!stopped.current) {
                    range(2).forEach(() => {
                        iteration()
                    })
                    ctx.putImageData(data, 0, 0)
                }
            } catch (error) {
                console.log(error)
                stop()
            }
        }

        function clear() {
            for (const x of range(width)) {
                for (const y of range(height)) {
                    drawPixel(data, x, y, 255, 255, 255)
                }
            }
        }
        f.stop = () => {
            stopped.current = true
            rafControl.current.pause()
        }
        f.start = () => {
            t = 0
            ix = 0
            iy = 0
            ctx.strokeStyle = 'black'
            ctx.lineWidth = 1
            clear()
            stopped.current = false
            rafControl.current.resume()
        }

        try {
            // eslint-disable-next-line no-eval
            // @ts-ignore
            fnX.current = runner.current!.contentWindow!.eval(`()=>{
              ${MathContext};
              return (t,x,y) => {
                return ${expX}
              }
            }`)()
            // @ts-ignore
            fnY.current = runner.current!.contentWindow!.eval(`()=>{
              ${MathContext};
              return (t,x,y) => {
                return ${expY}
              }
            }`)()

            f.start()
        }
        catch (e: any) {
            console.log(expX, expY, e.message)
        }

        return () => {
            f.stop()
        }

    }, [expX, expY, f, MathContext])

    rafControl.current = useRafFn(frame.current)

    return (
        <>
            <Paper>
                <div className='centered'>
                    <canvas ref={plum} style={{ border: '1px solid black' }}></canvas>
                    <div className='box-description'>
                        <p>(t,x,y)={'>'}</p>
                        <div>
                            <div>x=</div>
                            <input
                                type="text"
                                className='outline-none'
                                maxLength={32}
                                autoComplete='false'
                                spellCheck='false'
                                value={expX}
                                onChange={(e) => setExpx(e.target.value)}
                            />
                        </div>
                        <div>
                            <div>y=</div>
                            <input
                                type="text"
                                className='outline-none'
                                maxLength={32}
                                autoComplete='false'
                                spellCheck='false'
                                value={expY}
                                onChange={(e) => setExpY(e.target.value)}
                            />
                        </div>
                        <iframe ref={runner} sandbox='allow-same-origin allow-scripts'></iframe>
                    </div>
                </div>
            </Paper>
            <Note></Note>
        </>
    )
}