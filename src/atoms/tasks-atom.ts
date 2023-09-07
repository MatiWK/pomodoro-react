import { atom } from "jotai";

type Task = { title: string; note: string; id: number; exist: boolean };


export const taskAtom = atom<Task[]>([]);