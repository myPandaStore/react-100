"use client"
import { useEffect, useRef, useState, } from 'react'
import Paper from '../components/paper'
import Toggle from '../components/toggle'
import Turn from '../components/turn'
import noop from '../utils/noop'
import initCanvas from '../utils/initCanvas'
import { pick, get, r60, r30 } from '../utils/vector'
import type { Vector } from '../utils/vector'
import { range, shuffle } from '../utils'

const f = {
    run: noop
}
function Canvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const [showHexagon, setShowHexagon] = useState<boolean>(false)
    const patterns = ['*?', 'p0', 'p1', 'p2', 'p3']
    const [mode, setMode] = useState<string>(pick(patterns))

    function handleToggleClick() {
        setShowHexagon(!showHexagon)
    }
    function handleTurnClick() {
        const next = (patterns.indexOf(mode) + 1) % patterns.length
        setMode(patterns[next])
    }

    useEffect(() => {
        const canvas = canvasRef.current!
        const { ctx } = initCanvas(canvas)
        const SQRT_3 = Math.sqrt(3)

        function drawHexagon(x: number, y: number, size: number) {
            const points: [number, number][] = new Array(6)
                .fill(0)
                .map((_, i) => [
                    x + size * Math.cos(i % 6 * 2 * Math.PI / 6),
                    y + size * Math.sin(i * 2 * Math.PI / 6),
                ])
            const midPoints: [number, number][] = points
                .map((_, i) => {
                    const [x1, y1] = points[i]
                    const [x2, y2] = points[(i + 1) % 6]
                    return [(x1 + x2) / 2, (y1 + y2) / 2]
                })

            ctx.strokeStyle = '#000000'
            ctx.lineWidth = 1

            // draw hexagon
            if (showHexagon) {
                ctx.beginPath()
                ctx.moveTo(...points[0])
                points.forEach(([x, y]) => ctx.lineTo(x, y))
                ctx.stroke()
            }

            // draw arc according to different mode
            function drawArc1(offset: number) {
                ctx.beginPath()
                ctx.arc(...get(points, offset), size / 2, r60 * (2 + offset), r60 * (4 + offset))
                ctx.stroke()
            }
            function drawArc2(offset: number) {
                const point: Vector = [
                    x + size * Math.cos(offset * r60 + r30) * SQRT_3,
                    y + size * Math.sin(offset * r60 + r30) * SQRT_3,
                ]

                ctx.beginPath()
                // void ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
                ctx.arc(...point, size * 1.5, r60 * (offset + 3), r60 * (offset + 4))
                ctx.stroke()
            }
            function drawLineThrough(offset: number) {
                ctx.beginPath()
                ctx.moveTo(...get(midPoints, offset))
                ctx.lineTo(...get(midPoints, offset + 3))
                ctx.stroke()
            }

            const _mode = mode === '*?'
                ? pick(patterns.slice(1))
                : mode
            const offset = Math.round(Math.random() * 5)

            switch (_mode) {
                case 'p1':
                    drawArc1(offset)
                    drawArc1(offset + 3)
                    drawLineThrough(offset + 1)
                    break
                case 'p2':
                    drawArc2(offset)
                    drawArc2(offset + 1)
                    drawArc1(offset + 4)
                    break
                case 'p3':
                    drawArc2(offset + 2)
                    drawArc2(offset + 5)
                    drawLineThrough(offset + 5)
                    break
                default:
                    const shuffled = shuffle(range(6))

                    for (let i = 0; i < 3; i++) {
                        const a = shuffled[i * 2]
                        const b = shuffled[i * 2 + 1]
                        ctx.beginPath()
                        ctx.moveTo(...midPoints[a])
                        ctx.lineTo(...midPoints[b])
                        ctx.stroke()
                    }
            }


        }

        f.run = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            const initX = -1
            const size = 30
            const initY = 18 - size * SQRT_3
            for (let x = 0; x < 5; x++) {
                for (let y = 0; y < 20; y++) {

                    const xOffset = (y % 2) ? size * 1.5 : 0
                    drawHexagon(
                        initX + x * size * 3 + xOffset,
                        initY + y * size * SQRT_3 * 0.5,
                        size
                    )
                }
            }
        }
        f.run()
        console.log(mode)
        return () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }, [mode, showHexagon])

    return (
        <>
            <canvas
                style={{ width: '400px', height: '400px' }}
                ref={canvasRef}
                onClick={f.run} />
            <Turn onTurn={handleTurnClick} opt={patterns[0]} options={patterns} />
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