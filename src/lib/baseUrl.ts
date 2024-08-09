// lib/apiClient.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL:
    "https://nmtb1f8pzc.execute-api.ap-southeast-2.amazonaws.com/default/task4",
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
