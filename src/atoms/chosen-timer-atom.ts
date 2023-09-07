import { atom } from "jotai";
import { modes } from "../contexts/modes";

const { pomodoroTimer } = modes;

export const chosenTimerAtom = atom(pomodoroTimer.chooseTimer)