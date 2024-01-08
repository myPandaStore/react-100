/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-01-07 10:39:01
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-01-08 21:28:47
 * @FilePath: \react-100\src\app\009\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import Paper from "../components/paper";
import Note from "../components/note";
import AddTask from './AddTask';
import TaskList from './TaskList';
import { TasksProvider } from "./TaskContext";

export type Task = {
    id: number,
    text: string,
    done: boolean,
}

export default function App() {

    return (
        <>
            <Paper>
                <TasksProvider >
                    <div className="centered">
                        <h1>Prague itinerary</h1>
                        <AddTask />
                        <TaskList />
                    </div>
                </TasksProvider>

            </Paper>
            <Note>
                <p>useReducer test travel list</p>
            </Note>
        </>
    )
}









