import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { AuthContextProvider } from "@/context/AuthContext";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useColorScheme } from "@/hooks/useColorScheme";

function RootNavigator() {
  const segments = useSegments();
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(app)";

    if (!isAuthenticated && inAuthGroup) {
      // Redirect to sign-in if not authenticated and trying to access protected routes
      router.replace("/auth/sign-in");
    } else if (isAuthenticated && !inAuthGroup) {
      // Redirect to app if authenticated and on auth screens
      router.replace("/(app)/(tabs)");
    }
  }, [segments, isLoading, router, isAuthenticated]);

  return (
    <Stack>
      <Stack.Screen name="auth/sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="auth/register" options={{ headerShown: false }} />
      <Stack.Screen
        name="auth/forgot-password"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <AuthContextProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <RootNavigator />
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthContextProvider>
  );
}
