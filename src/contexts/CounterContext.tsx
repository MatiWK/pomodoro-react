import React, { PropsWithChildren, useContext, useState } from "react";

export const Context = React.createContext(10);
export const CounterProvider = ({ children }: PropsWithChildren) => {
  return <Context.Provider value={40}>{children}</Context.Provider>;
};

export const Background = React.createContext<[string, (color: string) => void] | null>(null);
export const BackgroundProvider = ({ children }: PropsWithChildren) => {
  const [backgroundColor, setbackgroundColor] = useState("background-pomodoro");

  return (
    <Background.Provider value={[backgroundColor, setbackgroundColor]}>
      {children}
    </Background.Provider>
  );
};

export const useBackground = () => {
  const value = useContext(Background);
  if (value === null) {
    throw new Error(`missing task provider`);
  }
  return value;
};

export const TaskColor = React.createContext<[string, (color: string) => void] | null>(null);
export const TaskColorProvider = ({ children }: PropsWithChildren) => {
  const [taskColor, setTaskColor] = useState("taskbox-pomodoro");

  return (
    <TaskColor.Provider value={[taskColor, setTaskColor]}>
      {children}
    </TaskColor.Provider>
  );
};

export const useTaskColor = () => {
  const value = useContext(TaskColor);
  if (value === null) {
    throw new Error(`missing task provider`);
  }
  return value;
};

export const Running = React.createContext<[boolean, (x: boolean) => void] | null>(null);
export const RunningProvider = ({ children }: PropsWithChildren) => {
  const [running, isRunning] = useState(true);

  return (
    <Running.Provider value={[running, isRunning]}>{children}</Running.Provider>
  );
};

export const useRunning = () => {
  const value = useContext(IsRunning);
  if (value === null) {
    throw new Error(`missing task provider`);
  }
  return value;
};

export const Count = React.createContext<[number, (x: number) => void] | null>(null);
export const CountProvider = ({ children }: PropsWithChildren) => {
  const [count, setCount] = useState(Number(1));

  return <Count.Provider value={[count, setCount]}>{children}</Count.Provider>;
};

export const IsRunning = React.createContext<[boolean, React.Dispatch<React.SetStateAction<boolean>>] | null>(null);
export const IsRunningProvider = ({ children }: PropsWithChildren) => {
  const [running, isRunning] = useState(false);

  return (
    <IsRunning.Provider value={[running, isRunning]}>
      {children}
    </IsRunning.Provider>
  );
};

export const useIsRunning = () => {
  const value = useContext(IsRunning);
  if (value === null) {
    throw new Error(`missing task provider`);
  }
  return value;
};



// WSYZSTKIER HOOKI WWRZUC TU
