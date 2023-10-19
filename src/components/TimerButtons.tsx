import { LONG_BREAK, POMODORO, SHORT_BREAK, modes } from "../contexts/modes";
import { useTimer } from "../contexts/TimerContext";

const inactiveButton = "mx-3";
const activeButton =
  inactiveButton + " transparent-background px-2 py-1 rounded-lg";


const TimerButtons = () => {
  const {setChosenTimer, setTime, setIsRunning, chosenTimer} = useTimer();

  const makeHandle = (timer: keyof typeof modes) => (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setChosenTimer(timer);
    setTime(modes[timer].initialTime);
    setIsRunning(false);
  }

  const handlePomodoro = makeHandle(POMODORO);
  const handleShortBreak = makeHandle(SHORT_BREAK)
  const handleLongBreak = makeHandle(LONG_BREAK)

  return (
    <div className=" my-3 py-3">
      <a
        href={modes[POMODORO].label}
        className={chosenTimer === POMODORO ? activeButton : inactiveButton}
        onClick={handlePomodoro}
      >
        Pomodoro
      </a>
      <a
        href={modes[SHORT_BREAK].label}
        className={chosenTimer === SHORT_BREAK ? activeButton : inactiveButton}
        onClick={handleShortBreak}

      >
        Short Break
      </a>
      <a
        href={modes[LONG_BREAK].label}
        className={chosenTimer === LONG_BREAK ? activeButton : inactiveButton}
        onClick={handleLongBreak}
      >
        Long Break
      </a>
    </div>
  );
};

export default TimerButtons;
