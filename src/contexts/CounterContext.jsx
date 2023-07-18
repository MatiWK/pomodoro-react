import React, { useState } from "react";

export const Context = React.createContext(10);
export const CounterProvider = ({ children }) => {
  return <Context.Provider value={40}>{children}</Context.Provider>;
};

export const Background = React.createContext();
export const BackgroundProvider = ({ children }) => {
  const [backgroundColor, setbackgroundColor] = useState("background-pomodoro");

  return (
    <Background.Provider value={[backgroundColor, setbackgroundColor]}>
      {children}
    </Background.Provider>
  );
};

export const TaskColor = React.createContext();
export const TaskColorProvider = ({ children }) => {
  const [taskColor, setTaskColor] = useState("taskbox-pomodoro");

  return (
    <TaskColor.Provider value={[taskColor, setTaskColor]}>
      {children}
    </TaskColor.Provider>
  );
};

export const Running = React.createContext();
export const RunningProvider = ({ children }) => {
  const [running, isRunning] = useState(true);

  return (
    <Running.Provider value={[running, isRunning]}>{children}</Running.Provider>
  );
};

export const Clicked = React.createContext();
export const ClickedProvider = ({ children }) => {
  const [clicked, setClicked] = useState(false);

  return (
    <Clicked.Provider value={[clicked, setClicked]}>
      {children}
    </Clicked.Provider>
  );
};

export const ClickedAddNote = React.createContext();
export const ClickedAddNoteProvider = ({ children }) => {
  const [clicked, setClicked] = useState(false);

  return (
    <ClickedAddNote.Provider value={[clicked, setClicked]}>
      {children}
    </ClickedAddNote.Provider>
  );
};

export const Taskss = React.createContext();
export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  return (
    <Taskss.Provider value={[tasks, setTasks]}>{children}</Taskss.Provider>
  );
};

export const Value = React.createContext();
export const ValueProvider = ({ children }) => {
  const [values, setValues] = useState({
    title: "",
    note: "",
  });

  return (
    <Value.Provider value={[values, setValues]}>{children}</Value.Provider>
  );
};

export const Count = React.createContext();
export const CountProvider = ({ children }) => {
  const [count, setCount] = useState(Number(1));

  return <Count.Provider value={[count, setCount]}>{children}</Count.Provider>;
};

export const IsRunning = React.createContext();
export const IsRunningProvider = ({ children }) => {
  const [running, isRunning] = useState(false);

  return (
    <IsRunning.Provider value={[running, isRunning]}>
      {children}
    </IsRunning.Provider>
  );
};

// WSYZSTKIER HOOKI WWRZUC TU
