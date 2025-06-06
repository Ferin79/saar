import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/types/auth";
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

export const registerWithEmail = async (
  userData: RegisterRequest
): Promise<RegisterResponse> => {
  try {
    const response = await api.post<RegisterResponse>(
      "/email/register",
      userData
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
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

export const logoutUser = async (): Promise<void> => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Logout failed. Please try again.";
      const statusCode = error.response?.status;
      throw { message, statusCode };
    }
    throw { message: "Network error. Please check your connection." };
  }
};

export default api;
