import { Box, makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { getProductFeatureSentences } from "model/api/database/ProductFeatureApi";
import { useEffect, useState } from "react";
import { ProductFeatureSentence } from "types/ProductFeatureTypes";
const useStyles = makeStyles((theme) => ({
  positive: {
    display: "inline-block",
    borderRadius: 25,
    padding: 10,
    margin: 5,
    color: theme.palette.success.main,
    backgroundColor: theme.palette.success.light,
  },
  negative: {
    display: "inline-block",
    borderRadius: 25,
    padding: 10,
    margin: 5,
    color: theme.palette.error.main,
    backgroundColor: theme.palette.error.light,
  },
}));

interface Props {
  featureId?: string;
}
export const SentencesCarousel = ({ featureId }: Props) => {
  const [sentences, setSentences] = useState<ProductFeatureSentence[]>([]);
  const classes = useStyles();

  useEffect(() => {
    if (featureId) {
      setSentences([]);
      getProductFeatureSentences({
        feature_id: featureId,
      })
        .then((result) =>
          setSentences(
            result.data.items.sort(
              (a: ProductFeatureSentence, b: ProductFeatureSentence) =>
                new Date(a.date) > new Date(b.date) ? 1 : -1
            )
          )
        )
        .catch((error) => console.error(error));
    }
  }, [featureId]);

  return (
    <>
      {sentences.length > 0 ? (
        sentences.slice(0, 3).map((sentence) => (
          <Box
            p={1}
            m={1}
            borderRadius={15}
            className={classes[sentence.polarity > 0 ? "positive" : "negative"]}
          >
            {"..." + sentence.sentence.slice(0, sentence.start)}
            <Box
              display="inline-block"
              fontWeight={600}
              fontStyle="oblique"
              color={sentence.polarity > 0 ? "green" : "red"}
            >
              {sentence.word}
            </Box>
            {sentence.sentence.slice(
              sentence.end,
              sentence.sentence.length - 1
            ) + "..."}
          </Box>
        ))
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Skeleton
            variant="rect"
            height={35}
            width={"60%"}
            style={{ borderRadius: 25, padding: 10, margin: 5 }}
          />
          <Skeleton
            variant="rect"
            height={40}
            width={"30%"}
            style={{ borderRadius: 25, padding: 10, margin: 5 }}
          />
          <Skeleton
            variant="rect"
            height={40}
            width={"70%"}
            style={{ borderRadius: 25, padding: 10, margin: 5 }}
          />
        </Box>
      )}
    </>
  );
};
