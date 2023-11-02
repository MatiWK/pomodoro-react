import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { POMODORO, modes } from "../../contexts/modes";

interface CounterState {
    time: number
}

const initialState: CounterState = {
    time: modes[POMODORO].initialTime
}

export const timeSlice = createSlice({
    name: "timeSlice",
    initialState,
    reducers: {
        setTime: (state, action: PayloadAction<number>) => {
            state.time = action.payload
        }
    }
})