import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

export const useSecureStorage = (key: string) => {
  const [value, setValue] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getItem = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const storedValue = await SecureStore.getItemAsync(key);
      setValue(storedValue);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to retrieve item");
      setValue(null);
    } finally {
      setIsLoading(false);
    }
  };

  const setItem = async (newValue: string) => {
    try {
      setError(null);
      await SecureStore.setItemAsync(key, newValue);
      setValue(newValue);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to store item");
      throw err;
    }
  };

  const deleteItem = async () => {
    try {
      setError(null);
      await SecureStore.deleteItemAsync(key);
      setValue(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete item");
      throw err;
    }
  };

  useEffect(() => {
    getItem();
  }, [key]);

  return {
    value,
    isLoading,
    error,
    setItem,
    deleteItem,
    refresh: getItem,
  };
};

// Utility functions for common auth tokens
export const useAccessToken = () => useSecureStorage("access_token");
export const useRefreshToken = () => useSecureStorage("refresh_token");
export const useUserData = () => {
  const { value, isLoading, error, setItem, deleteItem, refresh } =
    useSecureStorage("user_data");

  const parsedValue = value ? JSON.parse(value) : null;

  const setUserData = async (userData: any) => {
    await setItem(JSON.stringify(userData));
  };

  return {
    value: parsedValue,
    isLoading,
    error,
    setItem: setUserData,
    deleteItem,
    refresh,
  };
};
