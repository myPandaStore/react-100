/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-01-08 20:40:57
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-01-17 10:39:20
 * @FilePath: \react-100\src\app\009\TaskContext.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import type { Task } from './page';
import { useImmerReducer } from 'use-immer';
import { createContext } from 'react';
const initialTasks: Task[] = [
    { id: 0, text: 'Visit Kafka Museum', done: true },
    { id: 1, text: 'Watch a puppet show', done: false },
    { id: 2, text: 'Lennon Wall pic', done: false },
];
const initDispatch = () => {}
export const TasksContext = createContext<Task[]>(initialTasks);
export const TasksDispatchContext = createContext<React.Dispatch<Action>>(initDispatch);

type Action = { type: 'added', text: string, id: number } | { type: 'deleted', id: number } | { type: 'changed', task: Task } | { type: 'never' };

export function TasksProvider({ children }: { children: React.ReactNode }) {
    const [tasks, dispatch] = useImmerReducer(tasksReducer, initialTasks);

    return (
        <TasksContext.Provider value={tasks}>
            <TasksDispatchContext.Provider value={dispatch}>
                {children}
            </TasksDispatchContext.Provider>
        </TasksContext.Provider>
    );
}

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