import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface CounterState {
    taskCreationActive: boolean
}

const initialState: CounterState = {
    taskCreationActive: false
}

export const taskCreationActiveSlice = createSlice({
    name: "taskCreationActive",
    initialState,
    reducers: {
        setTaskCreationActive: (state, action: PayloadAction<boolean>) => {
            state.taskCreationActive = action.payload
        }
    }
})