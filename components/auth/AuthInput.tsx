import { Ionicons } from "@expo/vector-icons";
import React, { forwardRef, useState } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

interface AuthInputProps extends TextInputProps {
  icon?: keyof typeof Ionicons.glyphMap;
  isPassword?: boolean;
}

const AuthInput = forwardRef<TextInput, AuthInputProps>(
  ({ icon, isPassword = false, style, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    return (
      <View style={styles.inputWrapper}>
        <View
          style={[
            styles.inputContainer,
            isFocused && styles.inputContainerFocused,
          ]}
        >
          {icon && (
            <Ionicons
              name={icon}
              size={20}
              color="#8E8E93"
              style={styles.inputIcon}
            />
          )}
          <TextInput
            ref={ref}
            style={[
              styles.textInput,
              isPassword && styles.passwordInput,
              style,
            ]}
            placeholderTextColor="#8E8E93"
            secureTextEntry={isPassword && !showPassword}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
          {isPassword && (
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
          )}
        </View>
      </View>
    );
  }
);

AuthInput.displayName = "AuthInput";

export default AuthInput;

const styles = StyleSheet.create({
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
});
