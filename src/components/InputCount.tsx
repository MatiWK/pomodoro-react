import { useAtom } from "jotai";
import { countAtom } from "../atoms/count-atom";

export const InputCount = () => {
  const [count, ] = useAtom(countAtom);

  return (
    <input
      placeholder={String(count)}
      type="number"
      className="input-background px-2 py-1 rounded-lg"
    />
  );
};
