import { atom } from "jotai";

export const currentlyEditedTaskIdAtom = atom(<
    null | number
  >(null))