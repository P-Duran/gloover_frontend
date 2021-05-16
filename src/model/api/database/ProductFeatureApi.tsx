import axios from "axios";
import { RankingType } from "types/RankingTypes";

interface Parameters {
  product_asin?: string;
}
export const getProductFeatures = (params: Parameters) => {
  return axios.get("http://localhost:5000/database/features", {
    params: params,
  });
};

interface Parameters {
  product_asin?: string;
  ranking_type?: RankingType;
}
export const getProductFeaturesSentencesStats = (params: Parameters) => {
  return axios.get(
    "http://localhost:5000/database/features/sentences/statistics",
    {
      params: params,
    }
  );
};

interface Parameters {
  asin?: string;  
  feature_id?: string;
  page?: number;
  limit?: number;
}
export const getProductFeatureSentences = (params: Parameters) => {
  return axios.get("http://localhost:5000/database/features/sentences", {
    params: params,
  });
};
