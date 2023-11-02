import { atom } from "jotai";

export type Task = { title: string; note: string; id: number; exist: boolean };


export const taskAtom = atom<Task[]>([]);