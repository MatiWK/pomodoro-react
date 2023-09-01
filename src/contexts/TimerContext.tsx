import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { modes } from "./modes";
// import sound from "../assets/sound.mp3";
import { colorLinks } from "../components/colorLinks";
import { IsRunning, Background, TaskColor, Running, useIsRunning, useBackground, useTaskColor, useRunning } from "./CounterContext";
import { useTask } from "./TaskContext";
type ContextValue = {
  time: number,
  chosenTimer: {
    pomodoro: boolean;
    shortbreak: boolean;
    longbreak: boolean;
  },
  backgroundColor: any,
  taskColor: any,
  running: any,
  isRunning: any,
  handlers: {
    handleLongBreak: (e: any) => void;
    handlePomodoro: (e: any) => void;
    handleShortbreak: (e: any) => void;
  },
  restart: () => void,
  toggle: () => void
}

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
export const TimerContext = createContext<null | ContextValue>(null);
export const TimerProvider = ({ children }: PropsWithChildren) => {
  const [time, setTime] = useState(pomodoroTimer.initialTime);
  const [chosenTimer, setChosenTimer] = useState(pomodoroTimer.chooseTimer);
  const [isRunning, setIsRunning] = useIsRunning();
  const { pomodoro, shortbreak } = chosenTimer;
  const [backgroundColor, setbackgroundColor] = useBackground();
  const [taskColor, setTaskColor] = useTaskColor();
  const [running, setRunning] = useRunning();

  const colorSwitch = useCallback(
    (name: any) => {
      if (name === "Pomodoro") {
        setbackgroundColor("background-pomodoro");
        setTaskColor("taskbox-pomodoro");
        setRunning(true);
      } else {
        setbackgroundColor("background-break");
        setTaskColor("taskbox-break");
        setRunning(false);
      }
    },
    [setRunning, setTaskColor, setbackgroundColor]
  );

  useEffect(() => {
    let interval: any;

    if (isRunning) {
      interval = setInterval(() => {
        if (time === 0) {
          setIsRunning(false);

          // new Audio(sound).play();

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
  function handlePomodoro(e: any) {
    e.preventDefault();
    // choses link to apply styling to
    setChosenTimer(pomodoroTimer.chooseTimer);
    // sets time according to the selected one
    setTime(pomodoroTimer.initialTime);
    setIsRunning(false);

    // sends chosen link to app.jsx
    colorSwitch(colorLinks.pomodoro);
  }

  function handleShortbreak(e: any) {
    e.preventDefault();
    setChosenTimer(shortbreakTimer.chooseTimer);
    setTime(shortbreakTimer.initialTime);
    setIsRunning(false);

    colorSwitch(colorLinks.break);
  }

  function handleLongBreak(e: any) {
    e.preventDefault();
    setChosenTimer(longbreakTimer.chooseTimer);
    setTime(longbreakTimer.initialTime);
    setIsRunning(false);

    colorSwitch(colorLinks.break);
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
    setIsRunning((prev: any) => !prev);
  }

  const value: ContextValue = {
    time,
    chosenTimer,
    backgroundColor,
    taskColor,
    running,
    isRunning,
    handlers: {
      handleLongBreak,
      handlePomodoro,
      handleShortbreak,
    },
    restart,
    toggle,
  };

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useTimer = () => {
  const value = useContext(TimerContext);
  if (value === null) {
    throw new Error(`missing timer provider`);
  }
  return value;
};
