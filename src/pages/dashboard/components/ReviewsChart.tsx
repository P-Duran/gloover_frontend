import { IconButton } from "@material-ui/core";
import { ChartCard } from "common/charts/ChartCard";
import { GlobalContext } from "context/GlobalContextProvider";
import { getReviews } from "model/api/database/ReviewApi";
import { useEffect, useState, useContext } from "react";
import { ChartData } from "types/ChartTypes";
import { Review } from "types/ReviewsTypes";
import FeatherIcon from "feather-icons-react";
import { format, addMonths, subMonths, formatDistance } from "date-fns";

interface Props {
  limit?: number;
  asin?: string;
}
export const ReviewsChart = ({ limit = 0, asin }: Props) => {
  const [data, setData] = useState<ChartData[]>([]);
  const { products } = useContext(GlobalContext);
  const [date, setDate] = useState<Date>(subMonths(new Date(), 1));

  useEffect(() => {
    if (Object.keys(products).length > 0) {
      getReviews({
        limit: limit,
        asin: asin,
        page: 1,
        from_date: format(date, "yyyy-MM-dd"),
        to_date: format(new Date(), "yyyy-MM-dd"),
      }).then((response: any) => {
        const chartifiedData: Record<string, ChartData> = {};
        Object.keys(products).forEach(
          (asin) => (chartifiedData[asin] = { id: asin, data: [] })
        );
        const reviews: Review[] = response.data.items;
        reviews
          .sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1))
          .forEach((review: Review) => {
            const date = new Date(review.date).toISOString();
            chartifiedData[review.asin].data.push({
              x: date,
              y: review.polarity,
            });
          });
        setData(Object.values(chartifiedData));
      });
    }
  }, [asin, date, limit, products]);
  return data.length > 0 ? (
    <ChartCard
      data={data}
      actions={
        <>
          <IconButton onClick={() => setDate(subMonths(date, 1))}>
            <FeatherIcon icon={"chevron-left"} />
          </IconButton>
          {formatDistance(date, new Date())}
          <IconButton onClick={() => setDate(addMonths(date, 1))}>
            <FeatherIcon icon={"chevron-right"} />
          </IconButton>
        </>
      }
    />
  ) : (
    <></>
  );
};
