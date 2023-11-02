import { useAppSelector } from "../state/hooks";

export const InputCount = () => {
  const count = useAppSelector(state => state.countSlice.count)

  return (
    <input
      placeholder={String(count)}
      type="number"
      className="input-background px-2 py-1 rounded-lg"
    />
  );
};
