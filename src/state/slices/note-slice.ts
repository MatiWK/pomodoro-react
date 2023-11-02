import { PayloadAction, createSlice } from "@reduxjs/toolkit"


export interface CounterState {
    addClicked: boolean
}

const initialState: CounterState = {
    addClicked: false
}

export const AddClickedSlice = createSlice({
    name: 'addNote',
    initialState,
    reducers: {
        setAddClicked: (state, action: PalyoadAction<boolean>) => {
            state.addClicked = action.payload
        }
    }
})