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

// Flag to prevent multiple refresh attempts
let isRefreshing = false;
let failedQueue: {
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

// Request interceptor to check token expiration before making requests
api.interceptors.request.use(
  async (config) => {
    // Skip token check for refresh endpoint
    if (config.url === "/auth/refresh") {
      return config;
    }

    const authState = await AuthStorageService.getStoredAuthState();

    if (authState.token && authState.tokenExpires) {
      const currentTime = Date.now();
      const timeUntilExpiry = authState.tokenExpires - currentTime;

      // If token expires in less than 5 minutes, try to refresh
      if (timeUntilExpiry < 5 * 60 * 1000 && authState.refreshToken) {
        if (!isRefreshing) {
          isRefreshing = true;

          try {
            const response = await axios.post(
              `${BACKEND_URL}/auth/refresh`,
              null,
              {
                headers: {
                  Authorization: `Bearer ${authState.refreshToken}`,
                },
              }
            );

            const { token, refreshToken, tokenExpires } = response.data;

            // Update stored tokens
            await AuthStorageService.updateTokens(
              token,
              refreshToken,
              tokenExpires
            );

            // Update API headers
            setAuthToken(token);

            // Update the current request with new token
            config.headers.Authorization = `Bearer ${token}`;

            processQueue(null, token);
            isRefreshing = false;

            return config;
          } catch (refreshError) {
            processQueue(refreshError, null);
            isRefreshing = false;

            // Clear auth data if refresh fails
            await AuthStorageService.clearAuthData();
            setAuthToken(null);

            throw refreshError;
          }
        } else {
          // If already refreshing, queue this request
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then((token) => {
            config.headers.Authorization = `Bearer ${token}`;
            return config;
          });
        }
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
