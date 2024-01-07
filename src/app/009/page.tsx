/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-01-07 10:39:01
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-01-07 11:35:46
 * @FilePath: \react-100\src\app\009\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'

import { useState } from "react";
import Paper from "../components/paper";
import Note from "../components/note";

const initialTasks = [
    { id: 0, text: 'Visit Kafka Museum', done: true },
    { id: 1, text: 'Watch a puppet show', done: false },
    { id: 2, text: 'Lennon Wall pic', done: false },
];
type Task = {
    id: number,
    text: string,
    done: boolean,
}

export default function App() {
    const [tasks, setTasks] = useState<Task[]>(initialTasks)

    function handleTaskAdd(text: string) {
        setTasks([...tasks, { id: tasks.length, text: text, done: false }])
    }

    return (
        <>
            <Paper>
                <div className="centered">
                    <h1>Prague itinerary</h1>
                    <TaskAdd tasks={tasks} onTaskAdd={handleTaskAdd} />
                    <TravelList tasks={tasks} />
                </div>
            </Paper>
            <Note>
                <p>useReducer test travel list</p>
            </Note>
        </>
    )
}

type TaskAddProps = {
    tasks: Task[],
    onTaskAdd: (text: string) => any
}
function TaskAdd({ tasks, onTaskAdd }: TaskAddProps) {
    const [text, setText] = useState('')

    return (
        <>
            <input type="text" onChange={(e) => setText(e.target.value)} />
            <button
                className="ml-2 mr-2 border-2 border-solid rounded bg-slate-500"
                onClick={
                    () =>
                        onTaskAdd(text)
                }
            >
                Add
            </button>
        </>
    )
}

function TravelList({ tasks }: { tasks: Task[] }) {
    return (
        <ul>
            {tasks.map(task =>
                <li key={task.id}>
                    <input type="checkbox" className="mr-2" />
                    {task.text}
                    <button className="ml-2 mr-2 border-2 border-solid rounded bg-slate-500">Edit</button>
                    <button className="mr-2 border-2 border-solid rounded bg-slate-500">Delete</button>

                </li>
            )}
        </ul>
    )
}