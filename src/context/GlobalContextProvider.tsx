import { getProducts } from "model/api/database/ProductApi";
import { getReviewStats } from "model/api/database/ReviewApi";
import React, { useEffect, useState } from "react";
import { Product } from "types/ProductTypes";
import { ReviewsInformation, ReviewStat } from "types/ReviewsTypes";

interface Context {
  products: Record<string, Product>;
  reviews: ReviewsInformation;
}
interface Props {
  children: JSX.Element;
}

const initGlobalContext = (): Context => {
  return {
    products: {},
    reviews: {
      stats: [],
    },
  };
};

export const GlobalContext = React.createContext(initGlobalContext());

export const GlobalContextProvider = ({ children }: Props) => {
  const [context, setContext] = useState<Context>(initGlobalContext());

  useEffect(() => {
    async function fetchData() {
      const productResponse = await getProducts();
      const reviewStatsResponse = await getReviewStats();
      const ReviewsInfo: ReviewsInformation = {
        ...context.reviews,
        stats: reviewStatsResponse.data.items as ReviewStat[],
      };
      setContext({
        products: productResponse.data.items as Record<string, Product>,
        reviews: ReviewsInfo,
      });
    }
    fetchData();
  }, []);

  return (
    <GlobalContext.Provider value={context}>{children}</GlobalContext.Provider>
  );
};
