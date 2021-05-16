import { PieData } from "types/ChartTypes";
import { Product } from "types/ProductTypes";
import { ReviewStat } from "types/ReviewsTypes";

export const totalAmountPieData = (data: PieData[]) =>
  data.reduce((a, b) => a + (b.value || 0), 0);

export const meanScoreProducts = (products: Product[]) =>
  products.reduce((a, b) => a + (b.rating || 0), 0) / products.length;

export const reviewStatToPieData = (reviewSats: ReviewStat[]): PieData[] =>
  reviewSats.map((stat: ReviewStat) => {
    return {
      id: stat.id,
      label: stat.asin,
      value: stat.negative_reviews + stat.positive_reviews,
    };
  });

export const reviewStatToPieDataPosNegReviews = (
  reviewSats: ReviewStat[],
  asin: string
): PieData[] => {
  const reviewStat = reviewSats.filter((stat) => stat.asin === asin)[0];
  return [
    { id: "0", label: "Positive Reviews", value: reviewStat.positive_reviews },
    { id: "0", label: "Negative Reviews", value: reviewStat.negative_reviews },
  ];
};
