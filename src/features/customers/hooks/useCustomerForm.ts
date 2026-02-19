/**
 * useCustomerForm hook - Manages customer form state and validation
 */

import { useState } from "react";
import { useDispatch } from "react-redux";
import I18n from "../../../i18n";
import { validateEmail, validateNotEmpty } from "../../../shared/utils";
import { AppDispatch } from "../../../store";
import { updateUser } from "../../../store/slice/customerSlice";
import { Customer } from "../types/customer.types";

export interface FormErrors {
  name: string;
  email: string;
}

export const useCustomerForm = (initialCustomer: Customer | null) => {
  const dispatch = useDispatch<AppDispatch>();

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(initialCustomer?.name || "");
  const [editedEmail, setEditedEmail] = useState(initialCustomer?.email || "");
  const [errors, setErrors] = useState<FormErrors>({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    let hasError = false;
    const newErrors: FormErrors = { name: "", email: "" };

    // Validate name
    if (!validateNotEmpty(editedName)) {
      newErrors.name = (I18n as any).t("detail.validationError");
      hasError = true;
    }

    // Validate email
    if (!validateNotEmpty(editedEmail)) {
      newErrors.email = (I18n as any).t("detail.validationError");
      hasError = true;
    } else if (!validateEmail(editedEmail)) {
      newErrors.email = (I18n as any).t("detail.invalidEmail");
      hasError = true;
    }

    setErrors(newErrors);
    return !hasError;
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedName(initialCustomer?.name || "");
    setEditedEmail(initialCustomer?.email || "");
    setErrors({ name: "", email: "" });
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    if (initialCustomer) {
      setLoading(true);
      try {
        dispatch(
          updateUser({
            ...initialCustomer,
            name: editedName.trim(),
            email: editedEmail.trim(),
          })
        );
        setIsEditing(false);
        setErrors({ name: "", email: "" });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({ name: "", email: "" });
  };

  return {
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
    validateForm,
  };
};
