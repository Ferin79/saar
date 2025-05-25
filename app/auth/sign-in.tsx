import {
  AuthButton,
  AuthContainer,
  AuthDivider,
  AuthFormContainer,
  AuthHeader,
  AuthInput,
  AuthLink,
  GoogleAuthButton,
} from "@/components/auth";
import { useAuthContext } from "@/hooks/useAuthContext";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

export default function SignIn() {
  const { login, isLoading } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passwordInputRef = useRef<TextInput>(null);

  const handleEmailSignIn = async () => {
    // TODO: Implement email/password sign in logic
    await login();
    router.replace("/(app)/(tabs)");
  };

  const handleGoogleSignIn = async () => {
    // TODO: Implement Google sign in logic
    await login();
    router.replace("/(app)/(tabs)");
  };

  const goToRegister = () => {
    router.push("/auth/register");
  };

  const goToForgotPassword = () => {
    router.push("/auth/forgot-password");
  };

  return (
    <AuthContainer>
      <AuthHeader />

      <AuthFormContainer>
        <AuthInput
          icon="mail-outline"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="emailAddress"
          returnKeyType="next"
          onSubmitEditing={() => passwordInputRef.current?.focus()}
        />

        <AuthInput
          ref={passwordInputRef}
          icon="lock-closed-outline"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          isPassword
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="password"
          returnKeyType="done"
          onSubmitEditing={handleEmailSignIn}
        />

        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={goToForgotPassword}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <AuthButton
          title="Sign In"
          loading={isLoading}
          onPress={handleEmailSignIn}
        />

        <AuthDivider />

        <GoogleAuthButton loading={isLoading} onPress={handleGoogleSignIn} />

        <AuthLink
          text="Don't have an account?"
          linkText="Sign Up"
          onPress={goToRegister}
        />
      </AuthFormContainer>
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
