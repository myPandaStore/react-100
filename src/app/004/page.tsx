"use client"
import { useEffect, useRef } from 'react'
import { Engine, Render, Bodies, World, } from 'matter-js'
import Paper from '../components/paper'
import noop from '../utils/noop'
import initCanvas from '../utils/initCanvas'

const f = {
    run: noop
}
function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        const { ctx } = initCanvas(canvasRef.current!)

        f.run()
    }, [])

    return (
        <canvas style={{ width: '400px', height: '400px' }} ref={canvasRef} >canvas</canvas>
    )
}

export default function Hex() {
    return (
        <Paper>
            <Canvas />
        </Paper>
    )
}