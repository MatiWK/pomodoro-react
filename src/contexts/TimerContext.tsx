import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
} from "react";
import { modes } from "./modes";
import { useAtom, useSetAtom } from "jotai";
import { isRunningAtom } from "../atoms/is-running-atom";
import { timeAtom } from "../atoms/time-atom";
import { chosenTimerAtom } from "../atoms/chosen-timer-atom";
import { useColorSwitch } from "../hooks/use-color-switch";

type ContextValue = {
  chosenTimer: keyof typeof modes;
  backgroundColor: any;
  taskColor: any;
  isRunning: any;
  restart: () => void;
  toggle: () => void;
};

const TimerRunner = ({
  takeNextTimer,
  colorSwitch,
}: {
  takeNextTimer: () => void;
  colorSwitch: (name: any) => void;
}) => {
  const [time, setTime] = useAtom(timeAtom);
  const [isRunning, setIsRunning] = useAtom(isRunningAtom);

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
  }, [time, isRunning, setIsRunning, colorSwitch, takeNextTimer]);

  return null;
};

export const TimerContext = createContext<null | ContextValue>(null);
export const TimerProvider = ({ children }: PropsWithChildren) => {
  const setTime = useSetAtom(timeAtom);
  const [chosenTimer, setChosenTimer] = useAtom(chosenTimerAtom);
  const [isRunning, setIsRunning] = useAtom(isRunningAtom);
  

  const colorSwitch = useColorSwitch();

  const takeNextTimer = () => {
    const timer = modes[chosenTimer];
    const nextTimerName = timer.pickNextMode(1);
    const nextTimer = modes[nextTimerName];
    setChosenTimer(nextTimerName);
    setTime(nextTimer.initialTime);
    setIsRunning(false);
  };


  function toggle() {
    setIsRunning((prev: any) => !prev);
  }

  const value: ContextValue = {
    chosenTimer,
    backgroundColor: modes[chosenTimer].backgroundClassName,
    taskColor: modes[chosenTimer].taskColorClassName,
    isRunning,
    restart: takeNextTimer,
    toggle,
  };

  return (
    <TimerContext.Provider value={value}>
      <TimerRunner takeNextTimer={takeNextTimer} colorSwitch={colorSwitch} />
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
