import { BACKEND_URL } from "@/constants/Backend";
import axios from "axios";
import { AuthStorageService } from "./authStorage";

export const api = axios.create({
  baseURL: BACKEND_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add Bearer token to all requests
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AuthStorageService.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error getting access token for request:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      // Token might be expired, clear auth data
      try {
        await AuthStorageService.clearAuthData();
      } catch (clearError) {
        console.error("Error clearing auth data:", clearError);
      }
    }
    return Promise.reject(error);
  }
);
