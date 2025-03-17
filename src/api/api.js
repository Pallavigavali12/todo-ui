import axios from "axios";

const api = axios.create({});

api.interceptors.request.use((config) => {
  const data = localStorage.getItem("token");
  config.headers.Authorization = data;
  return config;
});

export default api;
