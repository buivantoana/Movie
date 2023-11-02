import axios from "axios";
import _ from "lodash";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3/movie",
});
instance.defaults.withCredentials = true;
instance.interceptors.response.use((response) => {
  const { data } = response;
  return data;
});

export default instance;
