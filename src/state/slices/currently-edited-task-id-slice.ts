import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface CounterState {
    currentlyEditedTaskId: null | number
}

const initialState: CounterState = {
    currentlyEditedTaskId: null
}

export const currentlyEditedTaskIdSlice = createSlice({
    name: "currentlyEditedTaskId",
    initialState,
    reducers: {
        setCurrentlyEditedTaskId: (state, action: PayloadAction<null | number>) => {
            state.currentlyEditedTaskId = action.payload
        }
    }
})