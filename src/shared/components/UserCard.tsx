import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import I18n from "../../i18n";
import { colors, spacing, typography } from "../constants";

interface UserCardProps {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
  onPress: () => void;
}

export const UserCard: React.FC<UserCardProps> = ({
  name,
  email,
  status,
  onPress,
}) => {
  const statusColor = status === "active" ? colors.success : colors.danger;
  const statusText =
    status === "active"
      ? (I18n as any).t("home.active")
      : (I18n as any).t("home.inactive");

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <View style={styles.details}>
          <Text style={styles.email}>{email}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
            <Text style={styles.statusText}>{statusText}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 8,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: typography.fontSize.lg,
    fontWeight: "600" as any,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  email: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 4,
    marginLeft: spacing.md,
  },
  statusText: {
    color: colors.white,
    fontSize: typography.fontSize.xs,
    fontWeight: "600" as any,
  },
});

export default UserCard;
