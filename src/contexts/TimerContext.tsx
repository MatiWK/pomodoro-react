import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
} from "react";
import { modes } from "./modes";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { appSlice } from "../state/slices/app-slice";
import { isRunningSlice } from "../state/slices/is-running-slice";
import { timeSlice } from "../state/slices/time-slice";



type ContextValue = {
  backgroundColor: string;
  taskColor: string;
  isRunning: boolean;
  restart: () => void;
  toggle: () => void;
  setIsRunning: (value: boolean) => void;
  setTime: (value: number) => void;
  chosenTimer: keyof typeof modes;
  setChosenTimer: (value: keyof typeof modes) => void
};

const TimerRunner = ({
  takeNextTimer,
}: {
  takeNextTimer: () => void;
}) => {
  const dispatch = useAppDispatch();
  
  const time = useAppSelector(state => state.timeSlice.time)
  const isRunning = useAppSelector(state => state.isRunningSlice.isRunning);
  

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    const setTime = (x: number) => dispatch(timeSlice.actions.setTime(x))


    if (isRunning) {
      interval = setInterval(() => {
        if (time === 0) {
          // new Audio(sound).play();
          takeNextTimer();
        } else {
          setTime(time - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [time, isRunning, takeNextTimer, dispatch]);

  return null;
};

export const TimerContext = createContext<null | ContextValue>(null);
export const TimerProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();

  const setTime = (x: number) => dispatch(timeSlice.actions.setTime(x))
  const chosenTimer = useAppSelector(state => state.appSlice.chosenTimer);
  const setChosenTimer = (x: keyof typeof modes) => dispatch(appSlice.actions.setChosenTimer(x))

  const isRunning = useAppSelector(state => state.isRunningSlice.isRunning);
  const setIsRunning = (x: boolean) => dispatch(isRunningSlice.actions.setIsRunning(x))

  

// poczyttaj o selektoraach z reduxa,  zainstaluj devtoole do jotaia i przenies atomki do reduxa xdd
// ATOMKI PRZENIESIONE TERAZ RESZTA TO CHILL JUZ



  const takeNextTimer = () => {
    const timer = modes[chosenTimer];
    const nextTimerName = timer.pickNextMode(1);
    const nextTimer = modes[nextTimerName];
    setChosenTimer(nextTimerName);
    setTime(nextTimer.initialTime);
    setIsRunning(false);
  };


  function toggle() {
    setIsRunning(!isRunning);
  }

  const value: ContextValue = {
    backgroundColor: modes[chosenTimer].backgroundClassName,
    taskColor: modes[chosenTimer].taskColorClassName,
    isRunning,
    restart: takeNextTimer,
    toggle,
    setIsRunning,
    setTime,
    chosenTimer,
    setChosenTimer
  };

  return (
    <TimerContext.Provider value={value}>
      <TimerRunner takeNextTimer={takeNextTimer}  />
      {children}
    </TimerContext.Provider>
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
