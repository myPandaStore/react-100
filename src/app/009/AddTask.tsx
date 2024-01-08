/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-01-08 20:31:30
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-01-08 21:13:49
 * @FilePath: \react-100\src\app\009\AddTask.tsx
 * @Description:
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import { useState, useContext } from 'react'
import { TasksDispatchContext } from './TaskContext'

let nextId = 3;
export default function AddTask() {
    const [text, setText] = useState('')
    const dispatch = useContext(TasksDispatchContext)

    return (
        <>
            <input type="text" onChange={(e) => setText(e.target.value)} placeholder='Add your task' value={text} />
            <button
                className="ml-2 mr-2 border-2 border-solid rounded bg-slate-500"
                onClick={
                    () => {
                        setText('')
                        dispatch({
                            type: 'added',
                            id: nextId++,
                            text: text,
                        });
                    }
                }
            >
                Add
            </button>
        </>
    )
}