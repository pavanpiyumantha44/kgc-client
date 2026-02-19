import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;
if (!baseURL) throw new Error("VITE_API_BASE_URL is not defined");

const API = axios.create({
  baseURL,
  withCredentials: true,
});

// TS will infer the type of config automatically
API.interceptors.request.use((config) => {
  const storedAuth = localStorage.getItem("auth");
  const auth = storedAuth ? JSON.parse(storedAuth) : null;

  if (auth?.token) {
    if (!config.headers) config.headers = {};
    config.headers.Authorization = `Bearer ${auth.token}`;
  }

  return config;
});

export default API;
