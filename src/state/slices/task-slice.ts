import { Task } from "../../atoms/tasks-atom";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// export interface CounterState {
//     tasks: { title: string; note: string; id: number; exist: boolean }[]
// }

export interface CounterState {
    tasks: Task[]
}

const initialState: CounterState = {
    tasks: []
}

export const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<Task[]>)=> {
            state.tasks = action.payload
        },
        createTask: (state, action: PayloadAction<Pick<Task,'title' | 'note'>>) => {
            state.tasks.push({
                id: Date.now(),
                title: action.payload.title,
                note: action.payload.note,
                exist: true
            })
        },
        deleteTask: (state, action: PayloadAction<Pick<Task, 'id'>>) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload.id)
        },
        updateTask: (state, action: PayloadAction<Pick<Task, 'id' | 'title' | 'note'>>) => {
            state.tasks = state.tasks.map((task) => {
                return task.id === action.payload.id ? {
                     ...task,
                      title: action.payload.title,
                      note: action.payload.note 
                    } : task;
              })
              
        }
    }
})
