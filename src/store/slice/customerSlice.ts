import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getMockDataStore } from "../../features/customers/data";
import { simulateNetworkDelay } from "../../shared/types/api.types";
import type { Customer } from "../../features/customers/types/customer.types";

export interface User {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive";
  createdAt: string; // ISO date string
  updatedAt?: string; // ISO date string
}

interface UserState {
  allUsers: User[];
  filteredUsers: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  currentPage: number;
}

const initialState: UserState = {
  allUsers: [],
  filteredUsers: [],
  selectedUser: null,
  loading: false,
  error: null,
  searchQuery: "",
  currentPage: 1,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      // Simulate network delay for realistic behavior
      await simulateNetworkDelay(1000, 500);

      // Get mock customer data instead of fetching from URL
      const mockCustomers = getMockDataStore();

      // Return mock data as-is (dates are already ISO strings, which are serializable)
      return mockCustomers.map((customer: Customer) => ({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        status: customer.status,
        createdAt: customer.createdAt,
        updatedAt: customer.updatedAt,
      }));
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;

      if (action.payload.trim() === "") {
        state.filteredUsers = state.allUsers;
      } else {
        const query = action.payload.toLowerCase();
        // Search by name and email from mock customer data
        state.filteredUsers = state.allUsers.filter(
          (user) =>
            user.name.toLowerCase().includes(query) ||
            user.email.toLowerCase().includes(query)
        );
      }
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    selectUser: (state, action: PayloadAction<string>) => {
      const user = state.allUsers.find((u) => u.id === action.payload);
      if (user) {
        state.selectedUser = user;
      }
    },

    clearSearch: (state) => {
      state.searchQuery = "";
      state.filteredUsers = state.allUsers;
      state.currentPage = 1;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const updatedUser = action.payload;
      // Update in allUsers
      const allUsersIndex = state.allUsers.findIndex(
        (u) => u.id === updatedUser.id
      );
      if (allUsersIndex !== -1) {
        state.allUsers[allUsersIndex] = updatedUser;
      }
      // Update in filteredUsers
      const filteredIndex = state.filteredUsers.findIndex(
        (u) => u.id === updatedUser.id
      );
      if (filteredIndex !== -1) {
        state.filteredUsers[filteredIndex] = updatedUser;
      }
      // Update selectedUser
      if (state.selectedUser && state.selectedUser.id === updatedUser.id) {
        state.selectedUser = updatedUser;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload;
        state.filteredUsers = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSearchQuery,
  setCurrentPage,
  selectUser,
  clearSearch,
  updateUser,
} = userSlice.actions;

export default userSlice.reducer;
