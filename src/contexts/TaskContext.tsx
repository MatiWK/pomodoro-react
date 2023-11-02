import { useSetAtom } from "jotai";
import { PropsWithChildren, createContext, useContext } from "react";
import { taskAtom } from "../atoms/tasks-atom";
import { useAppDispatch } from "../state/hooks";
import { currentlyEditedTaskIdSlice } from "../state/slices/currently-edited-task-id-slice";
type ContextValue = {
  deleteTask: (id: number) => void;
  editTask: (id: number) => void;
};
const TaskContext = createContext<null | ContextValue>(null);
export const TaskProvider = ({ children }: PropsWithChildren) => {
  const setTasks = useSetAtom(taskAtom)
  
  const dispatch = useAppDispatch();
  const setCurrentlyEditedTaskId = (x: null | number) => dispatch(currentlyEditedTaskIdSlice.actions.setCurrentlyEditedTaskId(x))

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
