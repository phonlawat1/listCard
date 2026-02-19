import { Customer, CustomerFormData } from "../types/customer.types";
import {
  getMockDataStore,
  updateMockDataStore,
} from "../data/mockCustomerData";

export const fetchCustomersService = async (): Promise<Customer[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(() => resolve(undefined), 1500));
  return getMockDataStore();
};

export const fetchCustomerByIdService = async (
  id: string
): Promise<Customer | null> => {
  await new Promise((resolve) => setTimeout(() => resolve(undefined), 500));
  const customers = getMockDataStore();
  return customers.find((c) => c.id === id) || null;
};

export const updateCustomerService = async (
  id: string,
  data: Partial<Customer>
): Promise<Customer | null> => {
  await new Promise((resolve) => setTimeout(() => resolve(undefined), 800));

  const customers = getMockDataStore();
  const index = customers.findIndex((c) => c.id === id);

  if (index === -1) {
    return null;
  }

  const updatedCustomer: Customer = {
    ...customers[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };

  const updatedCustomers = [...customers];
  updatedCustomers[index] = updatedCustomer;
  updateMockDataStore(updatedCustomers);

  return updatedCustomer;
};

export const createCustomerService = async (
  data: CustomerFormData
): Promise<Customer> => {
  await new Promise((resolve) => setTimeout(() => resolve(undefined), 800));

  const customers = getMockDataStore();
  const newCustomer: Customer = {
    id: `CUST-${Date.now()}`,
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const updatedCustomers = [...customers, newCustomer];
  updateMockDataStore(updatedCustomers);

  return newCustomer;
};

export const deleteCustomerService = async (id: string): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(() => resolve(undefined), 600));

  const customers = getMockDataStore();
  const filteredCustomers = customers.filter((c) => c.id !== id);

  if (filteredCustomers.length === customers.length) {
    return false;
  }

  updateMockDataStore(filteredCustomers);
  return true;
};

export const searchCustomersService = async (
  query: string
): Promise<Customer[]> => {
  const customers = getMockDataStore();
  const lowerQuery = query.toLowerCase();

  return customers.filter(
    (c) =>
      c.name.toLowerCase().includes(lowerQuery) ||
      c.email.toLowerCase().includes(lowerQuery)
  );
};
