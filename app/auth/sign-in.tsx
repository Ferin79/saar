import { useAuthContext } from "@/hooks/useAuthContext";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SignIn() {
  const { login, isLoading } = useAuthContext();

  const handleSignIn = async () => {
    await login();
    // Navigate to the app after signing in
    router.replace("/(app)/(tabs)");
  };

  const goToRegister = () => {
    router.push("/auth/register");
  };

  const goToForgotPassword = () => {
    router.push("/auth/forgot-password");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSignIn}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Signing In..." : "Sign In"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton} onPress={goToForgotPassword}>
        <Text style={styles.linkText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.linkButton} onPress={goToRegister}>
        <Text style={styles.linkText}>Don&apos;t have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  linkButton: {
    paddingVertical: 10,
  },
  linkText: {
    color: "#007AFF",
    fontSize: 14,
  },
});
