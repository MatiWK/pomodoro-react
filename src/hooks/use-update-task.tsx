import { useSetAtom } from "jotai";
import { useCallback } from "react"
import { taskAtom } from "../atoms/tasks-atom";
import { currentlyEditedTaskIdAtom } from "../atoms/currently-edited-task-id";

export const useUpdateTask = () => {
    const setTasks = useSetAtom(taskAtom);
    const setCurrentlyEditedTaskId = useSetAtom(currentlyEditedTaskIdAtom);
    return useCallback((id: number, title: string, note: string) => {
        setTasks((tasks) => {
          const result = tasks.map((task) => {
            console.log({ task, id, title, note });
            return task.id === id ? { ...task, title, note } : task;
          });
          return result;
        });
        setCurrentlyEditedTaskId(null);
      }, [])
}