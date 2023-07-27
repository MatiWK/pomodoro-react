import { useContext } from "react";
import { Count } from "../contexts/CounterContext";

export const InputCount = () => {
  const [count] = useContext(Count);

  return (
    <input
      placeholder={count}
      type="number"
      className="input-background px-2 py-1 rounded-lg"
    />
  );
};
