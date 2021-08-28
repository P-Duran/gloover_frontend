import axios from "axios";
const ip = "localhost"
export const getReviewStats = () => {
  return axios.get("http://"+ip+":5000/database/reviews/statistics");
};

interface Parameters1 {
  limit: number;
  page: number;
  asin?: string;
  from_date?: string;
  to_date?: string;
}
export const getReviews = (params: Parameters1) => {
  return axios.get("http://"+ip+":5000/database/reviews", {
    params: params,
  });
};

interface Parameters2 {
  id: string;
}
export const getReviewById = (params: Parameters2) => {
  return axios.get("http://"+ip+":5000/database/reviews/" + params.id);
};
