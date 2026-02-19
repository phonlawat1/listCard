/**
 * Domain types for Customer feature
 */

export type CustomerStatus = "active" | "inactive";

export interface Customer {
  id: string;
  name: string;
  email: string;
  status: CustomerStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface CustomerFormData {
  name: string;
  email: string;
  status: CustomerStatus;
}
