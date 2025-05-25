import { User } from "./User";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  tokenExpires: number;
  user: User;
}

export interface AuthError {
  message: string;
  statusCode?: number;
}
