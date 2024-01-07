/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-01-07 10:39:01
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-01-07 16:07:40
 * @FilePath: \react-100\src\app\009\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'

import { useReducer, useState } from 'react';
import { useImmerReducer } from 'use-immer';
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
type Action = { type: 'added', text: string, id: number } | { type: 'deleted', id: number } | { type: 'changed', task: Task } | { type: 'never' };
function tasksReducer(draft: Task[], action: Action) {
    switch (action.type) {
        case 'added':
            {
                draft.push({
                    id: action.id,
                    text: action.text,
                    done: false,
                });
                break;
            }
        case 'deleted':
            {
                return draft.filter(task => task.id !== action.id)
            }
        case 'changed':
            {
                const index = draft.findIndex(task => task.id === action.task.id);
                draft[index] = action.task;
                break
            }
        default:
            {
                throw Error('Unknown action: ' + action.type);
            }
    }
}
export default function App() {
    const [tasks, dispatch] = useImmerReducer(tasksReducer, initialTasks);

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
    function handleTaskChange(task: Task) {
        dispatch(
            {
                type: 'changed',
                task: task,
            }
        )
    }


    return (
        <>
            <Paper>
                <div className="centered">
                    <h1>Prague itinerary</h1>
                    <TaskAdd onTaskAdd={handleTaskAdd} />
                    <Tasks tasks={tasks} onTaskDelete={handleTaskDelete} onTaskChange={handleTaskChange} />
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
            <input type="text" onChange={(e) => setText(e.target.value)} placeholder='Add your task' value={text}/>
            <button
                className="ml-2 mr-2 border-2 border-solid rounded bg-slate-500"
                onClick={
                    () => {
                        setText('')
                        onTaskAdd(text)
                    }
                }
            >
                Add
            </button>
        </>
    )
}

type TaskDeleteFn = (id: number) => void
type TaskChangeFn = (task: Task) => void
type TasksProp = {
    tasks: Task[],
    onTaskDelete: TaskDeleteFn,
    onTaskChange: TaskChangeFn
}
function Tasks({ tasks, onTaskDelete, onTaskChange }: TasksProp) {

    return (
        <ul>
            {tasks.map(task =>
                <li key={task.id} style={{ display: 'flex', marginBottom: '4px' }}>
                    <Task
                        task={task}
                        onTaskDelete={onTaskDelete}
                        onTaskChange={onTaskChange}
                    />
                </li>
            )}
        </ul>
    )
}

type TaskProp = {
    task: Task,
    onTaskDelete: TaskDeleteFn,
    onTaskChange: TaskChangeFn
}
function Task({ task, onTaskDelete, onTaskChange }: TaskProp) {
    const [isEditing, setIsEditing] = useState(false)
    const [text, setText] = useState(task.text)

    return (
        <>
            <input
                type="checkbox"
                className="mr-2"
                checked={task.done}
                onChange={(e) => onTaskChange({ ...task, done: e.target.checked })}
            />

            {isEditing ? <input type="text" onChange={(e) => setText(e.target.value)} /> : <div>{text}</div>}
            <button
                className="ml-2 mr-2 border-2 border-solid rounded bg-slate-500"
                onClick={
                    () => {
                        setIsEditing(!isEditing)
                        onTaskChange({ ...task, text: text })
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

