import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import I18n from "../../../i18n";
import { useSelector } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootState } from "../../../store";
import { useCustomerForm } from "../hooks/useCustomerForm";
import { formatDate } from "../../../shared/utils/dateUtils";
import { EmptyStateView } from "../../../shared/components";
import { colors, spacing, typography } from "../../../shared/constants";

type RootStackParamList = {
  Home: undefined;
  CustomerDetail: undefined;
};

type CustomerDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "CustomerDetail"
>;

const CustomerDetailScreen: React.FC<CustomerDetailScreenProps> = ({
  navigation,
}) => {
  const selectedUser = useSelector(
    (state: RootState) => state.users.selectedUser
  );

  const {
    isEditing,
    editedName,
    editedEmail,
    errors,
    loading,
    setEditedName,
    setEditedEmail,
    handleEdit,
    handleSave,
    handleCancel,
  } = useCustomerForm(selectedUser);

  if (!selectedUser) {
    return (
      <SafeAreaView style={styles.container}>
        <EmptyStateView message={(I18n as any).t("detail.noData")} />
      </SafeAreaView>
    );
  }

  const getStatusColor = (status: string) => {
    return status === "active" ? colors.success : colors.danger;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{(I18n as any).t("detail.title")}</Text>
          </View>

          {/* Status Badge */}
          <View style={styles.statusBadgeContainer}>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor: getStatusColor(selectedUser.status),
                },
              ]}
            >
              <Text style={styles.statusText}>
                {selectedUser.status === "active"
                  ? (I18n as any).t("detail.active")
                  : (I18n as any).t("detail.inactive")}
              </Text>
            </View>
          </View>
        </View>

        {/* Basic Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {(I18n as any).t("detail.basicInfo")}
          </Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>{(I18n as any).t("detail.name")}:</Text>
            {isEditing ? (
              <View style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.editInput,
                    errors.name ? styles.inputError : null,
                  ]}
                  value={editedName}
                  onChangeText={setEditedName}
                  placeholder={(I18n as any).t("detail.name")}
                />
                {errors.name ? (
                  <Text style={styles.errorText}>{errors.name}</Text>
                ) : null}
              </View>
            ) : (
              <Text style={styles.value}>{selectedUser.name}</Text>
            )}
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>{(I18n as any).t("detail.email")}:</Text>
            {isEditing ? (
              <View style={styles.inputContainer}>
                <TextInput
                  style={[
                    styles.editInput,
                    errors.email ? styles.inputError : null,
                  ]}
                  value={editedEmail}
                  onChangeText={setEditedEmail}
                  placeholder={(I18n as any).t("detail.email")}
                  keyboardType="email-address"
                />
                {errors.email ? (
                  <Text style={styles.errorText}>{errors.email}</Text>
                ) : null}
              </View>
            ) : (
              <Text style={styles.value}>{selectedUser.email}</Text>
            )}
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>
              {(I18n as any).t("detail.status")}:
            </Text>
            <Text
              style={[
                styles.value,
                { color: getStatusColor(selectedUser.status) },
              ]}
            >
              {selectedUser.status === "active"
                ? (I18n as any).t("detail.active")
                : (I18n as any).t("detail.inactive")}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>
              {(I18n as any).t("detail.createdAt")}:
            </Text>
            <Text style={styles.value}>
              {formatDate(selectedUser.createdAt)}
            </Text>
          </View>

          {selectedUser.updatedAt && (
            <View style={styles.infoRow}>
              <Text style={styles.label}>
                {(I18n as any).t("detail.updatedAt")}:
              </Text>
              <Text style={styles.value}>
                {formatDate(selectedUser.updatedAt)}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomButton}>
        {isEditing ? (
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[
                styles.button,
                styles.saveButton,
                loading && styles.disabledButton,
              ]}
              onPress={handleSave}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {(I18n as any).t("detail.save")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                styles.cancelButton,
                loading && styles.disabledButton,
              ]}
              onPress={handleCancel}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {(I18n as any).t("detail.cancel")}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.button, styles.editButton]}
              onPress={handleEdit}
            >
              <Text style={styles.buttonText}>
                {(I18n as any).t("detail.edit")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.backButton]}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttonText}>
                {(I18n as any).t("detail.back")}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  headerSection: {
    backgroundColor: colors.white,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  titleContainer: {
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: "bold",
    color: colors.text.primary,
  },
  statusBadgeContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  statusBadge: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 16,
  },
  statusText: {
    color: colors.white,
    fontSize: typography.fontSize.xs,
    fontWeight: "600",
  },
  section: {
    backgroundColor: colors.white,
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    borderRadius: 8,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: "bold",
    color: colors.primary,
    marginBottom: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.light,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.light,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: "600",
    color: colors.text.secondary,
    flex: 0.4,
  },
  value: {
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
    flex: 0.6,
    textAlign: "right",
  },
  editInput: {
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
    flex: 0.6,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 4,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    textAlign: "right",
  },
  inputContainer: {
    flex: 0.6,
  },
  inputError: {
    borderColor: colors.danger,
  },
  errorText: {
    color: colors.danger,
    fontSize: typography.fontSize.xs,
    marginTop: spacing.sm,
    fontWeight: "500",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: typography.fontSize.base,
    color: colors.text.tertiary,
  },
  bottomButton: {
    padding: spacing.md,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  button: {
    flex: 1,
    paddingVertical: spacing.lg,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  editButton: {
    backgroundColor: colors.warning,
  },
  saveButton: {
    backgroundColor: colors.success,
  },
  cancelButton: {
    backgroundColor: colors.danger,
  },
  backButton: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.fontSize.lg,
    fontWeight: "bold",
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default CustomerDetailScreen;
