import { loginWithEmail } from "@/services/authApi";
import { AuthError, LoginRequest, LoginResponse } from "@/types/auth";
import { User } from "@/types/User";
import { createContext, PropsWithChildren, useState } from "react";

export type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (credentials: LoginRequest) => Promise<LoginResponse>;
  logout: () => void;
  error: string | null;
  clearError: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await loginWithEmail(credentials);
      setIsAuthenticated(true);
      setUser(response.user);

      // Store tokens in secure storage if needed
      // You might want to use expo-secure-store here

      return response;
    } catch (err) {
      const authError = err as AuthError;
      setError(authError.message);
      throw authError;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    console.log("Logging out...");
    setIsAuthenticated(false);
    setUser(null);
    setError(null);
    // Clear stored tokens if any
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        login,
        logout,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
