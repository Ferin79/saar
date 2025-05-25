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

// Function to set the authorization token in default headers
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      // Token might be expired, clear auth data and remove token from headers
      try {
        await AuthStorageService.clearAuthData();
        setAuthToken(null);
      } catch (clearError) {
        console.error("Error clearing auth data:", clearError);
      }
    }
    return Promise.reject(error);
  }
);
