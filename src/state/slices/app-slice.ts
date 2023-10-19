import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { POMODORO, modes } from '../../contexts/modes'

export interface CounterState {
  chosenTimer: keyof typeof modes
}

const initialState: CounterState = {
    chosenTimer: POMODORO
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setChosenTimer: (state, action: PayloadAction<keyof typeof modes> ) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.chosenTimer = action.payload
    },
    
  },
})
