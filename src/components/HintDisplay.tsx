import { useAtomValue } from "jotai"
import { runningAtom } from "../atoms/running-atom"

export const HintDisplay = () => {
    const running = useAtomValue(runningAtom)
    return running ? <p>Time to focus!</p> : <p>Time for a Break! </p>
}