import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface AuthButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  variant?: "primary" | "secondary";
  colors?: readonly [string, string, ...string[]];
}

const AuthButton: React.FC<AuthButtonProps> = ({
  title,
  loading = false,
  variant = "primary",
  colors = ["#0277BD", "#03A9F4", "#81D4FA"] as const,
  disabled,
  style,
  ...props
}) => {
  const isDisabled = disabled || loading;

  if (variant === "secondary") {
    return (
      <TouchableOpacity
        style={[
          styles.secondaryButton,
          isDisabled && styles.buttonDisabled,
          style,
        ]}
        disabled={isDisabled}
        {...props}
      >
        <Text style={styles.secondaryButtonText}>
          {loading ? "Loading..." : title}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: "#03A9F4" },
        isDisabled && styles.buttonDisabled,
        style,
      ]}
      disabled={isDisabled}
      {...props}
    >
      <Text style={styles.buttonText}>{loading ? "Loading..." : title}</Text>
    </TouchableOpacity>
  );
};

export default AuthButton;

const styles = StyleSheet.create({
  button: {
    marginBottom: 24,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  secondaryButton: {
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
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
});
