import { PropsWithChildren, createContext, useContext } from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { currentlyEditedTaskIdSlice } from "../state/slices/currently-edited-task-id-slice";
import { taskSlice } from "../state/slices/task-slice";
import { Task } from "../atoms/tasks-atom";
type ContextValue = {
  deleteTask: (id: number) => void;
  editTask: (id: number) => void;
};
const TaskContext = createContext<null | ContextValue>(null);
export const TaskProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(state => state.taskSlice.tasks)

  const setTasks = (x: Task[]) => dispatch(taskSlice.actions.setTasks(x))
  
  const setCurrentlyEditedTaskId = (x: null | number) => dispatch(currentlyEditedTaskIdSlice.actions.setCurrentlyEditedTaskId(x))

  function deleteTask(id: number) {
    const updatedTasks = tasks.filter((task) => task.id !== id)
    setTasks(updatedTasks);
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
