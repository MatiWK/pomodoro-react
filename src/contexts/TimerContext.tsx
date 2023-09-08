import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { modes } from "./modes";
// import sound from "../assets/sound.mp3";
import { colorLinks } from "../components/colorLinks";

import { useAtom } from "jotai";
import { isRunningAtom } from "../atoms/is-running-atom";
import { taskColorAtom } from "../atoms/rask-color-atom";
import { backgroundAtom } from "../atoms/background-atom";
import { runningAtom } from "../atoms/running-atom";
import { timeAtom } from "../atoms/time-atom";
import { chosenTimerAtom } from "../atoms/chosen-timer-atom";
import { modeAtom } from "../atoms/mode-atom";

type ContextValue = {
  time: number,
  chosenTimer: keyof typeof modes,
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

  const { pomodoroTimer, shortbreakTimer, longbreakTimer } = modes;
  export const TimerContext = createContext<null | ContextValue>(null);
  export const TimerProvider = ({ children }: PropsWithChildren) => {
  const [time, setTime] = useAtom(timeAtom);
  const [chosenTimer, setChosenTimer] = useAtom(chosenTimerAtom);
  const [isRunning, setIsRunning] = useAtom(isRunningAtom)
  const [running, setRunning] = useAtom(runningAtom);
  const [mode, setMode] = useAtom(modeAtom);

  const colorSwitch = useCallback(
    (name: any) => {
      if (name === "Pomodoro") {
        setRunning(true);
      } else {
        setRunning(false);
      }
    },
    [setRunning]
  );

  const takeNextTimer = () => {
    const timer = modes[chosenTimer]
    const nextTimerName = timer.pickNextMode(1);
    const nextTimer = modes[nextTimerName];
    setChosenTimer(nextTimerName)
    setTime(nextTimer.initialTime);
    setIsRunning(false);

  }

  useEffect(() => {
    let interval: any;

    if (isRunning) {
      interval = setInterval(() => {
        if (time === 0) {

          // new Audio(sound).play();
          takeNextTimer();
          
        } else {
          setTime(time - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [time, isRunning,  setIsRunning, colorSwitch, takeNextTimer]);
  // CHOOSING COUNTDOWN LOGIC
  function handlePomodoro(e: any) {
    e.preventDefault(); 
    // choses link to apply styling to
    setChosenTimer("pomodoroTimer");
    // sets time according to the selected one
    setTime(pomodoroTimer.initialTime);
    setIsRunning(false);

    // sends chosen link to app.jsx
    colorSwitch(colorLinks.pomodoro);
  }

  function handleShortbreak(e: any) {
    e.preventDefault();
    setChosenTimer("shortbreakTimer");
    setTime(shortbreakTimer.initialTime);
    setIsRunning(false);

    colorSwitch(colorLinks.break);
  }

  function handleLongBreak(e: any) {
    e.preventDefault();
    setChosenTimer("longbreakTimer");
    setTime(longbreakTimer.initialTime);
    setIsRunning(false);

    colorSwitch(colorLinks.break);
  }
  
  function toggle() {
    setIsRunning((prev: any) => !prev);
  }

  const value: ContextValue = {
    time,
    chosenTimer,
    backgroundColor: modes[chosenTimer].backgroundClassName,
    taskColor: modes[chosenTimer].taskColorClassName,
    running,
    isRunning,
    handlers: {
      handleLongBreak,
      handlePomodoro,
      handleShortbreak,
    },
    restart: takeNextTimer,
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
