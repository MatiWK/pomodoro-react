import { useCallback } from "react"
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { taskSlice } from "../state/slices/task-slice";
import { Task } from "../atoms/tasks-atom";

export const useCreateTask = () => {
  const dispatch = useAppDispatch();

  const tasks = useAppSelector(state => state.taskSlice.tasks)
  
    
    return useCallback((title: string, note: string) => {
    const setTasks = (x: Task[]) => dispatch(taskSlice.actions.setTasks(x))

        const updatedTasks = [
          ...tasks,
          { title: title, note: note, id: Date.now(), exist: true },
        ];
        setTasks(updatedTasks);
      }, [dispatch, tasks])
} 