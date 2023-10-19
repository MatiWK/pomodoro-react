import { useAtomValue } from "jotai"
import { modes } from "../contexts/modes";
import { chosenTimerAtom } from "../atoms/chosen-timer-atom";

export const HintDisplay = () => {
    const mode = useAtomValue(chosenTimerAtom)
    const isFocusTime = !modes[mode].isBreak
    return isFocusTime ? <p>Time to focus!</p> : <p>Time for a Break! </p>
}