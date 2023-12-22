"use client"
import { useEffect, useRef, useState } from 'react'
import { Engine, Render, Bodies, World, } from 'matter-js'
import Paper from '../components/paper'
import Toggle from '../components/toggle'
import Turn from '../components/turn'
import noop from '../utils/noop'
import initCanvas from '../utils/initCanvas'

const f = {
    run: noop
}
function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const [showHexagon, setShowHexagon] = useState<boolean>(false)
    const patterns = ['*?', 'p0', 'p1', 'p2', 'p3']

    function handleToggleClick() {

        setShowHexagon(!showHexagon)
    }

    function handleTurn() {

    }

    useEffect(() => {
        const canvas = canvasRef.current!
        const { ctx } = initCanvas(canvas)
        const SQRT_3 = Math.sqrt(3)

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
            // debugger
        }

        f.run = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            const initX = -1
            const size = 30
            const initY = 18 - size * SQRT_3
            for (let x = 0; x < 5; x++) {
                for (let y = 0; y < 20; y++) {
                    const xOffset = (y % 2) ? size * 1.5 : 0
                    // const xOffset = 0
                    drawHexagon(
                        initX + x * size * 3 + xOffset,
                        initY + y * size * SQRT_3 * 0.5,
                        size
                    )
                }
            }
        }
        f.run()
    }, [showHexagon])

    return (
        <>
            <canvas
                style={{ width: '400px', height: '400px' }}
                ref={canvasRef}
                onClick={f.run} />
            <Turn opt={patterns[0]} options={patterns} />
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