import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";

export type FilterValueType = "all" | "active" | "completed"
type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}
type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
//BLL
    const todoListID1 = v1()
    const todoListID2 = v1()


    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"},
    ])

    let [tasks, setTask] = useState<TaskStateType>({
            [todoListID1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "J", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false}
            ],
            [todoListID2]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "J", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false}
            ],
        }
    )

    function addTask(newTaskTitile: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: newTaskTitile,
            isDone: false
        }
        tasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTask({...tasks})
    }

    function removeTask(taskID: string, todoListID: string) {
        let todoListTask = tasks[todoListID]

        tasks[todoListID] = todoListTask.filter(task => task.id !== taskID)
        setTask({...tasks})
    }




    function changeFilter(valueFilter: FilterValueType, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = valueFilter
            setTodoLists([...todoLists])

        }
    }


    function changeStatus(taskId: string, isDone: boolean, todoListID: string) {
        const todoListTask = tasks[todoListID]
        let task = todoListTask.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTask({...tasks})
    }

    function  removeTodoListRemove(todoListID: string){
        setTodoLists( todoLists.filter( tl => tl.id !== todoListID ) )
        delete tasks[todoListID]
    }
    return (
        <div className="App">
            {
                todoLists.map(tl => {
                    let tasksForTodoList = tasks[tl.id]
                    if(tl.filter === "active"){
                        tasksForTodoList = tasks[tl.id].filter(t => t.isDone === false)
                    }
                    if(tl.filter === "completed"){
                        tasksForTodoList = tasks[tl.id].filter(t => t.isDone === true)
                    }

                    return (
                        <Todolist
                            key={tl.id}
                            id={tl.id}
                            filter={tl.filter}
                            title="What to learn"
                            tasks={tasksForTodoList}
                            removeTodoListRemove={removeTodoListRemove}
                            addTask={addTask}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            changeStatus={changeStatus}


                        />)
                })
            }


        </div>
    );
}

export default App;