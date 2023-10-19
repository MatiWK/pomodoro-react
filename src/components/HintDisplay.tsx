import { modes } from "../contexts/modes";
import { useAppSelector } from "../state/hooks";

export const HintDisplay = () => {
    const chosenTimer = useAppSelector((state) =>  state.appSlice.chosenTimer);
    const isFocusTime = !modes[chosenTimer].isBreak
    return isFocusTime ? <p>Time to focus!</p> : <p>Time for a Break! </p>
}