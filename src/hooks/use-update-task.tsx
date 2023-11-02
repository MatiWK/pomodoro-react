import { useCallback } from "react"
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { currentlyEditedTaskIdSlice } from "../state/slices/currently-edited-task-id-slice";
import { taskSlice } from "../state/slices/task-slice";
import { Task } from "../atoms/tasks-atom";

export const useUpdateTask = () => {
    const dispatch = useAppDispatch();

  const tasks = useAppSelector(state => state.taskSlice.tasks)
    

    return useCallback((id: number, title: string, note: string) => {
      const setCurrentlyEditedTaskId = (x: null) => dispatch(currentlyEditedTaskIdSlice.actions.setCurrentlyEditedTaskId(x))
      const setTasks = (x: Task[]) => dispatch(taskSlice.actions.setTasks(x))
      
      const result = tasks.map((task) => {
        return task.id === id ? { ...task, title, note } : task;
      });
        setTasks(result);
        setCurrentlyEditedTaskId(null);
      }, [tasks, dispatch])
}