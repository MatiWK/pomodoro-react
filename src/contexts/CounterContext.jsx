import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { modes } from "./modes";
import sound from "../assets/sound.mp3";
import { colorLinks } from "../components/colorLinks";

// export const Time = React.createContext();
// export const TimeProvider = ({children}) => {
//     const [time, setTime] = useState(pomodoroTimer.initialTime)

//     return <Time.Provider value={[time, setTime]}>{children}</Time.Provider>
// }

// export const ChoosenTimer = React.createContext();
// export const ChoosenTimerProvider = ({children}) => {
//     const [chosenTimer, setChosenTimer] = useState(pomodoroTimer.chooseTimer);

//     return <ChoosenTimer.Provider value={[chosenTimer, setChosenTimer]}>{children}</ChoosenTimer.Provider>
// }
const { pomodoroTimer, shortbreakTimer, longbreakTimer } = modes;
export const TimerContext = createContext(null);
export const TimerProvider = ({ children }) => {
  const [time, setTime] = useState(pomodoroTimer.initialTime);
  const [chosenTimer, setChosenTimer] = useState(pomodoroTimer.chooseTimer);
  const [isRunning, setIsRunning] = useContext(IsRunning);
  const { pomodoro, shortbreak } = chosenTimer;
  const [backgroundColor, setbackgroundColor] = useContext(Background);
  const [taskColor, setTaskColor] = useContext(TaskColor);
  const [running, setRunning] = useContext(Running);

  
  const colorSwitch = useCallback((name) => {
    if (name === "Pomodoro") {
      setbackgroundColor("background-pomodoro");
      setTaskColor("taskbox-pomodoro");
      setRunning(true);
    } else {
      setbackgroundColor("background-break");
      setTaskColor("taskbox-break");
      setRunning(false);
    }
  }, [setRunning, setTaskColor, setbackgroundColor])

  

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        if (time === 0) {
          setIsRunning(false);

          new Audio(sound).play();

          if (pomodoro) {
            colorSwitch(colorLinks.break);
            setTime(shortbreakTimer.initialTime);
            setChosenTimer(shortbreakTimer.chooseTimer);
          } else if (shortbreak) {
            colorSwitch(colorLinks.pomodoro);
            setTime(pomodoroTimer.initialTime);
            setChosenTimer(pomodoroTimer.chooseTimer);
          } else {
            colorSwitch(colorLinks.pomodoro);
            setTime(pomodoroTimer.initialTime);
            setChosenTimer(pomodoroTimer.chooseTimer);
          }
        } else {
          setTime(time - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [time, isRunning, pomodoro, shortbreak, setIsRunning, colorSwitch]);
   // CHOOSING COUNTDOWN LOGIC
   function handlePomodoro() {
      
    // choses link to apply styling to
    setChosenTimer(pomodoroTimer.chooseTimer)
    // sets time according to the selected one
    setTime(pomodoroTimer.initialTime)
    setIsRunning(false);

    // sends chosen link to app.jsx
    colorSwitch(colorLinks.pomodoro)

  }

  function handleShortbreak() {
    setChosenTimer(shortbreakTimer.chooseTimer)
    setTime(shortbreakTimer.initialTime)
    setIsRunning(false);
    
    colorSwitch(colorLinks.break)

  }
  
  function handleLongBreak() {
    setChosenTimer(longbreakTimer.chooseTimer)
    setTime(longbreakTimer.initialTime)
    setIsRunning(false);
    
    colorSwitch(colorLinks.break)

  }
  function restart() {
    if (pomodoro) {
      setTime(shortbreakTimer.initialTime);
      setChosenTimer(shortbreakTimer.chooseTimer);
      colorSwitch(colorLinks.break);
    } else if (shortbreak) {
      setTime(pomodoroTimer.initialTime);
      setChosenTimer(pomodoroTimer.chooseTimer);
      colorSwitch(colorLinks.pomodoro);
    } else {
      setTime(pomodoroTimer.initialTime);
      setChosenTimer(pomodoroTimer.chooseTimer);
      colorSwitch(colorLinks.pomodoro);
    }
    setIsRunning(false);
  }
  function toggle() {
    setIsRunning((prev) => !prev);
  }

  const value = {
    time,
    chosenTimer,
    backgroundColor,
    taskColor,
    running,
    handlers: {
      handleLongBreak,
      handlePomodoro,
      handleShortbreak
    },
    restart,
    toggle
  };

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
};
export const useTimer = () => {
  const value = useContext(TimerContext);
  if (value === null) {
    throw new Error(`missing timer provider`);
  }
  return value;
};

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
