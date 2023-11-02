
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { countSlice } from "../state/slices/count-slice";

export const DecrementButton = () => {
  const dispatch = useAppDispatch();
  const setCount = (x: number) => dispatch(countSlice.actions.setCount(x))
  const count = useAppSelector(state => state.countSlice.count)


  return (
    <button type="button" onClick={() => {
      const updatedCount = count - 1
      setCount(updatedCount)
    }}>
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
          d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </button>
  );
};
