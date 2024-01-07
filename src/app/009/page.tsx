/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-01-07 10:39:01
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-01-07 15:16:08
 * @FilePath: \react-100\src\app\009\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'

import { useReducer, useState } from 'react';
import Paper from "../components/paper";
import Note from "../components/note";

type Task = {
    id: number,
    text: string,
    done: boolean,
}

const initialTasks = [
    { id: 0, text: 'Visit Kafka Museum', done: true },
    { id: 1, text: 'Watch a puppet show', done: false },
    { id: 2, text: 'Lennon Wall pic', done: false },
];
type Action = { type: 'added', text: string, id: number } | { type: 'deleted', id: number } | { type: 'edit', id: number, text: string } | { type: 'never' };
function tasksReducer(tasks: Task[], action: Action) {
    switch (action.type) {
        case 'added':
            {
                return [...tasks, { id: tasks.length, text: action.text, done: false }]
            }
        case 'deleted':
            {
                return tasks.filter(task => task.id !== action.id)
            }
        case 'edit':
            {
                return tasks.map(task => (task.id === action.id ? { ...task, text: action.text } : task))
            }
        default:
            {
                throw Error('Unknown action: ' + action.type);
            }
    }
}
export default function App() {
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

    function handleTaskAdd(text: string) {
        dispatch(
            {
                type: 'added',
                text: text,
                id: tasks.length
            }
        )
    }
    function handleTaskDelete(taskId: number) {
        dispatch(
            {
                type: 'deleted',
                id: taskId
            }
        )
    }
    function handleTaskEdit(taskId: number, text: string) {
        dispatch(
            {
                type: 'edit',
                id: taskId,
                text: text
            }
        )
    }


    return (
        <>
            <Paper>
                <div className="centered">
                    <h1>Prague itinerary</h1>
                    <TaskAdd onTaskAdd={handleTaskAdd} />
                    <Tasks tasks={tasks} onTaskDelete={handleTaskDelete} onTaskEdit={handleTaskEdit} />
                </div>
            </Paper>
            <Note>
                <p>useReducer test travel list</p>
            </Note>
        </>
    )
}

type TaskAddProps = {
    onTaskAdd: (text: string) => void
}
function TaskAdd({ onTaskAdd }: TaskAddProps) {
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

type TaskDeleteFn = (id: number) => void
type TaskEditFn = (id: number, text: string) => void
type TasksProp = {
    tasks: Task[],
    onTaskDelete: TaskDeleteFn,
    onTaskEdit: TaskEditFn
}
function Tasks({ tasks, onTaskDelete, onTaskEdit }: TasksProp) {

    return (
        <ul>
            {tasks.map(task =>
                <li key={task.id} style={{ display: 'flex', marginBottom: '4px' }}>
                    <Task
                        task={task}
                        onTaskDelete={onTaskDelete}
                        onTaskEdit={onTaskEdit}
                    />
                </li>
            )}
        </ul>
    )
}

type TaskProp = {
    task: Task,
    onTaskDelete: TaskDeleteFn,
    onTaskEdit: TaskEditFn
}
function Task({ task, onTaskDelete, onTaskEdit }: TaskProp) {
    const [isEditing, setIsEditing] = useState(false)
    const [text, setText] = useState(task.text)

    return (
        <>
            <input type="checkbox" className="mr-2" />
            {isEditing ? <input type="text" onChange={(e) => setText(e.target.value)} /> : <div>{text}</div>}
            <button
                className="ml-2 mr-2 border-2 border-solid rounded bg-slate-500"
                onClick={
                    () => {
                        setIsEditing(!isEditing)
                        onTaskEdit(task.id, text)
                    }
                }
            >
                {isEditing ? 'Save' : 'Edit'}
            </button>
            <button
                className="mr-2 border-2 border-solid rounded bg-slate-500"
                onClick={
                    () =>
                        onTaskDelete(task.id)
                }
            >
                Delete
            </button>

        </>
    )
}

