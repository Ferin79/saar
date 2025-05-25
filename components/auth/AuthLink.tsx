import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface AuthLinkProps extends TouchableOpacityProps {
  text: string;
  linkText: string;
}

export default function AuthLink({ text, linkText, ...props }: AuthLinkProps) {
  return (
    <TouchableOpacity style={styles.linkContainer} {...props}>
      <Text style={styles.linkText}>
        {text} <Text style={styles.link}>{linkText}</Text>
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  linkContainer: {
    alignItems: "center",
    padding: 8,
  },
  linkText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
  },
  link: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
