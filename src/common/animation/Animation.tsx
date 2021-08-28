import { useEffect, useState } from "react";
interface Props {
  value: number;
  duration?: number;
  initValue?: number;
  builder: (value: number) => any;
}

export const Animator = ({
  value,
  builder,
  duration = 200,
  initValue = 0,
}: Props) => {
  const [animatedValue, setAnimatedValue] = useState(initValue);
  useEffect(() => {
    if (!isNaN(value)) {
      const direction = value >= animatedValue;
      console.log(direction);
      const timer = setInterval(() => {
        let step = (value - animatedValue) / (duration / 20);
        if (value % 1 === 0) {
          step = Math.ceil(step);
        }
        setAnimatedValue((oldValue) => {
          const newVal = oldValue + step;
          console.log(value);
          if (
            step === 0 ||
            (direction
              ? Math.abs(newVal) >= Math.abs(value)
              : Math.abs(newVal) <= Math.abs(value))
          ) {
            clearInterval(timer);
            return value;
          } else {
            return newVal;
          }
        });
      }, 20);
    }
  }, [duration, value]);

  return builder(animatedValue);
};
