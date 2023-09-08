import { atom } from "jotai";
import { modes } from "../contexts/modes";

export const modeAtom = atom<keyof typeof modes>("pomodoroTimer");