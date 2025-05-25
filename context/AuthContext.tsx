import { getCurrentUser, loginWithEmail } from "@/services/authApi";
import { AuthStorageService } from "@/services/authStorage";
import { AuthError, LoginRequest, LoginResponse } from "@/types/auth";
import { User } from "@/types/User";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";

export type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (credentials: LoginRequest) => Promise<LoginResponse>;
  logout: () => void;
  error: string | null;
  clearError: () => void;
  checkAuthStatus: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkAuthStatus = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);

      const authState = await AuthStorageService.getStoredAuthState();

      if (authState.token && authState.isValid) {
        try {
          const user = await getCurrentUser();
          setUser(user);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Error fetching user data from API:", error);
          await AuthStorageService.clearAuthData();
          setIsAuthenticated(false);
          setUser(null);
        }
      } else if (authState.token && !authState.isValid) {
        await AuthStorageService.clearAuthData();
        setIsAuthenticated(false);
        setUser(null);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      await AuthStorageService.clearAuthData();
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await loginWithEmail(credentials);
      await AuthStorageService.storeAuthData(response);
      setIsAuthenticated(true);
      setUser(response.user);
      return response;
    } catch (err) {
      const authError = err as AuthError;
      setError(authError.message);
      throw authError;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    console.log("Logging out...");
    setIsLoading(true);

    try {
      // Clear stored tokens and user data
      await AuthStorageService.clearAuthData();

      setIsAuthenticated(false);
      setUser(null);
      setError(null);
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsLoading(false);
    }
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
        checkAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
