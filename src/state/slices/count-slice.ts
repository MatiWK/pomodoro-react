import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface CounterState {
    count: number
}

const initialState: CounterState = {
    count: 1
}

export const countSlice = createSlice({
    name: "countSlice",
    initialState,
    reducers: {
        setCount: (state, action: PayloadAction<number>) => {
            state.count = action.payload
        }
    }
}) 