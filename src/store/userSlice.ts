// store/userSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiClient from "@/lib/baseUrl";

interface User {
  id: number;
  name: string;
  email: string;
  lastLogin: string;
  registrationTime: string;
  status: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

// Fetch Users
export const fetchUsers = createAsyncThunk<User[]>(
  "user/fetchUsers",
  async () => {
    const response = await apiClient.get<User[]>("/api/users");
    return response.data;
  }
);

// Delete Users
export const deleteUsers = createAsyncThunk<void, number[]>(
  "user/deleteUsers",
  async (userIds: number[]) => {
    await apiClient.post("/api/users/delete", { ids: userIds });
  }
);

// Update User Status
export const updateUserStatus = createAsyncThunk<
  void,
  { ids: number[]; status: string }
>("user/updateUserStatus", async ({ ids, status }) => {
  await apiClient.post(`/api/users/block`, { ids, status });
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeUsers: (state, action: PayloadAction<number[]>) => {
      state.users = state.users.filter(
        (user) => !action.payload.includes(user.id)
      );
    },
    updateUserInState: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      }
    );
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message ?? "An error occurred";
    });
  },
});

// Export actions
export const { removeUsers, updateUserInState } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
