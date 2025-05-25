import React, { useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

interface AuthHeaderProps {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
}

export default function AuthHeader({
  title = "Saar",
  subtitle = "Begin your sacred journey",
  showLogo = true,
}: AuthHeaderProps) {
  const breathingAnim = useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
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

    if (showLogo) {
      breathingAnimation.start();
    }
  }, [breathingAnim, showLogo]);

  const breathingStyle = {
    transform: [
      {
        scale: breathingAnim,
      },
    ],
  };

  return (
    <View style={styles.header}>
      {showLogo && (
        <Animated.View style={[styles.logoContainer, breathingStyle]}>
          <Text style={styles.logo}>ॐ</Text>
        </Animated.View>
      )}
      <Text style={styles.appName}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
