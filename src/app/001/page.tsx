/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2023-12-02 16:56:08
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2023-12-03 15:17:18
 * @FilePath: \my-100\src\app\001\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
'use client'

import { useState } from "react";

function Square({ value, onSquareClick }: { value: any, onSquareClick: () => void }) {

    return (
        <button
            onClick={onSquareClick}
            className="flex justify-center items-center w-20 h-20 m-2 p-2 border-2 border-red-500">
            {value}
        </button>
    )
}

function calculateWinner(squares: null[] | String[]) {
    if (!squares) {
        return
    }

    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
    }
    return null
}


function Board({ xIsNext, squares, onPlay }: { xIsNext: boolean, squares: null[] | String[], onPlay: (squares: any[]) => void }) {
    function handleClick(i: number) {
        if (calculateWinner(squares) || squares[i])
            return
        const nextSquares = [...squares]
        xIsNext ? nextSquares[i] = 'X' : nextSquares[i] = 'O'
        onPlay(nextSquares)
    }

    const winner = calculateWinner(squares);
    let status;
    winner ? 
        status = "Winner: " + winner
         : status = "Next player: " + (xIsNext ? "X" : "O");

    return (
        <div className="w-1/2 h-1/2 m-auto">
            <div className="">{status}</div>
            <div className="grid grid-cols-3 gap-4 w-1/2 h-1/2 m-auto">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
                <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
                <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
        </div>

    );
}

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)])
    const [currentMove, setCurrentMove] = useState(0)
    const currentSquares = history[currentMove];
    const xIsNext = currentMove % 2 === 0

    function handlePlay(nextSquares: any) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory)
        setCurrentMove(nextHistory.length - 1)
    }

    function jumpTo(nextMove: any): void {
        setCurrentMove(nextMove)
    }

    const moves = history.map((squares, move) => {
        let description
        if (!!history && move > 0) {
            description = `Go to Move #` + move
        } else {
            description = `Go to Start`
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        )
    })

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
            <ol>
                {moves}
            </ol>
        </div>
    )
}