import {
  AuthButton,
  AuthContainer,
  AuthFormContainer,
  AuthHeader,
  AuthInput,
  AuthLink,
} from "@/components/auth";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleResetPassword = async () => {
    if (!email.trim()) {
      console.log("Please enter your email");
      return;
    }

    setIsLoading(true);

    try {
      // TODO: Implement password reset logic here
      console.log("Reset password pressed for:", email);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setEmailSent(true);
    } catch (error) {
      console.error("Error sending reset email:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const goToSignIn = () => {
    router.push("/auth/sign-in");
  };

  const resendEmail = () => {
    setEmailSent(false);
    handleResetPassword();
  };

  return (
    <AuthContainer>
      <AuthHeader
        title="Reset Password"
        subtitle={emailSent ? "Check your email" : "Enter your email address"}
        showLogo={false}
      />

      <AuthFormContainer>
        {emailSent ? (
          <View style={styles.successContainer}>
            <Text style={styles.successTitle}>Email Sent!</Text>
            <Text style={styles.successMessage}>
              We&apos;ve sent a password reset link to {email}. Please check
              your inbox and follow the instructions to reset your password.
            </Text>

            <Text style={styles.checkSpamText}>
              Don&apos;t see the email? Check your spam folder or try again.
            </Text>

            <AuthButton
              title="Resend Email"
              loading={isLoading}
              onPress={resendEmail}
              variant="secondary"
              style={styles.resendButton}
            />
          </View>
        ) : (
          <>
            <Text style={styles.instructionText}>
              Enter your email address and we&apos;ll send you a link to reset
              your password.
            </Text>

            <AuthInput
              icon="mail-outline"
              placeholder="Email Address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="emailAddress"
              returnKeyType="done"
              onSubmitEditing={handleResetPassword}
            />

            <AuthButton
              title="Send Reset Link"
              loading={isLoading}
              onPress={handleResetPassword}
            />
          </>
        )}

        <AuthLink
          text="Remember your password?"
          linkText="Back to Sign In"
          onPress={goToSignIn}
        />
      </AuthFormContainer>
    </AuthContainer>
  );
}

const styles = StyleSheet.create({
  instructionText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 32,
  },
  successContainer: {
    alignItems: "center",
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 16,
    textAlign: "center",
  },
  successMessage: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  checkSpamText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 32,
  },
  resendButton: {
    marginBottom: 16,
  },
});
