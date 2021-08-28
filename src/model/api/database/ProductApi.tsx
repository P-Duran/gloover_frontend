import axios from "axios";
const ip = "localhost"
export const getProducts = () => {
  return axios.get("http://"+ip+":5000/database/products");
};
