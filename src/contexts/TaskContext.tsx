import { useAtom, useSetAtom } from "jotai";
import { PropsWithChildren, createContext, useContext } from "react";
import { valuesAtom } from "../atoms/values-atom";
import { taskAtom } from "../atoms/tasks-atom";
import { currentlyEditedTaskIdAtom } from "../atoms/currently-edited-task-id";
type ContextValue = {
  deleteTask: (id: number) => void;
  editTask: (id: number) => void;
};
const TaskContext = createContext<null | ContextValue>(null);
export const TaskProvider = ({ children }: PropsWithChildren) => {
  const setTasks = useSetAtom(taskAtom)
  
  const setCurrentlyEditedTaskId = useSetAtom(currentlyEditedTaskIdAtom);

  function deleteTask(id: number) {
    setTasks((tasks) => tasks.filter((task) => task.id !== id));
  }

  function editTask(id: number) {
    setCurrentlyEditedTaskId(id);
  }

  const value: ContextValue = {
    deleteTask,
    editTask,
  };

  

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
// eslint-disable-next-line react-refresh/only-export-components
export const useTask = () => {
  const value = useContext(TaskContext);
  if (value === null) {
    throw new Error(`missing task provider`);
  }
  return value;
};
