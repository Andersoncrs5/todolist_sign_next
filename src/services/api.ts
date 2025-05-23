import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:4000/",
});

api.interceptors.request.use((config) => {
  const token: string | null = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;