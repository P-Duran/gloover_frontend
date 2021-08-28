import { Box, Grid, ListItem, useTheme } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { PromiseBuilder, PromiseState } from "common/PromiseBuilder";
import { getReviewById } from "model/api/database/ReviewApi";
import FeatherIcon from "feather-icons-react";
import { ProductFeatureSentence } from "types/ProductFeatureTypes";
import { CircularIcon } from "common/CircularIcon";
import { FlipCard } from "common/FlipCard";

interface Props {
  sentence: ProductFeatureSentence;
}

export const SentenceReviewChanger = ({ sentence }: Props) => {
  const theme = useTheme();

  return (
    <FlipCard
      front={
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
      }
      back={
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
      }
    ></FlipCard>
  );
};
