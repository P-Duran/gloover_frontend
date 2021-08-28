import { getProductFeatureSentences } from "model/api/database/ProductFeatureApi";
import { useEffect, useState } from "react";
import { differenceInMonths, format, subMonths } from "date-fns";
import { ProductFeatureSentence } from "types/ProductFeatureTypes";
import { ResponsiveBar } from "@nivo/bar";
import { Typography, useTheme, Box } from "@material-ui/core";
import { BaseTooltip } from "common/charts/tooltips/BaseTooltip";
import { CircularIcon } from "common/CircularIcon";

interface Props {
  featureId?: string;
}
export const SentenceBarChar = ({ featureId }: Props) => {
  const [sentences, setSentences] = useState<ProductFeatureSentence[]>([]);
  const theme = useTheme();

  useEffect(() => {
    if (featureId) {
      setSentences([]);
      getProductFeatureSentences({
        feature_id: featureId,
        from_date: format(subMonths(new Date(), 12), "yyyy-MM-dd"),
        to_date: format(new Date(), "yyyy-MM-dd"),
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

  const algo = (date: Date, sentences: ProductFeatureSentence[]) => {
    const result: any = { positiveValue: 0, negativeValue: 0 };
    sentences
      .filter(
        (sentence) => differenceInMonths(new Date(sentence.date), date) === 0
      )
      .forEach((sentence) =>
        sentence.polarity > 0
          ? (result["positiveValue"] += sentence.polarity)
          : (result["negativeValue"] += sentence.polarity)
      );
    return result;
  };
  const barData = Array(12)
    .fill(0)
    .map((e, i) => {
      return {
        date: format(subMonths(new Date(), 12 - i), "yyyy-MM"),
        ...algo(subMonths(new Date(), 12 - i), sentences),
      };
    });
  return (
    <ResponsiveBar
      data={barData}
      keys={["positiveValue", "negativeValue"]}
      indexBy="date"
      margin={{ top: 5, right: 25, bottom: 25, left: 25 }}
      padding={0.05}
      maxValue={
        Math.max.apply(Math, [
          ...barData.map((data) => data.positiveValue),
          ...barData.map((data) => -data.negativeValue),
          7,
        ]) + 2
      }
      minValue={
        Math.min.apply(Math, [
          ...barData.map((data) => -data.positiveValue),
          ...barData.map((data) => data.negativeValue),
          -7,
        ]) - 2
      }
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={(e: any) => {
        return e.value > 0
          ? theme.palette.success.main
          : theme.palette.error.main;
      }}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      enableLabel={false}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Date",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Amount",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      tooltip={({ id, value, color, data }) => (
        <BaseTooltip>
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Typography
              variant="body2"
              style={{
                color: theme.palette.grey[700],
                backgroundColor: theme.palette.grey[200],
                borderRadius: 25,
                padding: "2px 10px 2px 10px",
                marginBottom: 10,
                display: "inline-block",
              }}
            >
              {data.date}
            </Typography>
            <Box display="flex" flexDirection="row" alignItems="center">
              <CircularIcon
                size={30}
                colors={value > 0 ? theme.palette.success : theme.palette.error}
              >
                {Math.abs(value)}
              </CircularIcon>
              <Typography style={{ marginLeft: 10 }}>
                {(value > 0 ? " positive" : " negative") +
                  " reviews for this feature"}
              </Typography>
            </Box>
          </Box>
        </BaseTooltip>
      )}
      theme={{
        tooltip: {
          container: {
            background: "transparent",
            boxShadow: "undefined",
          },
        },
      }}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  );
};
