import { LoginRequest, LoginResponse } from "@/types/auth";
import { User } from "@/types/User";
import { isAxiosError } from "axios";
import { api } from "./api";

export const loginWithEmail = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>(
      "/auth/email/login",
      credentials
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      const statusCode = error.response?.status;
      throw { message, statusCode };
    }
    throw { message: "Network error. Please check your connection." };
  }
};

export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await api.get<User>("/auth/me");
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Failed to get user data.";
      const statusCode = error.response?.status;
      throw { message, statusCode };
    }
    throw { message: "Network error. Please check your connection." };
  }
};

export default api;
