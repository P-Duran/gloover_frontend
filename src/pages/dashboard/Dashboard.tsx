import { Grid, makeStyles, Paper } from "@material-ui/core";
import { Canvas } from "components/layout/Canvas";
import { lineData, pieData } from "constants/sizes";
import { StatsCard } from "components/charts/StatsCard";
import { ChartCard } from "components/charts/ChartCard";
import { PieCard } from "components/charts/PieCard";
import { TableCard } from "components/table/TableCard";
import { testData } from "types/Product";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    height: 100,
    textAlign: "center",
    color: theme.palette.text.secondary,
    borderRadius: 25,
    boxShadow: "0px 2px 15px 1px rgba(0, 0, 0, 0.1)",
  },
}));
export const Dashboard = () => {
  const classes = useStyles();
  return (
    <Canvas spacing={3}>
      <StatsCard title="Total Reviews" amount={345} />
      <StatsCard title="Mean Score" amount={4.8} percentage={-0.65} />
      <StatsCard title="Total Algo" amount={18765} percentage={0.4} />
      <Grid item xs={3} sm={3} />
      <PieCard data={pieData} />
      <ChartCard data={lineData} />
      <TableCard data={testData} title="Product" />
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}>xs=12 sm=6</Paper>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Paper className={classes.paper}>xs=6 sm=3</Paper>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Paper className={classes.paper}>xs=6 sm=3</Paper>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Paper className={classes.paper}>xs=6 sm=3</Paper>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Paper className={classes.paper}>xs=6 sm=3</Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>xs=12</Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}>xs=12 sm=6</Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper className={classes.paper}>xs=12 sm=6</Paper>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Paper className={classes.paper}>xs=6 sm=3</Paper>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Paper className={classes.paper}>xs=6 sm=3</Paper>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Paper className={classes.paper}>xs=6 sm=3</Paper>
      </Grid>
      <Grid item xs={6} sm={3}>
        <Paper className={classes.paper}>xs=6 sm=3</Paper>
      </Grid>
    </Canvas>
  );
};
