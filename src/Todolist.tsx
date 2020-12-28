import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
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
    const onKeyPreesHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }
    const onCLickHandlerAll = () => {
        props.changeFilter("all")
    }

    const onCLickHandlerActive = () => {
        props.changeFilter("active")
    }

    const onCLickHandlerCompleted = () => {
        props.changeFilter("completed")
    }
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={ChangeTitleHandler} onKeyPress={onKeyPreesHandler}/>
            <button onClick={addTask}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onCLickHandler = () => {
                        props.removeTask(t.id)
                    }
                    return <li key={t.id}>
                        <input type={"checkbox"} checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onCLickHandler}>x
                        </button>
                    </li>
                })
                }

                </ul>
                <div>
                <button onClick={onCLickHandlerAll}>All
                </button>
                <button onClick={onCLickHandlerActive}>Active
                </button>
                <button onClick={onCLickHandlerCompleted}>Completed
                </button>
                </div>
                </div>
            }

