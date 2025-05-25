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
import { LoginFormData, loginValidationSchema } from "@/schemas/auth";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";

export default function SignIn() {
  const { login, isLoading, error, clearError } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const passwordInputRef = useRef<TextInput>(null);

  const validateForm = async (): Promise<boolean> => {
    try {
      await loginValidationSchema.validate(
        { email, password },
        { abortEarly: false }
      );
      setValidationErrors({});
      return true;
    } catch (err: any) {
      const errors: Record<string, string> = {};
      if (err.inner) {
        err.inner.forEach((error: any) => {
          if (error.path) {
            errors[error.path] = error.message;
          }
        });
      }
      setValidationErrors(errors);
      return false;
    }
  };

  const handleEmailSignIn = async () => {
    clearError();
    setValidationErrors({});

    // Validate form
    const isValid = await validateForm();
    if (!isValid) return;

    try {
      await login({ email: email.trim(), password });
      router.replace("/(app)/(tabs)");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    // TODO: Implement Google sign in logic
    console.log("Google sign in not implemented yet");
  };

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    // Clear errors when user starts typing
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    if (error) {
      clearError();
    }

    if (field === "email") {
      setEmail(value);
    } else if (field === "password") {
      setPassword(value);
    }
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
        {/* Display API errors */}
        {error && <AuthMessage message={error} type="error" />}

        <AuthInput
          icon="mail-outline"
          placeholder="Email"
          value={email}
          onChangeText={(value) => handleInputChange("email", value)}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="emailAddress"
          returnKeyType="next"
          onSubmitEditing={() => passwordInputRef.current?.focus()}
        />
        {/* Display email validation error */}
        {validationErrors.email && (
          <AuthMessage message={validationErrors.email} type="error" />
        )}

        <AuthInput
          ref={passwordInputRef}
          icon="lock-closed-outline"
          placeholder="Password"
          value={password}
          onChangeText={(value) => handleInputChange("password", value)}
          isPassword
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="password"
          returnKeyType="done"
          onSubmitEditing={handleEmailSignIn}
        />
        {/* Display password validation error */}
        {validationErrors.password && (
          <AuthMessage message={validationErrors.password} type="error" />
        )}

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
