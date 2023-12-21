"use client"
import { useEffect, useRef, useState } from 'react'
import { Engine, Render, Bodies, World, } from 'matter-js'
import Paper from '../components/paper'
import Toggle from '../components/toggle'
import noop from '../utils/noop'
import initCanvas from '../utils/initCanvas'

const f = {
    run: noop
}
function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const [showHexagon, setShowHexagon] = useState<boolean>(false)

    function handleToggleClick() {

        setShowHexagon(!showHexagon)
    }

    useEffect(() => {
        const { ctx } = initCanvas(canvasRef.current!)

        function drawHexagon(x: number, y: number, size: number) {
            const points: [number, number][] = new Array(6)
                .fill([0, 0])
                .map((_, i) => [
                    x + size * Math.cos(i % 6 * 2 * Math.PI / 6),
                    y + size * Math.sin(i * 2 * Math.PI * 2 / 6)
                ])

            ctx.strokeStyle = '#000000'
            ctx.lineWidth = 1

            if (showHexagon) {
                ctx.beginPath()
                ctx.moveTo(...points[0])
                points.forEach(([x, y]) => ctx.lineTo(x, y))
                ctx.stroke()
            }


        }

        f.run = () => {
            ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height)

            const initX = -1
            const initY = -1
            const size = 30
            drawHexagon(initX, initY, size)
        }
        f.run()
    }, [showHexagon])

    return (
        <>
            <canvas style={{ width: '400px', height: '400px' }} ref={canvasRef} >canvas</canvas>
            <Toggle onToggle={handleToggleClick}>
                <div>hex</div>
            </Toggle>
        </>

    )
}


export default function Hex() {
    return (
        <Paper>
            <Canvas />
        </Paper>
    )
}