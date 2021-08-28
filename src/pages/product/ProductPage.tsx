import { Canvas } from "common/layout/Canvas";
import { GlobalContext } from "context/GlobalContextProvider";
import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ProductInfoCard } from "./components/ProductInfoCard";
import { RankingCard } from "./components/RankingCard";
import FeatherIcon from "feather-icons-react";
import { Fab, Grid, List, makeStyles, useTheme } from "@material-ui/core";
import { ProductImageCard } from "./components/ProductImageCard";
import { motion } from "framer-motion";
import {
  getProductFeatures,
  getProductFeatureSentences,
  getProductFeaturesSentencesStats,
} from "model/api/database/ProductFeatureApi";
import { useState } from "react";
import {
  ProductFeature,
  ProductFeatureSentence,
  ProductFeatureSentencesStat,
} from "types/ProductFeatureTypes";
import { titleCase } from "utils/StringUtils";
import { RankingType } from "types/RankingTypes";
import { Chip } from "common/Chip";
import { AnimatedTooltip } from "common/tootltip/AnimatedTooltip";
import { TableCard } from "common/table/TableCard";
import { transformToTableData } from "utils/TableUtils";
import { PromiseBuilder, PromiseState } from "common/PromiseBuilder";
import { Skeleton } from "@material-ui/lab";
import { SentenceReviewChanger } from "./components/SentenceReviewChanger";
import { Statister } from "pages/product/components/Statistier/Statister";

const useStyles = makeStyles((theme) => ({
  floatingButton: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    position: "fixed",
  },
  center: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
}));

