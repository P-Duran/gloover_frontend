import { hexToRgb, makeStyles, useTheme } from "@material-ui/core";
import { ResponsivePie } from "@nivo/pie";
import { Animator } from "common/animation/Animation";
import { interpolateColors } from "utils/ColorUtils";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    height: "100%",
    width: "100%",
    maxWidth: (props: any) => props.maxWidth,
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

interface Props {
  value: number;
  total: number;
  maxWidth?: number;
  duration?: number;
}

export const PercentagePie = ({
  value,
  total,
  maxWidth,
  duration = 200,
}: Props) => {
  const classes = useStyles({ value, total, maxWidth });
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <Animator
        value={value}
        duration={duration}
        builder={(animatedValue) => (
          <>
            <ResponsivePie
              data={[
                {
                  id: "transparent",
                  label: "sass",
                  value: total - animatedValue,
                  color: "transparent",
                },
                {
                  id: "sass",
                  label: "sass",
                  value: animatedValue,
                  color:
                    animatedValue < total / 2
                      ? interpolateColors(
                          hexToRgb(theme.palette.error.main),
                          hexToRgb(theme.palette.secondary.main),
                          (animatedValue / total) * 2
                        )
                      : interpolateColors(
                          hexToRgb(theme.palette.secondary.main),
                          hexToRgb(theme.palette.success.main),
                          (animatedValue / total - 0.5) * 2
                        ),
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
            <div
              className={classes.overlay}
              style={{
                backgroundColor:
                  animatedValue < total / 2
                    ? interpolateColors(
                        hexToRgb(theme.palette.error.light),
                        hexToRgb(theme.palette.secondary.light),
                        (animatedValue / total) * 2
                      )
                    : interpolateColors(
                        hexToRgb(theme.palette.secondary.light),
                        hexToRgb(theme.palette.success.light),
                        (animatedValue / total - 0.5) * 2
                      ),
                color:
                  animatedValue < total / 2
                    ? interpolateColors(
                        hexToRgb(theme.palette.error.main),
                        hexToRgb(theme.palette.secondary.main),
                        (animatedValue / total) * 2
                      )
                    : interpolateColors(
                        hexToRgb(theme.palette.secondary.main),
                        hexToRgb(theme.palette.success.main),
                        (animatedValue / total - 0.5) * 2
                      ),
              }}
            >
              {((animatedValue * 100) / total).toFixed(0)}%
            </div>
          </>
        )}
      />
    </div>
  );
};
