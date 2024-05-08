import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: import.meta.env.VITE_API_BASE_URL,
  // baseURL: 'https://spitech-backend.azurewebsites.net',
  baseURL: "http://localhost:3000",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
