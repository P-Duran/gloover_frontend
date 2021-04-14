// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/bump
import { ResponsiveLine } from "@nivo/line";
import { Card } from "components/Card";
import { Fade, Box, Typography, makeStyles } from "@material-ui/core";

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

export const ChartCard = ({ data }: any) => {
  const classes = useStyles();
  return (
    <Card xs={12} sm={12} md={9}>
      <div>
        <Box fontWeight={600} fontSize={20} textAlign="left">
          Some Statistic
        </Box>
        <Typography variant="subtitle2" align="left">
          (+43%) than last year
        </Typography>
        <Fade in timeout={1500}>
          <Box className={classes.chart}>
            <ResponsiveLine
              data={data}
              colors={(data) => data.color}
              margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
              xScale={{ type: "point" }}
              yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: false,
                reverse: false,
              }}
              yFormat=" >-.2f"
              curve="monotoneX"
              enableSlices="x"
              axisTop={null}
              axisRight={null}
              xFormat="time:%Y-%m-%d"
              axisBottom={{
                orient: "bottom",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Time",
                legendOffset: 36,
                legendPosition: "middle",
              }}
              axisLeft={{
                orient: "left",
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "polarity",
                legendOffset: -40,
                legendPosition: "middle",
              }}
              enableGridX={false}
              lineWidth={4}
              pointSize={5}
              pointColor={{ from: "color", modifiers: [] }}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              pointLabelYOffset={-12}
              useMesh={true}
              tooltip={function (e) {
                console.log(e);
                return <>HOLA</>;
              }}
              markers={[
                {
                  axis: "x",
                  value: data[0].data[7].x,
                  lineStyle: { stroke: "#7575FD", strokeWidth: 2 },
                  legend: "V1.1",
                },
                {
                  axis: "x",
                  value: data[0].data[2].x,
                  lineStyle: { stroke: "#7575FD", strokeWidth: 2 },
                  legend: "V1.0",
                },
              ]}
              legends={[
                {
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: "left-to-right",
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: "circle",
                  symbolBorderColor: "rgba(0, 0, 0, .5)",
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
