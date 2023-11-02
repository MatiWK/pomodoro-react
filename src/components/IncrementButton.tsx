
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { countSlice } from "../state/slices/count-slice";

export const IncrementButton = () => {
  // const [, setCount] = useAtom(countAtom);
  const dispatch = useAppDispatch();
  const setCount = (x: number) => dispatch(countSlice.actions.setCount(x))
  const count = useAppSelector(state => state.countSlice.count)


  return (
    <button
      type="button"
      onClick={() => {
        const updatedCount = count + 1
        setCount(updatedCount)}}
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

