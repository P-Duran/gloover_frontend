import { CardMedia, Grid, makeStyles, Paper } from "@material-ui/core";
import { Canvas } from "components/layout/Canvas";
import { StatsCard } from "components/charts/StatsCard";
import { PieCard } from "components/charts/PieCard";
import { TableCard } from "components/table/TableCard";
import { GlobalContext } from "context/GlobalContextProvider";
import { useContext } from "react";
import {
  meanScoreProducts,
  reviewStatToPieData,
  totalAmountPieData,
} from "utils/ChartUtils";
import { ReviewsChart } from "./components/ReviewsChart";
import { useHistory } from "react-router-dom";
import { WelcomeCard } from "./components/WelcomeCard";
import { transformToTableData } from "utils/TableUtils";
import { AnimatedTooltip } from "components/tootltip/AnimatedTooltip";

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
  const { products, reviews } = useContext(GlobalContext);
  const history = useHistory();

  return (
    <Canvas spacing={3}>
      <WelcomeCard />
      <WelcomeCard />
      <StatsCard title="Total Products" amount={Object.keys(products).length} />
      <StatsCard
        title="Mean Score"
        amount={meanScoreProducts(Object.values(products))}
      />
      <StatsCard
        title="Total Reviews"
        amount={totalAmountPieData(reviewStatToPieData(reviews.stats))}
      />
      <Grid item xs={3} sm={3} />
      <PieCard
        data={reviewStatToPieData(reviews.stats)}
        title="Review Distribution"
        subtitle="Reviews for each product"
      />
      <ReviewsChart />
      <TableCard
        data={transformToTableData(Object.values(products)).map((row) => {
          return {
            data: {
              ...row.data,
              images: (
                <AnimatedTooltip
                  placement="right"
                  interactive
                  content={
                    <CardMedia
                      component="img"
                      image={row.data.images[0]}
                      height="140"
                    />
                  }
                >
                  <img
                    alt="Product not loaded"
                    src={row.data.images[0]}
                    height={40}
                  />
                </AnimatedTooltip>
              ),
            },
          };
        })}
        onClick={(e) =>
          history.push({
            pathname: "/product",
            search: "?id=" + e.data.asin,
          })
        }
        columnToShow={[
          "asin",
          "images",
          "number_of_reviews",
          "price",
          "rating",
        ]}
        title="Product"
      />
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
