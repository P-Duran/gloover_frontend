import { motion, useCycle } from "framer-motion";
import { useState } from "react";

interface Props {
  front: React.ReactChild;
  back: React.ReactChild;
}

enum Side {
  FRONT = "FRONT",
  BACK = "BACK",
}

export const FlipCard = ({ front, back }: Props) => {
  const [side, setSide] = useState(Side.FRONT);
  const [inProgress, setInProgess] = useState(false);
  const [animate, cycle] = useCycle(
    { rotateY: 0 },
    { rotateY: 90 },
    { rotateY: 180 },
    { rotateY: 90 }
  );

  return (
    <motion.div
      animate={animate}
      transition={{ duration: 0.4 }}
      onTap={() => !inProgress && cycle()}
      onAnimationStart={() => setInProgess(true)}
      onAnimationComplete={(data: any) => {
        if (data.rotateY === 90) {
          setSide(side === Side.FRONT ? Side.BACK : Side.FRONT);
          cycle();
        } else {
          setInProgess(false);
          setSide(data.rotateY === 180 ? Side.BACK : Side.FRONT);
        }
      }}
    >
      {side === Side.FRONT ? front : back}
    </motion.div>
  );
};
