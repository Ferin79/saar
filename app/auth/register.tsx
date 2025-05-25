import {
  AuthButton,
  AuthContainer,
  AuthDivider,
  AuthFormContainer,
  AuthHeader,
  AuthInput,
  AuthLink,
  AuthMessage,
  GoogleAuthButton,
} from "@/components/auth";
import { useAuthContext } from "@/hooks/useAuthContext";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { TextInput } from "react-native";

export default function Register() {
  const { isLoading } = useAuthContext();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const validateForm = () => {
    if (!fullName.trim()) {
      setError("Please enter your full name");
      return false;
    }

    if (!email.trim()) {
      setError("Please enter your email address");
      return false;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    setError("");
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      // TODO: Implement registration logic

      router.replace("/(app)/(tabs)");
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error("Registration error:", error);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      // TODO: Implement Google sign up logic

      router.replace("/(app)/(tabs)");
    } catch (error) {
      console.error("Google sign up error:", error);
      setError("Google sign up failed. Please try again.");
    }
  };

  const goToSignIn = () => {
    router.push("/auth/sign-in");
  };

  return (
    <AuthContainer>
      <AuthHeader title="Join Saar" subtitle="Create your spiritual account" />

      <AuthFormContainer>
        {error ? <AuthMessage message={error} type="error" /> : null}
        <AuthInput
          icon="person-outline"
          placeholder="Full Name"
          value={fullName}
          onChangeText={(text) => {
            setFullName(text);
            if (error) setError("");
          }}
          autoCapitalize="words"
          autoCorrect={false}
          textContentType="name"
          returnKeyType="next"
          onSubmitEditing={() => emailInputRef.current?.focus()}
        />
        <AuthInput
          ref={emailInputRef}
          icon="mail-outline"
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            if (error) setError("");
          }}
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
          onChangeText={(text) => {
            setPassword(text);
            if (error) setError("");
          }}
          isPassword
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="newPassword"
          returnKeyType="next"
          onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
        />

        <AuthButton
          title="Create Account"
          loading={isLoading}
          onPress={handleRegister}
        />
        <AuthDivider />
        <GoogleAuthButton loading={isLoading} onPress={handleGoogleSignUp} />
        <AuthLink
          text="Already have an account?"
          linkText="Sign In"
          onPress={goToSignIn}
        />
      </AuthFormContainer>
    </AuthContainer>
  );
}
