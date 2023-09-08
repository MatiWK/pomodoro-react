import { atom } from "jotai";
import { modes } from "../contexts/modes";

export const chosenTimerAtom = atom<keyof typeof modes>("pomodoroTimer")