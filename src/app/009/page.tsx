/*
 * @Author: luckin 1832114807@qq.com
 * @Date: 2024-01-07 10:39:01
 * @LastEditors: luckin 1832114807@qq.com
 * @LastEditTime: 2024-01-21 20:53:30
 * @FilePath: \react-100\src\app\009\page.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved. 
 */
'use client'
import { Profiler } from "react";
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

    function onRender(id: string, phase: string, actualDuration: number, baseDuration: number, startTime: number, commitTime: number) { 
        console.log(id, phase, actualDuration, baseDuration, startTime, commitTime);
    }   

    return (
        <>
            <Paper>
                <Profiler id="TasksProvider" onRender={onRender}>

                    <TasksProvider >
                        <div className="centered">
                            <h1>Prague itinerary</h1>
                            <AddTask />
                            <TaskList />
                        </div>
                    </TasksProvider>
                </Profiler>

            </Paper>
            <Note>
                <p>useReducer test travel list</p>
            </Note>
        </>
    )
}









