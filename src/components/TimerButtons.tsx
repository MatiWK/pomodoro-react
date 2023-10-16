import { useAtom, useSetAtom } from "jotai";
import { LONG_BREAK, POMODORO, SHORT_BREAK, modes } from "../contexts/modes";
import { chosenTimerAtom } from "../atoms/chosen-timer-atom";
import { timeAtom } from "../atoms/time-atom";
import { isRunningAtom } from "../atoms/is-running-atom";
import { useColorSwitch } from "../hooks/use-color-switch";
import { colorLinks } from "./colorLinks";
import { useTimer } from "../contexts/TimerContext";

const inactiveButton = "mx-3";
const activeButton =
  inactiveButton + " transparent-background px-2 py-1 rounded-lg";
const labels = modes;
const { pomodoroTimer, shortbreakTimer, longbreakTimer } = modes;


const TimerButtons = () => {
  const colorSwitch = useColorSwitch();

  const {setTime, setIsRunning, chosenTimer, setChosenTimer} = useTimer();

  const handleTimer = (e: React.MouseEvent<HTMLElement>, timer: string, initialTime: number, color: string) => {
    e.preventDefault();
    setChosenTimer(timer);
    setTime(initialTime);
    setIsRunning(false);
    colorSwitch(color);
  }

  return (
    <div className=" my-3 py-3">
      <a
        href={labels[POMODORO].label}
        className={chosenTimer === POMODORO ? activeButton : inactiveButton}
        onClick={(e) => handleTimer(e, POMODORO, pomodoroTimer.initialTime, colorLinks.pomodoro)}
      >
        Pomodoro
      </a>
      <a
        href={labels[SHORT_BREAK].label}
        className={chosenTimer === SHORT_BREAK ? activeButton : inactiveButton}
        onClick={(e) => handleTimer(e, SHORT_BREAK, shortbreakTimer.initialTime, colorLinks.break)}

      >
        Short Break
      </a>
      <a
        href={labels[LONG_BREAK].label}
        className={chosenTimer === LONG_BREAK ? activeButton : inactiveButton}
        onClick={(e) => handleTimer(e, LONG_BREAK, longbreakTimer.initialTime, colorLinks.break)}
      >
        Long Break
      </a>
    </div>
  );
};

export default TimerButtons;
