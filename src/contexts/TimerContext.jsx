import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { modes } from "./modes";
import sound from "../assets/sound.mp3";
import { colorLinks } from "../components/colorLinks";
import { IsRunning, Background, TaskColor, Running } from "./CounterContext";

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

  const colorSwitch = useCallback(
    (name) => {
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
  function handlePomodoro(e) {
    e.preventDefault();
    // choses link to apply styling to
    setChosenTimer(pomodoroTimer.chooseTimer);
    // sets time according to the selected one
    setTime(pomodoroTimer.initialTime);
    setIsRunning(false);

    // sends chosen link to app.jsx
    colorSwitch(colorLinks.pomodoro);
  }

  function handleShortbreak(e) {
    e.preventDefault();
    setChosenTimer(shortbreakTimer.chooseTimer);
    setTime(shortbreakTimer.initialTime);
    setIsRunning(false);

    colorSwitch(colorLinks.break);
  }

  function handleLongBreak(e) {
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
    setIsRunning((prev) => !prev);
  }

  const value = {
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
