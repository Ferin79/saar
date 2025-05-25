import { useAuthContext } from "@/hooks/useAuthContext";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, {
  Circle,
  Defs,
  Path,
  RadialGradient,
  Stop,
} from "react-native-svg";

export default function SignIn() {
  const { login, isLoading } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const passwordInputRef = useRef<TextInput>(null);

  // Animation values
  const floatingAnim1 = useRef(new Animated.Value(0)).current;
  const floatingAnim2 = useRef(new Animated.Value(0)).current;
  const floatingAnim3 = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const breathingAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Floating animations
    const createFloatingAnimation = (
      animValue: Animated.Value,
      duration: number
    ) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(animValue, {
            toValue: 1,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration,
            useNativeDriver: true,
          }),
        ])
      );
    };

    // Rotation animation
    const rotationAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true,
      })
    );

    // Breathing animation for Om symbol
    const breathingAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(breathingAnim, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(breathingAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    createFloatingAnimation(floatingAnim1, 3000).start();
    createFloatingAnimation(floatingAnim2, 4000).start();
    createFloatingAnimation(floatingAnim3, 3500).start();
    rotationAnimation.start();
    breathingAnimation.start();
  }, [floatingAnim1, floatingAnim2, floatingAnim3, rotateAnim, breathingAnim]);

  // Animated style interpolations
  const floating1Style = {
    transform: [
      {
        translateY: floatingAnim1.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -20],
        }),
      },
    ],
  };

  const floating2Style = {
    transform: [
      {
        translateY: floatingAnim2.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -15],
        }),
      },
    ],
  };

  const floating3Style = {
    transform: [
      {
        translateY: floatingAnim3.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -25],
        }),
      },
    ],
  };

  const rotateStyle = {
    transform: [
      {
        rotate: rotateAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "360deg"],
        }),
      },
    ],
  };

  const breathingStyle = {
    transform: [
      {
        scale: breathingAnim,
      },
    ],
  };

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
    <View style={styles.mainContainer}>
      {/* Animated Background */}
      <LinearGradient
        colors={["#4A148C", "#6A1B9A", "#8E24AA", "#AB47BC"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Background Pattern Overlay */}
        <View style={styles.patternOverlay}>
          {[...Array(20)].map((_, index) => (
            <View
              key={index}
              style={[
                styles.patternDot,
                {
                  left: `${(index % 5) * 25}%`,
                  top: `${Math.floor(index / 5) * 25}%`,
                },
              ]}
            />
          ))}
        </View>

        {/* Floating Lotus Elements */}
        <Animated.View style={[styles.floatingElement1, floating1Style]}>
          <Svg width="80" height="80" viewBox="0 0 100 100">
            <Defs>
              <RadialGradient id="lotus1" cx="50%" cy="50%" r="50%">
                <Stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
                <Stop offset="100%" stopColor="#FFA000" stopOpacity="0.4" />
              </RadialGradient>
            </Defs>
            <Path
              d="M50 20 C60 30, 80 40, 70 60 C60 50, 40 50, 30 60 C20 40, 40 30, 50 20 Z"
              fill="url(#lotus1)"
            />
            <Path
              d="M50 25 C55 35, 70 40, 65 55 C55 50, 45 50, 35 55 C30 40, 45 35, 50 25 Z"
              fill="#FFFFFF"
              opacity="0.6"
            />
          </Svg>
        </Animated.View>

        <Animated.View style={[styles.floatingElement2, floating2Style]}>
          <Svg width="60" height="60" viewBox="0 0 100 100">
            <Circle cx="50" cy="50" r="30" fill="#FFD700" opacity="0.3" />
            <Circle cx="50" cy="50" r="20" fill="#FFFFFF" opacity="0.5" />
            <Path
              d="M50 35 L55 45 L65 45 L57 53 L60 63 L50 57 L40 63 L43 53 L35 45 L45 45 Z"
              fill="#FFA000"
            />
          </Svg>
        </Animated.View>

        <Animated.View style={[styles.floatingElement3, floating3Style]}>
          <Svg width="70" height="70" viewBox="0 0 100 100">
            <Defs>
              <RadialGradient id="lotus2" cx="50%" cy="50%" r="50%">
                <Stop offset="0%" stopColor="#FF8A80" stopOpacity="0.8" />
                <Stop offset="100%" stopColor="#FF5722" stopOpacity="0.4" />
              </RadialGradient>
            </Defs>
            <Path
              d="M50 15 C65 25, 85 35, 75 65 C65 55, 35 55, 25 65 C15 35, 35 25, 50 15 Z"
              fill="url(#lotus2)"
            />
          </Svg>
        </Animated.View>

        {/* Krishna Flute Silhouette */}
        <Animated.View style={[styles.krishnaElement, rotateStyle]}>
          <Svg width="120" height="120" viewBox="0 0 200 200">
            <Defs>
              <RadialGradient id="flute" cx="50%" cy="50%" r="50%">
                <Stop offset="0%" stopColor="#FFD700" stopOpacity="0.3" />
                <Stop offset="100%" stopColor="#FF8F00" stopOpacity="0.1" />
              </RadialGradient>
            </Defs>
            <Circle cx="100" cy="100" r="80" fill="url(#flute)" />
            {/* Flute */}
            <Path
              d="M60 95 L140 105 Q145 105 145 100 Q145 95 140 95 L60 85 Q55 85 55 90 Q55 95 60 95 Z"
              fill="#8D6E63"
              opacity="0.6"
            />
            {/* Holes */}
            <Circle cx="80" cy="90" r="2" fill="#5D4037" />
            <Circle cx="100" cy="92" r="2" fill="#5D4037" />
            <Circle cx="120" cy="94" r="2" fill="#5D4037" />
            {/* Feather */}
            <Path
              d="M90 70 Q95 50 105 50 Q115 50 120 70 Q115 75 105 75 Q95 75 90 70 Z"
              fill="#4FC3F7"
              opacity="0.7"
            />
          </Svg>
        </Animated.View>

        {/* Floating Particles */}
        {[...Array(6)].map((_, index) => (
          <Animated.View
            key={index}
            style={[
              styles.particle,
              {
                left: `${10 + index * 15}%`,
                top: `${20 + (index % 3) * 20}%`,
              },
              index % 2 === 0 ? floating1Style : floating2Style,
            ]}
          >
            <View style={styles.particleCircle} />
          </Animated.View>
        ))}

        {/* Sanskrit Symbols */}
        <Animated.View style={[styles.sanskritSymbol1, floating1Style]}>
          <Text style={styles.sanskritText}>ॐ</Text>
        </Animated.View>
        <Animated.View style={[styles.sanskritSymbol2, floating2Style]}>
          <Text style={styles.sanskritText}>श्री</Text>
        </Animated.View>
        <Animated.View style={[styles.sanskritSymbol3, floating3Style]}>
          <Text style={styles.sanskritText}>गं</Text>
        </Animated.View>
      </LinearGradient>

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <View style={styles.webContainer}>
            <View style={styles.scrollView}>
              {/* Header Section */}
              <View style={styles.header}>
                <Animated.View style={[styles.logoContainer, breathingStyle]}>
                  <Text style={styles.logo}>ॐ</Text>
                </Animated.View>
                <Text style={styles.appName}>Saar</Text>
                <Text style={styles.subtitle}>Begin your sacred journey</Text>
              </View>

              {/* Login Form */}
              <View style={styles.formContainer}>
                {/* Email Input */}
                <View style={styles.inputWrapper}>
                  <View style={[styles.inputContainer]}>
                    <Ionicons
                      name="mail-outline"
                      size={20}
                      color={"#8E8E93"}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.textInput}
                      placeholder="Email"
                      placeholderTextColor="#8E8E93"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      textContentType="emailAddress"
                      returnKeyType="next"
                      onSubmitEditing={() => passwordInputRef.current?.focus()}
                    />
                  </View>
                </View>

                {/* Password Input */}
                <View style={styles.inputWrapper}>
                  <View style={[styles.inputContainer]}>
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color={"#8E8E93"}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      ref={passwordInputRef}
                      style={[styles.textInput, styles.passwordInput]}
                      placeholder="Password"
                      placeholderTextColor="#8E8E93"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      textContentType="password"
                      returnKeyType="done"
                      onSubmitEditing={handleEmailSignIn}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeIcon}
                    >
                      <Ionicons
                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                        size={20}
                        color="#8E8E93"
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Forgot Password */}
                <TouchableOpacity
                  style={styles.forgotPasswordButton}
                  onPress={goToForgotPassword}
                >
                  <Text style={styles.forgotPasswordText}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>

                {/* Sign In Button */}
                <TouchableOpacity
                  style={[
                    styles.signInButton,
                    isLoading && styles.buttonDisabled,
                  ]}
                  onPress={handleEmailSignIn}
                  disabled={isLoading}
                >
                  <LinearGradient
                    colors={["#8E24AA", "#AB47BC", "#CE93D8"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.signInGradient}
                  >
                    {isLoading ? (
                      <Text style={styles.signInButtonText}>Signing In...</Text>
                    ) : (
                      <Text style={styles.signInButtonText}>Sign In</Text>
                    )}
                  </LinearGradient>
                </TouchableOpacity>

                {/* Divider */}
                <View style={styles.dividerContainer}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>or</Text>
                  <View style={styles.dividerLine} />
                </View>

                {/* Google Sign In Button */}
                <TouchableOpacity
                  style={styles.googleButton}
                  onPress={handleGoogleSignIn}
                  disabled={isLoading}
                >
                  <View style={styles.googleButtonContent}>
                    <Text style={styles.googleIcon}>G</Text>
                    <Text style={styles.googleButtonText}>
                      Continue with Google
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* Sign Up Link */}
                <View style={styles.signUpContainer}>
                  <Text style={styles.signUpText}>
                    Don&apos;t have an account?{" "}
                  </Text>
                  <TouchableOpacity onPress={goToRegister}>
                    <Text style={styles.signUpLink}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
  },
  floatingElement1: {
    position: "absolute",
    top: "15%",
    left: "10%",
  },
  floatingElement2: {
    position: "absolute",
    top: "25%",
    right: "15%",
  },
  floatingElement3: {
    position: "absolute",
    top: "60%",
    left: "20%",
  },
  krishnaElement: {
    position: "absolute",
    top: "40%",
    right: "10%",
    opacity: 0.6,
  },
  particle: {
    position: "absolute",
    width: 6,
    height: 6,
  },
  particleCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FFD700",
    opacity: 0.7,
  },
  sanskritSymbol1: {
    position: "absolute",
    top: "10%",
    right: "20%",
    opacity: 0.3,
  },
  sanskritSymbol2: {
    position: "absolute",
    bottom: "20%",
    left: "15%",
    opacity: 0.4,
  },
  sanskritSymbol3: {
    position: "absolute",
    top: "70%",
    right: "25%",
    opacity: 0.35,
  },
  sanskritText: {
    fontSize: 24,
    color: "#FFD700",
    fontWeight: "bold",
  },
  patternOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
  },
  patternDot: {
    position: "absolute",
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: "#FFD700",
  },
  webContainer: {
    flex: 1,
    alignItems: Platform.OS === "web" ? "center" : "stretch",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
    maxWidth: Platform.OS === "web" ? 500 : "100%",
    width: "100%",
    padding: 16,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
    minHeight: Platform.OS === "web" ? ("100vh" as any) : undefined,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
    marginTop: 20,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  logo: {
    fontSize: 36,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(10px)",
    borderRadius: 24,
    padding: 32,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    minHeight: 56,
  },
  inputContainerFocused: {
    borderColor: "#FF9A56",
    backgroundColor: "#FFFFFF",
    shadowColor: "#FF9A56",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#1D1D1F",
    fontWeight: "500",
    minHeight: 24,
  },
  passwordInput: {
    paddingRight: 40,
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
    padding: 4,
  },
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  signInButton: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: "hidden",
  },
  signInGradient: {
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  signInButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "500",
  },
  googleButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  googleButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  googleIcon: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4285F4",
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
  },
  signUpLink: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  quoteContainer: {
    paddingHorizontal: 16,
    alignItems: "center",
  },
  quote: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    fontStyle: "italic",
    lineHeight: 20,
    marginBottom: 8,
  },
  quoteSource: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
    fontWeight: "500",
  },
});
