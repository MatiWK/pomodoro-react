import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface CounterState {
    values: {
        title: string,
        note: string
      }
}

const initialState: CounterState = {
    values: {title: "", note: ""}
}

export const valuesSlice = createSlice({
    name: "valuesSlice",
    initialState,
    reducers: {
        setValues: (state, action: PayloadAction<{
            title: string,
            note: string
          }>) => {
            state.values = action.payload
          }
    }
})