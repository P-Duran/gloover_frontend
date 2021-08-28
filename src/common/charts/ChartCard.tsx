// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bump
import { ResponsiveLine, Serie } from "@nivo/line";
import { Card } from "common/Card";
import {
  Fade,
  Box,
  Typography,
  makeStyles,
  Grid,
  fade,
} from "@material-ui/core";
import { LineChartTooltip } from "./tooltips/LineChartTooltip";
import { useState } from "react";
import { hashCode, intToRGB } from "utils/ColorUtils";

const useStyles = makeStyles((theme) => ({
  chart: {
    height: 400,
    [theme.breakpoints.up("sm")]: {
      height: 200,
    },
    [theme.breakpoints.up("xs")]: {
      height: 300,
    },
    [theme.breakpoints.up("md")]: {
      height: 400,
    },
  },
}));
interface Props {
  data: Serie[];
  actions?: React.ReactNode;
}
export const ChartCard = ({ data, actions }: Props) => {
  const [visibleId, setVisibleId] = useState<string>();
  const classes = useStyles();
  const handleClick = (event: any) => {
    setVisibleId(visibleId === event.id ? undefined : (event.id as string));
  };
  return (
    <Card xs={12} sm={12} md={9}>
      <div>
        <Grid container direction="row">
          <Grid item container direction="column" xs={6}>
            <Box fontWeight={600} fontSize={20} textAlign="left">
              Some Statistic
            </Box>
            <Typography variant="subtitle2" align="left">
              (+43%) than last year
            </Typography>
          </Grid>
          <Grid item xs={6}>
            {actions}
          </Grid>
        </Grid>
        <Fade in timeout={1500}>
          <Box className={classes.chart}>
            <ResponsiveLine
              data={data}
              margin={{ top: 50, right: 160, bottom: 50, left: 60 }}
              xScale={{
                type: "time",
                format: "%Y-%m-%dT%H:%M:%S.%L%Z",
                useUTC: false,
                precision: "day",
              }}
              xFormat="time:%d/%m/%Y"
              yScale={{
                type: "linear",
                stacked: false,
              }}
              curve="monotoneX"
              axisTop={null}
              axisRight={{
                tickValues: [0.0, 0.2, 0.4, 0.6, 0.8, 1.0],
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                format: "0.2",
                legend: "",
                legendOffset: 0,
              }}
              axisBottom={{
                format: "%d/%m/%Y",
                tickValues: 8,
                legend: "time scale",
                legendOffset: -12,
              }}
              axisLeft={{
                legend: "linear scale",
                legendOffset: 12,
              }}
              enableGridX={false}
              colors={(e) =>
                fade(
                  intToRGB(hashCode(e.id)),
                  e.id === visibleId || !visibleId ? 1 : 0.2
                )
              }
              lineWidth={3}
              pointSize={3}
              pointColor={{ theme: "background" }}
              pointBorderWidth={4}
              pointBorderColor={{ from: "serieColor" }}
              enablePointLabel={false}
              pointLabel="y"
              pointLabelYOffset={-12}
              useMesh={true}
              enableSlices={false}
              tooltip={(e) =>
                e.point.serieId === visibleId || !visibleId ? (
                  <LineChartTooltip
                    data={e.point}
                    color={e.point.borderColor}
                  />
                ) : (
                  <></>
                )
              }
              legends={[
                {
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 140,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemDirection: "left-to-right",
                  itemWidth: 80,
                  itemHeight: 12,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: "circle",
                  symbolBorderColor: "rgba(0, 0, 0, .5)",
                  onClick: handleClick,
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemBackground: "rgba(0, 0, 0, .03)",
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
            />
          </Box>
        </Fade>
      </div>
    </Card>
  );
};
