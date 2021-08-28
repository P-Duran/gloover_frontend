import { Card } from "common/Card";
import {
  Grid,
  GridSize,
  Typography,
  Box,
  makeStyles,
  useTheme,
  Grow,
} from "@material-ui/core";
import FeatherIcon from "feather-icons-react";
import { AnimatedCounter } from "common/counter/AnimatedCounter";
import { AnimatedTooltip } from "common/tootltip/AnimatedTooltip";

const useStyles = makeStyles((theme) => ({
  growing: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    height: 30,
    width: 30,
    borderRadius: 100,
    padding: theme.spacing(1),
    background: theme.palette.success.light,
    color: theme.palette.success.main,
  },
  decreasing: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    height: 30,
    width: 30,
    borderRadius: 100,
    padding: theme.spacing(1),
    background: theme.palette.error.light,
    color: theme.palette.error.main,
  },
}));
const mockChart = (color: string) => {
  return (
    <Grid container alignItems="baseline">
      {new Array(10).fill(1).map((item, index) => (
        <Grid item key={item + index}>
          <Box
            style={{
              marginLeft: 1,
              height: (Math.random() + 0.2) * 20,
              width: 4,
              backgroundColor: color,
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};
interface Props {
  title?: string;
  amount?: number;
  percentage?: number;
  size?: GridSize;
}
export const StatsCard = ({
  title = "Title",
  amount = 0,
  percentage = 0,
  size = 3,
}: Props) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Card xs={12} sm={6} md={size}>
      <Grid
        item
        container
        direction="column"
        alignItems="flex-start"
        spacing={1}
      >
        <Grid item>
          <Typography variant="h6">{title}</Typography>
        </Grid>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="baseline"
        >
          <Grow in timeout={Math.random() * 2 + 0.5 + 500}>
            <Grid item container alignItems="center" xs={6}>
              <AnimatedTooltip content={"Hola"}>
                <Box
                  className={
                    percentage >= 0 ? classes.growing : classes.decreasing
                  }
                >
                  <FeatherIcon
                    icon={percentage >= 0 ? "trending-up" : "trending-down"}
                  />
                </Box>
              </AnimatedTooltip>
              <Box
                px={1}
                color={
                  percentage >= 0
                    ? theme.palette.success.main
                    : theme.palette.error.main
                }
              >
                <AnimatedCounter
                  number={percentage}
                  symbol="%"
                  duration={300}
                />
              </Box>
            </Grid>
          </Grow>

          <Grid item>{mockChart(theme.palette.primary.main)}</Grid>
        </Grid>
        <Grow in timeout={Math.random() * 2 + 0.5 + 1000}>
          <Grid item xs={3}>
            <Box fontWeight={500} fontSize={28}>
              <AnimatedCounter number={amount} duration={500} />
            </Box>
          </Grid>
        </Grow>
      </Grid>
    </Card>
  );
};
