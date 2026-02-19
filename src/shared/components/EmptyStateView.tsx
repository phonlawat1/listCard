import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, typography, spacing } from "../constants";

interface EmptyStateViewProps {
  message: string;
  subMessage?: string;
}

export const EmptyStateView: React.FC<EmptyStateViewProps> = ({
  message,
  subMessage,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      {subMessage && <Text style={styles.subMessage}>{subMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
  },
  message: {
    fontSize: typography.fontSize.lg,
    fontWeight: "600" as any,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  subMessage: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    textAlign: "center",
  },
});

export default EmptyStateView;
