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
        }
    }
})
