'use client'
import { useState, useContext } from 'react'
import type { Task } from './page'
import { TasksContext, TasksDispatchContext } from './TaskContext'

export default function TaskList() {
    const tasks = useContext(TasksContext);
    return (
        <ul>
            {tasks.map(task =>
                <li key={task.id} style={{ display: 'flex', marginBottom: '4px' }}>
                    <Task
                        task={task}
                    />
                </li>
            )}
        </ul>
    )
}
function Task({ task }: { task: Task }) {
    const [isEditing, setIsEditing] = useState(false)
    const [text, setText] = useState(task.text)
    const dispatch = useContext(TasksDispatchContext)

    return (
        <>
            <input
                type="checkbox"
                className="mr-2"
                checked={task.done}
                onChange={(e) =>
                    dispatch(
                        {
                            type: 'changed',
                            task: {
                                ...task,
                                done: e.target.checked
                            }
                        }
                    )}
            />

            {isEditing ? <input type="text" onChange={(e) => setText(e.target.value)} /> : <div>{text}</div>}
            <button
                className="ml-2 mr-2 border-2 border-solid rounded bg-slate-500"
                onClick={
                    () => {
                        setIsEditing(!isEditing)
                        dispatch(
                            {
                                type: 'changed',
                                task: {
                                    ...task,
                                    text: text
                                }
                            }
                        )
                    }
                }
            >
                {isEditing ? 'Save' : 'Edit'}
            </button>
            <button
                className="mr-2 border-2 border-solid rounded bg-slate-500"
                onClick={
                    () =>
                        // onTaskDelete(task.id)
                        dispatch(
                            {
                                type: 'deleted',
                                id: task.id
                            }
                        )
                }
            >
                Delete
            </button>

        </>
    )
}