import { pomodoroLength, shortbreakLength, longbreakLength } from "./constants";
type ModeName = "shortbreakTimer" | "longbreakTimer" | "pomodoroTimer"
// MODES
export const POMODORO = "POMODORO"
export const SHORT_BREAK = "SHORT_BREAK"
export const LONG_BREAK = "LONG_BREAK"


export const modes = {
  pomodoroTimer: {
    initialTime: pomodoroLength,
    label: "Pomodoro",
    pickNextMode: (howManyPomodorosElapsed: any): ModeName => {
      return howManyPomodorosElapsed < 4 ? "shortbreakTimer" : "longbreakTimer";
    },
    backgroundClassName: "background-pomodoro",
    taskColorClassName: "taskbox-pomodoro"
  },
  shortbreakTimer: {
    initialTime: shortbreakLength,
    label: "Short Break",
    pickNextMode: (): ModeName => {
      return "pomodoroTimer";
    },
    backgroundClassName: "background-break",
    taskColorClassName: "taskbox-break"
  },
  longbreakTimer: {
    initialTime: longbreakLength,
    label: "Long Break",
    pickNextMode: (): ModeName => {
      return "pomodoroTimer";
    },
    backgroundClassName: "background-break",
    taskColorClassName: "taskbox-break"
  }
};
