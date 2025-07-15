import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "/api/v1";

console.log(" Using API base URL:", baseURL);

const customFetch = axios.create({
  baseURL,
});

customFetch.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default customFetch;
