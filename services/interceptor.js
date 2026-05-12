import axios from "axios";

const interceptor = axios.create({
  baseURL: "https://finnhub.io/api/v1",
});

interceptor.interceptors.request.use((config) => {
  console.log(process.env.FINNHUB_API_KEY);
  config.params.token = process.env.FINNHUB_API_KEY;
  return config;
});

export default interceptor;
