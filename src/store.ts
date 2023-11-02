import { configureStore } from '@reduxjs/toolkit'
import { appSlice } from './state/slices/app-slice'
import { AddClickedSlice } from './state/slices/note-slice'
import { currentlyEditedTaskIdSlice } from './state/slices/currently-edited-task-id-slice'
import { isRunningSlice } from './state/slices/is-running-slice'
import { taskCreationActiveSlice } from './state/slices/task-creation-active-slice'
import { taskSlice } from './state/slices/task-slice'

export const store = configureStore({
  reducer: {
    appSlice: appSlice.reducer,
    AddClickedSlice: AddClickedSlice.reducer,
    currentlyEditedTaskIdSlice: currentlyEditedTaskIdSlice.reducer,
    isRunningSlice: isRunningSlice.reducer,
    taskCreationActiveSlice: taskCreationActiveSlice.reducer,
    taskSlice: taskSlice.reducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch