import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
} from "react";
import { modes } from "./modes";
import { useAtom, useSetAtom } from "jotai";
import { timeAtom } from "../atoms/time-atom";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { appSlice } from "../state/slices/app-slice";
import { isRunningSlice } from "../state/slices/is-running-slice";



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
  const [time, setTime] = useAtom(timeAtom);
  // const [isRunning, setIsRunning] = useAtom(isRunningAtom);
  const isRunning = useAppSelector(state => state.isRunningSlice.isRunning);

  

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

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
  }, [time, isRunning, takeNextTimer, setTime]);

  return null;
};

export const TimerContext = createContext<null | ContextValue>(null);
export const TimerProvider = ({ children }: PropsWithChildren) => {
  const setTime = useSetAtom(timeAtom);
  const dispatch = useAppDispatch();
  const chosenTimer = useAppSelector(state => state.appSlice.chosenTimer);
  const setChosenTimer = (x: keyof typeof modes) => dispatch(appSlice.actions.setChosenTimer(x))

  // const [isRunning, setIsRunning] = useAtom(isRunningAtom);
  const isRunning = useAppSelector(state => state.isRunningSlice.isRunning);
  const setIsRunning = (x: boolean) => dispatch(isRunningSlice.actions.setIsRunning(x))

  

// poczyttaj o selektoraach z reduxa,  zainstaluj devtoole do jotaia i przenies atomki do reduxa xdd



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
