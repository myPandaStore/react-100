'use client'
import { useRef, useEffect, useState } from 'react';
import initCanvas from '../utils/initCanvas'



export default function App() {
    const plumBossom = useRef<HTMLCanvasElement | null>(null);
    const [expX, setExpx] = useState('x + (random() - 0.5) * 8')
    const [expY, setExpY] = useState('y + (random() - 0.5) * 8')

    const f = {
        start: () => { },
        stop: () => { },
    }
    useEffect(() => {
        const canvas = plumBossom.current!;
        const width = 400
        const height = 400
        const { ctx } = initCanvas(canvas, width, height)

        

    }, [expX, expY])

    return (
        <canvas className="centered" ref={plumBossom}>unreproducibles</canvas>
    )
}