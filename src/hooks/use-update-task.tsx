import { useSetAtom } from "jotai";
import { useCallback } from "react"
import { taskAtom } from "../atoms/tasks-atom";
import { useAppDispatch } from "../state/hooks";
import { currentlyEditedTaskIdSlice } from "../state/slices/currently-edited-task-id-slice";

export const useUpdateTask = () => {
    const setTasks = useSetAtom(taskAtom);
    const dispatch = useAppDispatch();

    return useCallback((id: number, title: string, note: string) => {
    const setCurrentlyEditedTaskId = (x: null) => dispatch(currentlyEditedTaskIdSlice.actions.setCurrentlyEditedTaskId(x))

        setTasks((tasks) => {
          const result = tasks.map((task) => {
            return task.id === id ? { ...task, title, note } : task;
          });
          return result;
        });
        setCurrentlyEditedTaskId(null);
      }, [ setTasks, dispatch])
}