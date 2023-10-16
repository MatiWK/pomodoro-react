import { useSetAtom } from "jotai";
import { useTimer } from "../contexts/TimerContext";
import { LONG_BREAK, POMODORO, SHORT_BREAK, modes } from "../contexts/modes";
import { chosenTimerAtom } from "../atoms/chosen-timer-atom";
import { timeAtom } from "../atoms/time-atom";
import { isRunningAtom } from "../atoms/is-running-atom";
import { useColorSwitch } from "../hooks/use-color-switch";
import { colorLinks } from "./colorLinks";

const inactiveButton = "mx-3";
const activeButton =
  inactiveButton + " transparent-background px-2 py-1 rounded-lg";
const labels = modes;
const { pomodoroTimer, shortbreakTimer, longbreakTimer } = modes;


const TimerButtons = () => {
  const { chosenTimer } = useTimer();
  const setChosenTimer = useSetAtom(chosenTimerAtom)
  const setTime = useSetAtom(timeAtom);
  const setIsRunning = useSetAtom(isRunningAtom);
  const colorSwitch = useColorSwitch();




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
  


  return (
    <div className=" my-3 py-3">
      <a
        href={labels[POMODORO].label}
        className={chosenTimer === POMODORO ? activeButton : inactiveButton}
        onClick={handlePomodoro}
      >
        Pomodoro
      </a>
      <a
        href={labels[SHORT_BREAK].label}
        className={chosenTimer === SHORT_BREAK ? activeButton : inactiveButton}
        onClick={handleShortbreak}
      >
        Short Break
      </a>
      <a
        href={labels[LONG_BREAK].label}
        className={chosenTimer === LONG_BREAK ? activeButton : inactiveButton}
        onClick={handleLongBreak}
      >
        Long Break
      </a>
    </div>
  );
};

export default TimerButtons;
