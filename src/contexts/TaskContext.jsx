import { createContext, useContext, useState } from "react";

export const TaskContext = createContext(null);
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [taskCreationActive, setTaskCreationActive] = useState(false);
  const [addClicked, setAddClicked] = useState(false);
  const [values, setValues] = useState({
    title: "",
    note: "",
  });

  const openTaskCreationForm = () => {
    setTaskCreationActive(true)
  }

  const closeTaskCreationForm = () => {
    setTaskCreationActive(false)
  }

  function createTasks(title, note) {
    setTasks((prev) => {
      return [...prev, { title: title, note: note, exist: true }];
    });
    console.log(tasks);
  }

  function deleteitem(id) {
    setTasks(() => tasks.filter((task, index) => index !== id));
  }

  function editTask(id) {
    setTasks(() =>
      tasks.filter((task, index) => {
        // setEditing(true);
        return index !== id;
      })
    );
  }

  function handleChange(event) {
    const { value, name } = event.target;

    setValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

    // console.log(title, note)
  }
  const { title, note } = values;

  const createTask = () => {
    createTasks(title, note);
    setAddClicked(false);
    setValues({ title: "", note: "" });
    openTaskCreationForm()
  };

  const cancelCreate = () => {
    setAddClicked(false);
    setValues({ title: "", note: "" });
    closeTaskCreationForm()
  };

  const value = {
    tasks,
    deleteitem,
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
