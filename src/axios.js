import axios from "axios";

// Create instance
const axiosInstance = axios.create({
  baseURL: "http://104.236.100.170/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const csrf_token = localStorage.getItem("csrf_token");
    if (csrf_token) {
      config.headers["csrf-token"] = csrf_token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.message;

      if (status === 401) {
        console.warn("Unauthorized! Redirecting to login.");
        localStorage.clear(); // optional
        window.location.href = "/login";
      } else if (status === 400) {
        alert(message); // Show error message from backend
      } else if (status === 403) {
        console.warn("Forbidden! You don’t have permission.");
      } else if (status === 500) {
        console.warn("Server error! Please try again later.");
      }
    } else {
      console.error("Network Error: ", error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
