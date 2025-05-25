import React from "react";
import { StyleSheet, View } from "react-native";

interface AuthFormContainerProps {
  children: React.ReactNode;
}

export default function AuthFormContainer({
  children,
}: AuthFormContainerProps) {
  return <View style={styles.formContainer}>{children}</View>;
}

const styles = StyleSheet.create({
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
});
