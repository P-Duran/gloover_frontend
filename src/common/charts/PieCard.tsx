// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bump
import { ResponsivePie } from "@nivo/pie";
import { Card } from "common/Card";
import { Grow, Box, Typography, makeStyles } from "@material-ui/core";
import { PieChartTooltip } from "common/charts/tooltips/PieChartTooltip";
import { PieData } from "types/ChartTypes";
import { hashCode, intToRGB } from "utils/ColorUtils";

const useStyles = makeStyles((theme) => ({
  chart: {
    height: 400,
    [theme.breakpoints.up("sm")]: {
      height: 200,
    },
    [theme.breakpoints.up("xs")]: {
      height: 200,
    },
    [theme.breakpoints.up("md")]: {
      height: 400,
    },
  },
}));
const CenteredMetric = ({ dataWithArc, centerX, centerY }: any) => {
  let total = 0;
  dataWithArc.forEach((datum: any) => {
    total += datum.value;
  });

  return (
    <text
      x={centerX}
      y={centerY}
      textAnchor="middle"
      dominantBaseline="central"
      style={{
        fontSize: "50px",
        fontWeight: 500,
      }}
    >
      {total.toLocaleString()}
    </text>
  );
};

interface Props {
  data: PieData[];
  title?: string;
  subtitle?: string;
}
export const PieCard = ({ data, title, subtitle }: Props) => {
  const classes = useStyles();
  return (
    <Card xs={12} sm={12} md={3}>
      <div>
        <Box fontWeight={600} fontSize={20} textAlign="left">
          {title}
        </Box>
        <Typography variant="subtitle2" align="left">
          {subtitle}
        </Typography>
        <Grow in timeout={1500}>
          <Box className={classes.chart}>
            <ResponsivePie
              data={data}
              margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
              innerRadius={0.9}
              padAngle={2}
              cornerRadius={8}
              colors={(e) => {
                return intToRGB(hashCode(String(e.label)));
              }}
              borderWidth={1}
              borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
              enableRadialLabels={false}
              radialLabelsSkipAngle={10}
              radialLabelsTextColor="#333333"
              radialLabelsLinkColor={{ from: "color" }}
              sliceLabelsSkipAngle={7}
              enableSliceLabels={false}
              layers={[
                "slices",
                "sliceLabels",
                "radialLabels",
                "legends",
                CenteredMetric,
              ]}
              tooltip={function (e) {
                return (
                  <PieChartTooltip
                    key={e.datum.id}
                    data={e.datum.data}
                    color={e.datum.color}
                  />
                );
              }}
              legends={[]}
            />
          </Box>
        </Grow>
      </div>
    </Card>
  );
};
