import { createContext, useContext, useState } from "react";

// export const Taskss = React.createContext();
// export const TasksProvider = ({ children }) => {
//   const [tasks, setTasks] = useState([]);
//   return (
//     <Taskss.Provider value={[tasks, setTasks]}>{children}</Taskss.Provider>
//   );
// };

// export const Clicked = React.createContext();
// export const ClickedProvider = ({ children }) => {
//   const [clicked, setClicked] = useState(false);

//   return (
//     <Clicked.Provider value={[clicked, setClicked]}>
//       {children}
//     </Clicked.Provider>
//   );
// };

// export const ClickedAddNote = React.createContext();
// export const ClickedAddNoteProvider = ({ children }) => {
//   const [clicked, setClicked] = useState(false);

//   return (
//     <ClickedAddNote.Provider value={[clicked, setClicked]}>
//       {children}
//     </ClickedAddNote.Provider>
//   );
// };
// export const Value = React.createContext();
// export const ValueProvider = ({ children }) => {
//   const [values, setValues] = useState({
//     title: "",
//     note: "",
//   });

//   return (
//     <Value.Provider value={[values, setValues]}>{children}</Value.Provider>
//   );
// };

export const TaskContext = createContext(null);
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [addClicked, setAddClicked] = useState(false);
  const [values, setValues] = useState({
    title: "",
    note: "",
  });

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

  const value = {
    tasks,
    createTasks,
    deleteitem,
    editTask,
    clicked,
    setClicked,
    addClicked,
    setAddClicked,
    values,
    setValues,
    handleChange,
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
