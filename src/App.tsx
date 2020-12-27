import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValueType = "all" | "active" | "completed"

function App() {

    let [tasks, setTask] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "J", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])

    function addTask () {
        let task = {id: v1(), title: "fff", isDone: true}
        let newTask = [task, ...tasks]

        setTask(newTask)
    }

    function removeTask(id: string) {
        let tasks1 = tasks.filter(t => t.id != id)
        setTask(tasks1)
    }


    let [filter, setFilter] = useState<FilterValueType>("all")
    let taskForTodolist = tasks

    if (filter === "active") {
        taskForTodolist = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        taskForTodolist = tasks.filter(t => t.isDone === true)
    }

    function changeFilter(value: FilterValueType) {
        setFilter(value)
    }


    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={taskForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}

            />

        </div>
    );
}

export default App;