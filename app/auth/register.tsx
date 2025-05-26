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
import { RegisterFormData, registerValidationSchema } from "@/schemas/auth";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { TextInput } from "react-native";

export default function Register() {
  const { register, isLoading, error, clearError } = useAuthContext();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const lastNameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const validateForm = async (): Promise<boolean> => {
    try {
      await registerValidationSchema.validate(
        { firstName, lastName, email, password },
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

  const handleRegister = async () => {
    clearError();
    setValidationErrors({});

    const isValid = await validateForm();
    if (!isValid) return;

    try {
      await register({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password,
      });
      router.replace("/(app)/(tabs)");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const handleGoogleSignUp = async () => {
    // TODO: Implement Google sign up logic
    console.log("Google sign up not implemented yet");
  };

  const handleInputChange = (field: keyof RegisterFormData, value: string) => {
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

    if (field === "firstName") {
      setFirstName(value);
    } else if (field === "lastName") {
      setLastName(value);
    } else if (field === "email") {
      setEmail(value);
    } else if (field === "password") {
      setPassword(value);
    }
  };

  const goToSignIn = () => {
    router.push("/auth/sign-in");
  };

  return (
    <AuthContainer>
      <AuthHeader title="Join Saar" subtitle="Create your spiritual account" />

      <AuthFormContainer>
        {/* Display API errors */}
        {error && <AuthMessage message={error} type="error" />}

        <AuthInput
          icon="person-outline"
          placeholder="First Name"
          value={firstName}
          onChangeText={(value) => handleInputChange("firstName", value)}
          autoCapitalize="words"
          autoCorrect={false}
          textContentType="givenName"
          returnKeyType="next"
          onSubmitEditing={() => lastNameInputRef.current?.focus()}
        />
        {/* Display first name validation error */}
        {validationErrors.firstName && (
          <AuthMessage message={validationErrors.firstName} type="error" />
        )}

        <AuthInput
          ref={lastNameInputRef}
          icon="person-outline"
          placeholder="Last Name"
          value={lastName}
          onChangeText={(value) => handleInputChange("lastName", value)}
          autoCapitalize="words"
          autoCorrect={false}
          textContentType="familyName"
          returnKeyType="next"
          onSubmitEditing={() => emailInputRef.current?.focus()}
        />
        {/* Display last name validation error */}
        {validationErrors.lastName && (
          <AuthMessage message={validationErrors.lastName} type="error" />
        )}

        <AuthInput
          ref={emailInputRef}
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
          textContentType="newPassword"
          returnKeyType="done"
          onSubmitEditing={handleRegister}
        />
        {/* Display password validation error */}
        {validationErrors.password && (
          <AuthMessage message={validationErrors.password} type="error" />
        )}

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
