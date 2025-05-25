import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

interface GoogleAuthButtonProps extends TouchableOpacityProps {
  loading?: boolean;
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({
  loading = false,
  disabled,
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[styles.googleButton, isDisabled && styles.buttonDisabled]}
      disabled={isDisabled}
      {...props}
    >
      <View style={styles.googleButtonContent}>
        <Text style={styles.googleIcon}>G</Text>
        <Text style={styles.googleButtonText}>
          {loading ? "Signing in..." : "Continue with Google"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default GoogleAuthButton;

const styles = StyleSheet.create({
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
    color: "white",
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
});
