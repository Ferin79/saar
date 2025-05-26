import { setAuthToken } from "@/services/api";
import {
  getCurrentUser,
  loginWithEmail,
  logoutUser,
  registerWithEmail,
} from "@/services/authApi";
import { AuthStorageService } from "@/services/authStorage";
import {
  AuthError,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/types/auth";
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
  register: (userData: RegisterRequest) => Promise<RegisterResponse>;
  logout: () => Promise<void>;
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

  const clearAuthState = useCallback(async () => {
    await AuthStorageService.clearAuthData();
    setAuthToken(null);
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  const setAuthenticatedState = useCallback((user: User, token: string) => {
    setAuthToken(token);
    setUser(user);
    setIsAuthenticated(true);
  }, []);

  const setUnauthenticatedState = useCallback(() => {
    setAuthToken(null);
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  const checkAuthStatus = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);

      const authState = await AuthStorageService.getStoredAuthState();

      // No token found - user is not authenticated
      if (!authState.token) {
        setUnauthenticatedState();
        return;
      }

      // Token exists but is expired - clear auth data
      if (!authState.isValid) {
        await clearAuthState();
        return;
      }

      // Token is valid - try to fetch current user
      try {
        setAuthToken(authState.token);
        const user = await getCurrentUser();
        setAuthenticatedState(user, authState.token);
      } catch (error) {
        console.error("Error fetching user data from API:", error);
        await clearAuthState();
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      await clearAuthState();
    } finally {
      setIsLoading(false);
    }
  }, [clearAuthState, setAuthenticatedState, setUnauthenticatedState]);

  // Initialize auth status on mount
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = useCallback(
    async (credentials: LoginRequest): Promise<LoginResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await loginWithEmail(credentials);
        await AuthStorageService.storeAuthData(response);
        setAuthenticatedState(response.user, response.token);
        return response;
      } catch (err) {
        const authError = err as AuthError;
        setError(authError.message);
        throw authError;
      } finally {
        setIsLoading(false);
      }
    },
    [setAuthenticatedState]
  );

  const register = useCallback(
    async (userData: RegisterRequest): Promise<RegisterResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await registerWithEmail(userData);
        await AuthStorageService.storeAuthData(response);
        setAuthenticatedState(response.user, response.token);
        return response;
      } catch (err) {
        const authError = err as AuthError;
        setError(authError.message);
        throw authError;
      } finally {
        setIsLoading(false);
      }
    },
    [setAuthenticatedState]
  );

  const logout = useCallback(async (): Promise<void> => {
    setIsLoading(true);

    try {
      await logoutUser();
      await clearAuthState();
      setError(null);
    } catch (error) {
      console.error("Error during logout:", error);
      await clearAuthState();
      setError(null);
    } finally {
      setIsLoading(false);
    }
  }, [clearAuthState]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const contextValue: AuthContextType = {
    isAuthenticated,
    isLoading,
    user,
    login,
    register,
    logout,
    error,
    clearError,
    checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