export const ProductPage = () => {
  const [features, setFeatures] = useState<ProductFeature[]>([]);
  const [featureStats, setFeaturesStats] = useState<
    ProductFeatureSentencesStat[]
  >([]);
  const { products } = useContext(GlobalContext);
  const history = useHistory();
  const theme = useTheme();
  const params = new URLSearchParams(history.location.search);
  const id = params.get("id");
  const classes = useStyles();

  const checkCorrectId = (id: string | null) => {
    return (
      id !== null &&
      Object.keys(products).length > 0 &&
      Object.keys(products).includes(id)
    );
  };

  const SubtitleGenerator = (feature: ProductFeatureSentencesStat) => {
    return (
      <Grid container alignItems="center">
        <AnimatedTooltip content={"Feature Appaerances"}>
          <Chip
            color={theme.palette.grey[900]}
            backgroundColor={theme.palette.grey[200]}
            style={{ marginRight: 5, padding: 5, fontSize: 10 }}
          >
            Times
          </Chip>
        </AnimatedTooltip>

        {feature.negative + feature.positive}
        <AnimatedTooltip content={"Positive Valorations (%)"}>
          <Chip
            size="small"
            padding={7}
            color={theme.palette.info.main}
            backgroundColor={theme.palette.info.light}
            style={{ marginLeft: 20, marginRight: 5 }}
          >
            <FeatherIcon icon="thumbs-up" />
          </Chip>
        </AnimatedTooltip>

        {(
          (feature.positive * 100) /
          (feature.negative + feature.positive)
        ).toFixed(2) + "%"}
      </Grid>
    );
  };

  useEffect(() => {
    setFeatures([]);
    setFeaturesStats([]);
    if (id !== null) {
      getProductFeatures({ product_asin: id as string })
        .then((result) => setFeatures(result.data.items as ProductFeature[]))
        .catch((e) => console.error(e));
      getProductFeaturesSentencesStats({
        product_asin: id as string,
        ranking_type: RankingType.WILSON,
      })
        .then((result) =>
          setFeaturesStats(result.data.items as ProductFeatureSentencesStat[])
        )
        .catch((e) => console.error(e));
    }
  }, [id]);

  return (
    checkCorrectId(id) && (
      <Canvas spacing={3}>
        <ProductImageCard product={products[id as string]} />
        <ProductInfoCard productId={id as string} />
        <RankingCard
          title="Top Features"
          titleIcon={<FeatherIcon icon="award" />}
          rankingTooltip="Ranking based on the number of reviews and how positive a feature is"
          elementTooltipGenerator={(e) =>
            "Calculated score of " +
            (e.value * 10).toFixed(2) +
            " using weighted median "
          }
          elementsBadgetContent={(e) => "Score " + (e.value * 10).toFixed(2)}
          elementsIcon="bar-chart-2"
          elements={
            features.length > 0
              ? featureStats.map((feature) => {
                  return {
                    title: titleCase(
                      features.filter((f) => f.id === feature.feature_id)[0]
                        .word
                    ),
                    subtitle: SubtitleGenerator(feature),
                    value: feature.score,
                  };
                })
              : []
          }
        />

        <RankingCard
          title="Most Talked About"
          titleIcon={<FeatherIcon icon="message-circle" />}
          rankingTooltip="Ranking based on the number of reviews and how positive a feature is"
          rankingColors={theme.palette.info}
          elementTooltipGenerator={(e) =>
            "'" + e.title + "' appears " + e.value + " times in the reviews"
          }
          elementsIcon="hash"
          elementsBadgetContent={(e) => e.value.toString() + " times"}
          elements={
            features.length > 0
              ? featureStats.map((feature) => {
                  return {
                    title: titleCase(
                      features.filter((f) => f.id === feature.feature_id)[0]
                        .word
                    ),
                    subtitle: SubtitleGenerator(feature),
                    value: feature.positive + feature.negative,
                  };
                })
              : []
          }
        ></RankingCard>
        <RankingCard
          title="Worst Features"
          titleIcon={<FeatherIcon icon="thumbs-down" />}
          rankingTooltip="Ranking based on the number of reviews and how negative a feature is"
          elementTooltipGenerator={(e) =>
            "Calculated score of " +
            (e.value * 10).toFixed(2) +
            " using weighted median "
          }
          elementsBadgetContent={(e) => (e.value * 10).toFixed(2)}
          sortFunction={(a, b) => a.value - b.value}
          elementColors={theme.palette.error}
          rankingColors={theme.palette.purple}
          elementsIcon="thumbs-down"
          elements={
            features.length > 0
              ? featureStats.map((feature) => {
                  return {
                    title: titleCase(
                      features.filter((f) => f.id === feature.feature_id)[0]
                        .word
                    ),
                    subtitle: SubtitleGenerator(feature),
                    value: feature.score,
                  };
                })
              : []
          }
        ></RankingCard>
        {featureStats.length > 0 ? (
          <Statister
            items={features.map((feature) => {
              const featureStat = featureStats.filter(
                (f) => feature.id === f.feature_id
              )[0];
              return {
                id: feature.id,
                title: feature.word,
                data: {
                  score: featureStat.score,
                  positiviness:
                    (featureStat.positive * 100) /
                    (featureStat.positive + featureStat.negative),
                },
              };
            })}
          ></Statister>
        ) : (
          <></>
        )}
        {featureStats.length > 0 ? (
          <TableCard
            data={transformToTableData(features)
              .map((row) => {
                const featureStat = featureStats.filter(
                  (f) => row.data.id === f.feature_id
                )[0];
                return {
                  data: {
                    ...row.data,
                    score: (featureStat.score * 10).toFixed(2),
                    positiviness: (
                      <Chip
                        style={{
                          width: 100,
                          backgroundColor:
                            (featureStat.positive * 100) /
                              (featureStat.positive + featureStat.negative) >
                            50
                              ? theme.palette.success.light
                              : theme.palette.error.light,
                          color:
                            (featureStat.positive * 100) /
                              (featureStat.positive + featureStat.negative) >
                            50
                              ? theme.palette.success.main
                              : theme.palette.error.main,
                        }}
                      >
                        {(
                          (featureStat.positive * 100) /
                          (featureStat.positive + featureStat.negative)
                        ).toFixed(2) + "%"}
                      </Chip>
                    ),
                  },
                  expandedData: (
                    <PromiseBuilder
                      promise={getProductFeatureSentences}
                      params={{
                        asin: id as string,
                        feature_id: row.data.id,
                      }}
                      builder={(state, value) => {
                        switch (state) {
                          case PromiseState.DONE:
                            const sentences = value.data
                              .items as ProductFeatureSentence[];
                            return (
                              <List>
                                {sentences.map((sentence) => (
                                  <SentenceReviewChanger
                                    sentence={sentence}
                                  ></SentenceReviewChanger>
                                ))}
                              </List>
                            );

                          default:
                            return <Skeleton></Skeleton>;
                        }
                      }}
                    ></PromiseBuilder>
                  ),
                };
              })
              .sort(
                (a, b) => parseFloat(b.data.score) - parseFloat(a.data.score)
              )}
            title="Features"
            columnToShow={["score", "word", "appearances", "positiviness"]}
          ></TableCard>
        ) : (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={classes.floatingButton}
          >
            <Fab color="primary">
              <AnimatedTooltip
                content="Refresh the features for this product"
                disableChildrenAnimation
              >
                <div className={classes.center}>
                  <FeatherIcon icon="refresh-ccw" />
                </div>
              </AnimatedTooltip>
            </Fab>
          </motion.div>
        )}
      </Canvas>
    )
  );
};
