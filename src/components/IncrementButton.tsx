import { useContext } from "react";
import { Count } from "../contexts/CounterContext";
import { useAtom } from "jotai";
import { countAtom } from "../atoms/count-atom";

export const IncrementButton = () => {
  const [, setCount] = useAtom(countAtom);

  return (
    <button
      type="button"
      onClick={() => setCount((x: any) => x + 1)}
      className="ml-3"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-8 h-8 "
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </button>
  );
};

