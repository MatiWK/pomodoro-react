import { useTimer } from "../contexts/TimerContext";
import { modes } from "../contexts/modes";

const inactiveButton = "mx-3";
const activeButton =
  inactiveButton + " transparent-background px-2 py-1 rounded-lg";
const labels = modes;

const TimerButtons = () => {
  const { chosenTimer, handlers } = useTimer();

  return (
    <div className=" my-3 py-3">
      <a
        href={labels.pomodoroTimer.label}
        className={chosenTimer === "pomodoroTimer" ? activeButton : inactiveButton}
        onClick={handlers.handlePomodoro}
      >
        Pomodoro
      </a>
      <a
        href={labels.shortbreakTimer.label}
        className={chosenTimer === "shortbreakTimer" ? activeButton : inactiveButton}
        onClick={handlers.handleShortbreak}
      >
        Short Break
      </a>
      <a
        href={labels.longbreakTimer.label}
        className={chosenTimer === "longbreakTimer" ? activeButton : inactiveButton}
        onClick={handlers.handleLongBreak}
      >
        Long Break
      </a>
    </div>
  );
};

export default TimerButtons;
