import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface CounterState {
    isRunning: boolean
}

const initialState: CounterState = {
    isRunning: false
}

export const isRunningSlice = createSlice({
    name: "isRunning",
    initialState,
    reducers: {
        setIsRunning: (state, action: PayloadAction<boolean>) => {
            state.isRunning = action.payload
        }
    }
})