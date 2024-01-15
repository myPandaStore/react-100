/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-01-14 20:02:12
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-01-15 12:05:21
 * @FilePath: \react-100\src\app\011\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import { useSearchParams } from 'next/navigation'
import { useDeviceOrientation } from '../Hooks'
import Paper from '../components/paper'
import Note from '../components/note'

function clamp(n: number, min: number, max: number) {
    if (n < min)
        return min
    if (n > max)
        return max
    return n
}
export default function Ship() {
    const { alpha, beta, gamma } = useDeviceOrientation()
    const searchParams = useSearchParams()
    const shot = searchParams.get('shot')
    const debug = searchParams.get('debug')

    function getTheta() {
        if (shot) {
            return Math.PI / 2 * 4.55
        }
        if (beta === null || gamma === null) {
            return 0
        }
        const x = clamp(beta, -90, 90) / 90
        const y = clamp(-gamma, -90, 90) / 90
        return Math.atan2(y, x)
    }

    const transformStyle = `rotate(${getTheta()}rad)`
    const debugContent = debug
        ? <div >
            <p>Gamma {gamma}</p>
            <p>Beta {beta}</p>
            <p>Theta {getTheta()}</p>
            <p>Alhpa {alpha}</p>
        </div>
        : null

    return (
        <>
            <Paper>
                <div className="box centered rounded-full text-center flex flex-col justify-center">
                    <div style={{ transform: transformStyle }}>

                        <p>A ship in harbor is safe,<br />but that is not what ships <br />are built for.</p>
                        <br />
                        <em>- John A. Shedd</em>
                    </div>

                </div>
            </Paper>
            <Note>
                {debugContent}
            </Note>
        </>
    )
}