import axios from "axios";
import NProgress from "nprogress";
import { store } from "../redux/store";

NProgress.configure({ showSpinner: false, trickleSpeed: 100 }); // NProgress Configuration

// Create a custom Axios instance
const instance = axios.create({
  baseURL: "http://localhost:8081/", // Set your base URL here
  timeout: 5000, // Set the request timeout in milliseconds
});

// Add request interceptors
instance.interceptors.request.use(
  (config) => {
    const access_token = store?.getState()?.user?.account?.access_token;
    config.headers["Authorization"] = `Bearer ${access_token}`; // Set JWT token
    NProgress.start(); // Start the request progress
    // Modify the request config if needed
    // For example, you can add authentication headers here
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Add response interceptors
instance.interceptors.response.use(
  (response) => {
    NProgress.done(); // Stop the request progress
    // Modify the response data if needed
    // For example, you can transform the response data here
    return response && response.data ? response.data : response;
  },
  (error) => {
    // Handle response errors
    return Promise.reject(error);
  }
);

export default instance;
