import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import Svg, {
  Circle,
  Defs,
  Path,
  RadialGradient,
  Stop,
} from "react-native-svg";

export default function AuthBackground() {
  // Animation values
  const floatingAnim1 = useRef(new Animated.Value(0)).current;
  const floatingAnim2 = useRef(new Animated.Value(0)).current;
  const floatingAnim3 = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

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

    createFloatingAnimation(floatingAnim1, 3000).start();
    createFloatingAnimation(floatingAnim2, 4000).start();
    createFloatingAnimation(floatingAnim3, 3500).start();
    rotationAnimation.start();
  }, [floatingAnim1, floatingAnim2, floatingAnim3, rotateAnim]);

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

  return (
    <LinearGradient
      colors={["#1A237E", "#283593", "#3F51B5", "#5C6BC0"]}
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
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
});
