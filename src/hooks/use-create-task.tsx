import { useSetAtom } from "jotai";
import { useCallback } from "react"
import { taskAtom } from "../atoms/tasks-atom";

export const useCreateTask = () => {
  const setTasks = useSetAtom(taskAtom)
    
    return useCallback((title: string, note: string) => {
        setTasks((prev) => {
          return [
            ...prev,
            { title: title, note: note, id: Date.now(), exist: true },
          ];
        });
      }, [setTasks])
} 