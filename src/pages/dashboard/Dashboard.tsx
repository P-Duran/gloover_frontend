import { Grid } from "@material-ui/core";
import { Canvas } from "common/layout/Canvas";
import { StatsCard } from "common/charts/StatsCard";
import { PieCard } from "common/charts/PieCard";
import { GlobalContext } from "context/GlobalContextProvider";
import { useContext } from "react";
import {
  meanScoreProducts,
  reviewStatToPieData,
  totalAmountPieData,
} from "utils/ChartUtils";
import { ReviewsChart } from "./components/ReviewsChart";
import { WelcomeCard } from "./components/WelcomeCard";
import { ProductsTable } from "./components/ProductsTable";

export const Dashboard = () => {
  const { products, reviews } = useContext(GlobalContext);

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
      <ProductsTable />
    </Canvas>
  );
};
