import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface AuthMessageProps {
  message: string;
  type?: "error" | "success" | "info";
  style?: any;
}

const AuthMessage: React.FC<AuthMessageProps> = ({
  message,
  type = "error",
  style,
}) => {
  const containerStyles = [styles.container, styles[type], style];
  const messageStyles = [styles.message];

  return (
    <View style={containerStyles}>
      <Text style={messageStyles}>{message}</Text>
    </View>
  );
};
export default AuthMessage;

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  message: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 20,
  },
  error: {
    color: "#FFFFFF",
    borderColor: "rgba(255, 107, 107, 0.4)",
    backgroundColor: "rgba(255, 107, 107, 0.2)",
    backdropFilter: "blur(10px)",
  },
  success: {
    color: "#FFFFFF",
    borderColor: "rgba(81, 207, 102, 0.4)",
    backgroundColor: "rgba(81, 207, 102, 0.2)",
    backdropFilter: "blur(10px)",
  },
  info: {
    color: "#FFFFFF",
    borderColor: "rgba(116, 192, 252, 0.4)",
    backgroundColor: "rgba(116, 192, 252, 0.2)",
    backdropFilter: "blur(10px)",
  },
});
