import { PropsWithChildren, createContext, useContext, useState } from "react";
type Task = { title: string; note: string; id: number; exist: boolean };
type ContextValue = {
  tasks: Task[];
  deleteTask: (id: number) => void;
  editTask: (id: number) => void;
  clicked: boolean;
  addClicked: boolean;
  setAddClicked: React.Dispatch<React.SetStateAction<boolean>>;
  values: {
    title: string;
    note: string;
  };
  setValues: React.Dispatch<
    React.SetStateAction<{
      title: string;
      note: string;
    }>
  >;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  createTask: () => void;
  cancelCreate: () => void;
  openTaskCreationForm: () => void;
  currentlyEditedTaskId: number | null;
  updateTask: (id: number, title: string, note: string) => void;
};
export const TaskContext = createContext<null | ContextValue>(null);
export const TaskProvider = ({ children }: PropsWithChildren) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskCreationActive, setTaskCreationActive] = useState(false);
  const [addClicked, setAddClicked] = useState(false);
  const [values, setValues] = useState({
    title: "",
    note: "",
  });
  const [currentlyEditedTaskId, setCurrentlyEditedTaskId] = useState<
    null | number
  >(null);

  const openTaskCreationForm = () => {
    setTaskCreationActive(true);
  };

  const closeTaskCreationForm = () => {
    setTaskCreationActive(false);
  };

  function createTasks(title: string, note: string) {
    setTasks((prev) => {
      return [
        ...prev,
        { title: title, note: note, id: Date.now(), exist: true },
      ];
    });
    console.log(tasks);
  }

  function deleteTask(id: number) {
    setTasks(() => tasks.filter((task) => task.id !== id));
  }

  function editTask(id: number) {
    setCurrentlyEditedTaskId(id);
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value, name } = event.target;

    setValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

    // console.log(title, note)
  };
  const { title, note } = values;

  const createTask = () => {
    createTasks(title, note);
    setAddClicked(false);
    setValues({ title: "", note: "" });
    openTaskCreationForm();
  };

  const cancelCreate = () => {
    setAddClicked(false);
    setValues({ title: "", note: "" });
    closeTaskCreationForm();
  };

  const updateTask = (id: number, title: string, note: string) => {
    setTasks((tasks) => {
      const result = tasks.map((task) => {
        console.log({ task, id, title, note });
        return task.id === id ? { ...task, title, note } : task;
      });
      return result;
    });
    setCurrentlyEditedTaskId(null);
  };

  const value: ContextValue = {
    tasks,
    deleteTask,
    editTask,
    clicked: taskCreationActive,
    addClicked,
    setAddClicked,
    values,
    setValues,
    handleChange,
    createTask,
    cancelCreate,
    openTaskCreationForm,
    currentlyEditedTaskId,
    updateTask,
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
