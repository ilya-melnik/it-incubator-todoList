import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType} from "./App";
import {v1} from "uuid";
import AddItemFrom from "./AddItemFrom";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTodoListRemove: (todoListID: string) => void
    removeTask: (taskId: string, todoListID: string) => void
    changeFilter: (valueFilter: FilterValueType, todoListID: string) => void
    changeStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    addTask: (newTaskTitile: string, todoListID: string) => void
    filter: (FilterValueType)

}


export function Todolist(props: PropsType) {

/*

    let [error, setError] = useState<string | null>(null)
    let [title, setTitle] = useState("")
    const ChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

 */
    const addTask = (title: string) => {
       props.addTask(title, props.id)
    }
 /*   const onKeyPreesHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === "Enter") {
            addTask()
        }
    }*/
    const onCLickHandlerAll = () => {
        props.changeFilter("all", props.id)

    }

    const onCLickHandlerActive = () => {
        props.changeFilter("active", props.id)
    }

    const onCLickHandlerCompleted = () => {
        props.changeFilter("completed", props.id)
    }
    const removeTodoList = () => {
        props.removeTodoListRemove(props.id)
    }



    return <div>
        <h3>{props.title}
            <button onClick={removeTodoList}>X</button>
        </h3>
        <AddItemFrom addItem={addTask} />
        {/*<div>
            <input className={""} value={title}
                   onChange={ChangeTitleHandler}
                   onKeyPress={onKeyPreesHandler}/>
            <button onClick={addTask}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>*/}
        <ul>
            {
                props.tasks.map(t => {
                    const onCLickHandler = () => {
                        props.removeTask(t.id, props.id)
                    }
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked
                        props.changeStatus(t.id, newIsDoneValue, props.id)
                    }
                    return <li key={t.id}>
                        <input className={t.isDone ? "is-done" : ""} type={"checkbox"} checked={t.isDone}
                               onChange={onChangeHandler}/>
                        <span>{t.title}</span>
                        <button onClick={onCLickHandler}>x
                        </button>
                    </li>
                })
            }

        </ul>
        <div>
            <button className={props.filter === "all" ? "active-filter" : ""} onClick={onCLickHandlerAll}>All
            </button>
            <button className={props.filter === "active" ? "active-filter" : ""} onClick={onCLickHandlerActive}>Active
            </button>
            <button className={props.filter === "completed" ? "active-filter" + "is-done" : ""}
                    onClick={onCLickHandlerCompleted}>Completed
            </button>
        </div>
    </div>
}

