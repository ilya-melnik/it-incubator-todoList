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
    changeStatus: (taskId: string, isDone: boolean) => void
    addTask: (title: string) => void

}

export function Todolist(props: PropsType) {

let [error, setError] = useState <string | null>(null)
    let [title, setTitle] = useState("")
    const ChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addTask = () => {
        if(title.trim() !== "") {
            props.addTask(title)
            setTitle("")
        } else {
            setError("Title is required")
        }
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
            <input className={""} value={title} onChange={ChangeTitleHandler} onKeyPress={onKeyPreesHandler}/>
            <button onClick={addTask}>+</button>
            { error && <div className={"error-message"}>{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onCLickHandler = () => {
                        props.removeTask(t.id)
                    }
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeStatus(t.id, newIsDoneValue)
                    }
                    return <li key={t.id}>
                        <input type={"checkbox"} checked={t.isDone}
                               onChange={onChangeHandler}/>
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

