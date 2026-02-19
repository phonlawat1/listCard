import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors, spacing, typography } from "../constants";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, currentPage === 1 && styles.buttonDisabled]}
        onPress={handlePrevious}
        disabled={currentPage === 1}
      >
        <Text
          style={[
            styles.buttonText,
            currentPage === 1 && styles.buttonTextDisabled,
          ]}
        >
          Previous
        </Text>
      </TouchableOpacity>

      <View style={styles.pageInfo}>
        <Text style={styles.pageText}>
          {currentPage} / {totalPages}
        </Text>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          currentPage === totalPages && styles.buttonDisabled,
        ]}
        onPress={handleNext}
        disabled={currentPage === totalPages}
      >
        <Text
          style={[
            styles.buttonText,
            currentPage === totalPages && styles.buttonTextDisabled,
          ]}
        >
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  button: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  buttonDisabled: {
    backgroundColor: colors.border.light,
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.fontSize.sm,
    fontWeight: "600" as any,
  },
  buttonTextDisabled: {
    color: colors.text.disabled,
  },
  pageInfo: {
    alignItems: "center",
    justifyContent: "center",
  },
  pageText: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    fontWeight: "600" as any,
  },
});

export default Pagination;
