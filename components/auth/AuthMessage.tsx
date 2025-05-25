import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface AuthMessageProps {
  message: string;
  type?: "error" | "success" | "info";
  style?: any;
}

export default function AuthMessage({
  message,
  type = "error",
  style,
}: AuthMessageProps) {
  const messageStyles = [styles.message, styles[type], style];

  return (
    <View style={styles.container}>
      <Text style={messageStyles}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
  },
  message: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  error: {
    color: "#FF6B6B",
    borderColor: "rgba(255, 107, 107, 0.3)",
    backgroundColor: "rgba(255, 107, 107, 0.1)",
  },
  success: {
    color: "#51CF66",
    borderColor: "rgba(81, 207, 102, 0.3)",
    backgroundColor: "rgba(81, 207, 102, 0.1)",
  },
  info: {
    color: "#74C0FC",
    borderColor: "rgba(116, 192, 252, 0.3)",
    backgroundColor: "rgba(116, 192, 252, 0.1)",
  },
});
