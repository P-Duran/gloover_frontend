import { useEffect, useState } from "react";

interface Props {
  number: number;
  duration: number;
  symbol?: string;
}
export const AnimatedCounter = ({ number, duration, symbol = "" }: Props) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!isNaN(number) && number !== 0) {
      const timer = setInterval(() => {
        let step = number / (duration / 20);
        if (number % 1 === 0) {
          step = Math.ceil(step);
        }
        setValue((oldValue) => {
          const newVal = oldValue + step;
          if (Math.abs(newVal) >= Math.abs(number)) {
            clearInterval(timer);
            return number;
          } else {
            return newVal;
          }
        });
      }, 20);
    }
  }, [duration, number]);

  return <div>{value.toLocaleString() + symbol}</div>;
};
