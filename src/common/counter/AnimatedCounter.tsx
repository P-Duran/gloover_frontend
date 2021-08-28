import { Animator } from "common/animation/Animation";

interface Props {
  number: number;
  duration?: number;
  symbol?: string;
  showMode?: "locale" | "fixed";
  precision?: number;
}
export const AnimatedCounter = ({
  number,
  duration = 200,
  symbol = "",
  precision = 2,
  showMode = "locale",
}: Props) => {
  return (
    <Animator
      value={number}
      duration={duration}
      builder={(value) => (
        <div>
          {showMode === "locale"
            ? value.toLocaleString()
            : value.toFixed(precision) + symbol}
        </div>
      )}
    />
  );
};
