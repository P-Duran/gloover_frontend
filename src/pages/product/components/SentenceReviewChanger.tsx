import { Box, Grid, ListItem, useTheme } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { PromiseBuilder, PromiseState } from "components/PromiseBuilder";
import { motion, MotionConfigContext, useCycle } from "framer-motion";
import { getReviewById } from "model/api/database/ReviewApi";
import FeatherIcon from "feather-icons-react";
import { useState } from "react";
import { ProductFeatureSentence } from "types/ProductFeatureTypes";
import { CircularIcon } from "components/CircularIcon";

interface Props {
  sentence: ProductFeatureSentence;
}

enum Side {
  FRONT = "FRONT",
  BACK = "BACK",
}

export const SentenceReviewChanger = ({ sentence }: Props) => {
  const [side, setSide] = useState(Side.FRONT);
  const [inProgress, setInProgess] = useState(false);
  const [animate, cycle] = useCycle(
    { rotateY: 0 },
    { rotateY: 90 },
    { rotateY: 180 },
    { rotateY: 90 }
  );
  const theme = useTheme();

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
      {side === Side.FRONT ? (
        <ListItem
          style={{
            backgroundColor:
              sentence.polarity > 0
                ? theme.palette.success.light
                : theme.palette.error.light,
            color:
              sentence.polarity > 0
                ? theme.palette.success.main
                : theme.palette.error.main,
          }}
        >
          {sentence.sentence}
        </ListItem>
      ) : (
        <PromiseBuilder
          promise={getReviewById}
          params={{ id: sentence.review_id }}
          builder={(state, value) => {
            switch (state) {
              case PromiseState.DONE:
                return (
                  <ListItem
                    style={{
                      transform: "rotateY(180deg)",
                      backgroundColor: theme.palette.grey[100],
                      border: "1px solid " + theme.palette.grey[300],
                    }}
                  >
                    <Grid container>
                      <Grid item xs={12}>
                        <CircularIcon
                          colors={
                            value.data.items.polarity > 2.5
                              ? theme.palette.success
                              : theme.palette.error
                          }
                        >
                          <FeatherIcon
                            icon={
                              value.data.items.polarity > 2.5
                                ? "thumbs-up"
                                : "thumbs-down"
                            }
                          />
                        </CircularIcon>
                      </Grid>
                      <Box my={2}>{value.data.items.text}</Box>
                    </Grid>
                  </ListItem>
                );
              default:
                return (
                  <div style={{ transform: "rotateY(180deg)" }}>
                    <Skeleton variant="text"></Skeleton>
                    <Skeleton variant="text" width="80%"></Skeleton>
                    <Skeleton variant="text" width="90%"></Skeleton>
                    <Skeleton variant="text" width="50%"></Skeleton>
                    <Skeleton variant="text" width="80%"></Skeleton>
                    <Skeleton variant="text"></Skeleton>
                    <Skeleton variant="text" width="90%"></Skeleton>
                    <Skeleton variant="text" width="60%"></Skeleton>
                  </div>
                );
            }
          }}
        ></PromiseBuilder>
      )}
    </motion.div>
  );
};
