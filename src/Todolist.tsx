import React, {ChangeEvent, useState} from 'react';
import {FilterValueType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (title: string) => void

}

export function Todolist(props: PropsType) {


    let [title, setTitle] = useState("")
    const ChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addTask = () => {
        props.addTask(title)
        setTitle("")
    }
debugger

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={ChangeTitleHandler} onKeyPress={(e) => {
                if (e.key === "Enter") {addTask()} }}/>
                <button onClick={addTask}>+</button>
                </div>
                <ul>
            {
                props.tasks.map(t => <li key={t.id}>
                <input type={"checkbox"} checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => {
                props.removeTask(t.id)
            }}>x
                </button>
                </li>)
            }

                </ul>
                <div>
                <button onClick={() => {
                props.changeFilter("all")
            }}>All
                </button>
                <button onClick={() => {
                props.changeFilter("active")
            }}>Active
                </button>
                <button onClick={() => {
                props.changeFilter("completed")
            }}>Completed
                </button>
                </div>
                </div>
            }

