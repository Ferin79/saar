import { User } from "./User";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  tokenExpires: number;
  user: User;
}

// Register response is the same as login response
export type RegisterResponse = LoginResponse;

export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
  tokenExpires: number;
}

export interface AuthError {
  message: string;
  statusCode?: number;
}
