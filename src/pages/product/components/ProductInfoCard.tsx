import {
  hexToRgb,
  makeStyles,
  useTheme,
} from "@material-ui/core";
import { Card } from "components/Card";
import { ResponsivePie } from "@nivo/pie";
import { interpolateColors } from "utils/ColorUtils";
import FeatherIcon from "feather-icons-react";
import { useContext } from "react";
import { GlobalContext } from "context/GlobalContextProvider";

interface Props {
  productId: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    height: 200,
    width: "100%",
  },
  overlay: {
    position: "absolute",
    top: "50%",
    right: "50%",
    WebkitTransform: "translate(+50%, -50%)",
    color: (props: any) =>
      props.value >= 50
        ? theme.palette.success.main
        : theme.palette.purple.main,
    fontSize: 25,
    padding: 10,
    borderRadius: 25,
    backgroundColor: (props: any) =>
      props.value >= 50
        ? theme.palette.success.light
        : theme.palette.purple.light,
    // This is important to preserve the chart interactivity
    pointerEvents: "none",
  },
}));

export const ProductInfoCard = ({ productId }: Props) => {
  const { reviews } = useContext(GlobalContext);
  const positive_reviews = reviews.stats.filter(
    (stat) => stat.asin === productId
  )[0].positive_reviews;
  const negative_reviews = reviews.stats.filter(
    (stat) => stat.asin === productId
  )[0].negative_reviews;
  const total = positive_reviews + negative_reviews;
  const classes = useStyles({ value: (positive_reviews * 100) / total });
  const theme = useTheme();
  return (
    <Card xs={12} sm={12} md={3} style={{ height: "100%" }}>
      <div className={classes.root}>
        <ResponsivePie
          data={[
            {
              id: "transparent",
              label: "sass",
              value: reviews.stats.filter((stat) => stat.asin === productId)[0]
                .negative_reviews,
              color: "transparent",
            },
            {
              id: "sass",
              label: "sass",
              value: reviews.stats.filter((stat) => stat.asin === productId)[0]
                .positive_reviews,
              color:
                positive_reviews < total / 2
                  ? interpolateColors(
                      hexToRgb(theme.palette.error.main),
                      hexToRgb(theme.palette.secondary.main),
                      (positive_reviews / total) * 2
                    )
                  : interpolateColors(
                      hexToRgb(theme.palette.secondary.main),
                      hexToRgb(theme.palette.success.main),
                      (positive_reviews / total - 0.5) * 2
                    ),
              // value >= 50
              //   ? theme.palette.success.main
              //   : theme.palette.error.main,
            },
          ]}
          startAngle={0}
          endAngle={360}
          innerRadius={0.85}
          cornerRadius={45}
          colors={(e) => e.data.color}
          enableRadialLabels={false}
          enableSliceLabels={false}
          legends={[]}
          tooltip={function (e) {
            return <div key={e.datum.id}> </div>;
          }}
        />
        <div className={classes.overlay}>
          {((positive_reviews * 100) / total).toFixed(0)}%
          <FeatherIcon icon="thumbs-up" size={25} style={{ marginLeft: 7 }} />
        </div>
      </div>
    </Card>
  );
};
