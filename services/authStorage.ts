import { LoginResponse } from "@/types/auth";
import { User } from "@/types/User";
import * as SecureStore from "expo-secure-store";

// Storage keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  USER_DATA: "user_data",
  TOKEN_EXPIRES: "token_expires",
} as const;

export class AuthStorageService {
  /**
   * Store complete authentication data from login response
   */
  static async storeAuthData(response: LoginResponse): Promise<void> {
    try {
      await Promise.all([
        SecureStore.setItemAsync(STORAGE_KEYS.ACCESS_TOKEN, response.token),
        SecureStore.setItemAsync(
          STORAGE_KEYS.REFRESH_TOKEN,
          response.refreshToken
        ),
        SecureStore.setItemAsync(
          STORAGE_KEYS.USER_DATA,
          JSON.stringify(response.user)
        ),
        SecureStore.setItemAsync(
          STORAGE_KEYS.TOKEN_EXPIRES,
          response.tokenExpires.toString()
        ),
      ]);
    } catch (error) {
      console.error("Error storing auth data:", error);
      throw new Error("Failed to store authentication data");
    }
  }

  /**
   * Clear all stored authentication data
   */
  static async clearAuthData(): Promise<void> {
    try {
      await Promise.all([
        SecureStore.deleteItemAsync(STORAGE_KEYS.ACCESS_TOKEN),
        SecureStore.deleteItemAsync(STORAGE_KEYS.REFRESH_TOKEN),
        SecureStore.deleteItemAsync(STORAGE_KEYS.USER_DATA),
        SecureStore.deleteItemAsync(STORAGE_KEYS.TOKEN_EXPIRES),
      ]);
    } catch (error) {
      console.error("Error clearing auth data:", error);
      throw error;
    }
  }

  /**
   * Get access token
   */
  static async getAccessToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(STORAGE_KEYS.ACCESS_TOKEN);
    } catch (error) {
      console.error("Error retrieving access token:", error);
      return null;
    }
  }

  /**
   * Get refresh token
   */
  static async getRefreshToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(STORAGE_KEYS.REFRESH_TOKEN);
    } catch (error) {
      console.error("Error retrieving refresh token:", error);
      return null;
    }
  }

  /**
   * Get stored user data
   */
  static async getUserData(): Promise<User | null> {
    try {
      const userData = await SecureStore.getItemAsync(STORAGE_KEYS.USER_DATA);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error("Error retrieving user data:", error);
      return null;
    }
  }

  /**
   * Get token expiration time
   */
  static async getTokenExpires(): Promise<number | null> {
    try {
      const expires = await SecureStore.getItemAsync(
        STORAGE_KEYS.TOKEN_EXPIRES
      );
      return expires ? parseInt(expires, 10) : null;
    } catch (error) {
      console.error("Error retrieving token expiration:", error);
      return null;
    }
  }

  /**
   * Check if the stored token is still valid
   */
  static async isTokenValid(): Promise<boolean> {
    try {
      const [token, expires] = await Promise.all([
        this.getAccessToken(),
        this.getTokenExpires(),
      ]);

      if (!token || !expires) {
        return false;
      }

      const currentTime = Date.now();
      return currentTime < expires;
    } catch (error) {
      console.error("Error checking token validity:", error);
      return false;
    }
  }

  /**
   * Get complete stored auth state
   */
  static async getStoredAuthState(): Promise<{
    token: string | null;
    refreshToken: string | null;
    user: User | null;
    tokenExpires: number | null;
    isValid: boolean;
  }> {
    try {
      const [token, refreshToken, user, tokenExpires] = await Promise.all([
        this.getAccessToken(),
        this.getRefreshToken(),
        this.getUserData(),
        this.getTokenExpires(),
      ]);

      const isValid = await this.isTokenValid();

      return {
        token,
        refreshToken,
        user,
        tokenExpires,
        isValid,
      };
    } catch (error) {
      console.error("Error getting stored auth state:", error);
      return {
        token: null,
        refreshToken: null,
        user: null,
        tokenExpires: null,
        isValid: false,
      };
    }
  }
}
