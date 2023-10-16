import { useTimer } from "../contexts/TimerContext";
import { LONG_BREAK, POMODORO, SHORT_BREAK, modes } from "../contexts/modes";

const inactiveButton = "mx-3";
const activeButton =
  inactiveButton + " transparent-background px-2 py-1 rounded-lg";
const labels = modes;

const TimerButtons = () => {
  const { chosenTimer, handlers } = useTimer();

  


  return (
    <div className=" my-3 py-3">
      <a
        href={labels[POMODORO].label}
        className={chosenTimer === POMODORO ? activeButton : inactiveButton}
        onClick={handlers.handlePomodoro}
      >
        Pomodoro
      </a>
      <a
        href={labels[SHORT_BREAK].label}
        className={chosenTimer === SHORT_BREAK ? activeButton : inactiveButton}
        onClick={handlers.handleShortbreak}
      >
        Short Break
      </a>
      <a
        href={labels[LONG_BREAK].label}
        className={chosenTimer === LONG_BREAK ? activeButton : inactiveButton}
        onClick={handlers.handleLongBreak}
      >
        Long Break
      </a>
    </div>
  );
};

export default TimerButtons;
