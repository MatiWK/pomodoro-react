import { useSetAtom } from "jotai";
import { useCallback } from "react";
import { runningAtom } from "../atoms/running-atom";


export const useColorSwitch = () => {
    
    const setRunning = useSetAtom(runningAtom)
    return useCallback(
        (name: any) => {
          if (name === "Pomodoro") {
            setRunning(true);
          } else {
            setRunning(false);
          }
        },
        [setRunning]
      );
}