import { pomodoroLength, shortbreakLength, longbreakLength } from "./constants";

// MODES
export const modes = {
  pomodoroTimer: {
    initialTime: pomodoroLength,
    label: "Pomodoro",
    chooseTimer: {
      pomodoro: true,
      shortbreak: false,
      longbreak: false
    },
    pickNextMode: (howManyPomodorosElapsed) => {
      return howManyPomodorosElapsed < 4 ? modes.shortbreakTimer : modes.longbreakTimer;
    }
    // backgroundColor: 
  },
  shortbreakTimer: {
    initialTime: shortbreakLength,
    label: "Short Break",
    chooseTimer: {
      pomodoro: false,
      shortbreak: true,
      longbreak: false
    },
    pickNextMode: () => {
      return modes.pomodoroTimer;
    }
  },
  longbreakTimer: {
    initialTime: longbreakLength,
    label: "Long Break",
    chooseTimer: {
      pomodoro: false,
      shortbreak: false,
      longbreak: true
    },
    pickNextMode: () => {
      return modes.pomodoroTimer;
    }
  }
};
