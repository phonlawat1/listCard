/**
 * SearchHeader Component
 * Customer feature specific header with search and language toggle
 */

import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors, spacing, typography } from "../../../shared/constants";

interface SearchHeaderProps {
  locale: string;
  onToggleLanguage: () => void;
  title: string;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  locale,
  onToggleLanguage,
  title,
}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={onToggleLanguage} style={styles.langButton}>
        <Text style={styles.langText}>{locale === "th" ? "EN" : "TH"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: "700" as any,
    color: colors.text.primary,
  },
  langButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  langText: {
    color: colors.white,
    fontWeight: "600" as any,
    fontSize: typography.fontSize.sm,
  },
});

export default SearchHeader;
