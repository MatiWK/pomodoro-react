import { atom } from "jotai";
import { modes } from "../contexts/modes";

const { pomodoroTimer } = modes;

export const timeAtom = atom(pomodoroTimer.initialTime)