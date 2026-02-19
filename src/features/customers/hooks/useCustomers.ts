/**
 * useCustomers hook - Manages customer list state and operations
 */

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../store";
import {
  clearSearch,
  fetchUsers,
  selectUser,
  setCurrentPage,
  setSearchQuery,
} from "../../../store/slice/customerSlice";

export const useCustomers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    allUsers,
    filteredUsers,
    selectedUser,
    loading,
    error,
    currentPage,
    searchQuery,
  } = useSelector((state: RootState) => state.users);

  const fetchCustomers = () => {
    dispatch(fetchUsers());
  };

  const search = (query: string) => {
    dispatch(setSearchQuery(query));
    dispatch(setCurrentPage(1));
  };

  const goToPage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const selectCustomer = (customerId: string) => {
    dispatch(selectUser(customerId));
  };

  const reset = () => {
    dispatch(clearSearch());
    dispatch(setCurrentPage(1));
  };

  return {
    customers: filteredUsers,
    allCustomers: allUsers,
    selectedCustomer: selectedUser,
    loading,
    error,
    currentPage,
    searchQuery,
    fetchCustomers,
    search,
    goToPage,
    selectCustomer,
    reset,
  };
};
