import { CardMedia, Chip, CircularProgress } from "@material-ui/core";
import { TableCard } from "common/table/TableCard";
import { AnimatedTooltip } from "common/tootltip/AnimatedTooltip";
import { GlobalContext } from "context/GlobalContextProvider";
import { ProgressContext } from "context/ProgressContextProvider";
import json5 from "json5";
import { jobsEventSource } from "model/api/scraper/ScraperApi";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { TableData } from "types/TableCardTypes";
import { transformToTableData } from "utils/TableUtils";

export const ProductsTable = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const { products } = useContext(GlobalContext);
  const { productsProgress } = useContext(ProgressContext);
  const history = useHistory();

  jobsEventSource.onmessage = function (e) {
    const tmpJobs = json5.parse(e.data);

    setJobs(
      Object.values(tmpJobs).filter((job: any) => job.id in productsProgress)
    );
  };
  const addProgressProducts = (data: TableData): TableData => {
    const toAppend = jobs.map((job) => {
      return {
        data: {
          asin: productsProgress[job.id],
          rating: <CircularProgress size={25} />,
          number_of_reviews: job.scraped_items,
          images: <Chip label={job.state} color="secondary" />,
        },
      };
    });
    return [...data, ...toAppend];
  };
  return (
    <TableCard
      data={addProgressProducts(
        transformToTableData(Object.values(products)).map((row) => {
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
        })
      )}
      onClick={(e) =>
        history.push({
          pathname: "/product",
          search: "?id=" + e.data.asin,
        })
      }
      columnToShow={["asin", "images", "number_of_reviews", "price", "rating"]}
      title="Product"
    />
  );
};
