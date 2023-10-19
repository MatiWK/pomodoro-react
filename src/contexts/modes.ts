import { pomodoroLength, shortbreakLength, longbreakLength } from "./constants";
type ModeName = "shortbreakTimer" | "longbreakTimer" | "pomodoroTimer"
// MODES
export const POMODORO = "pomodoroTimer"
export const SHORT_BREAK = "shortbreakTimer"
export const LONG_BREAK = "longbreakTimer"


export const modes = {
  [POMODORO]: {
    initialTime: pomodoroLength,
    label: "Pomodoro",
    pickNextMode: (howManyPomodorosElapsed: number): ModeName => {
      return howManyPomodorosElapsed < 4 ? SHORT_BREAK : LONG_BREAK;
    },
    backgroundClassName: "background-pomodoro",
    taskColorClassName: "taskbox-pomodoro",
    isBreak: false
  },
  
  [SHORT_BREAK]: {
    initialTime: shortbreakLength,
    label: "Short Break",
    pickNextMode: (): ModeName => {
      return POMODORO;
    },
    backgroundClassName: "background-break",
    taskColorClassName: "taskbox-break",
    isBreak: true
  },
  [LONG_BREAK]: {
    initialTime: longbreakLength,
    label: "Long Break",
    pickNextMode: (): ModeName => {
      return POMODORO;
    },
    backgroundClassName: "background-break",
    taskColorClassName: "taskbox-break",
    isBreak: true
  }
};
