// store/authSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
  email: string;
  status: string;
}

interface AuthState {
  user: User | null; // Ensure user is either a User object or null
  token: string | null;
}

const initialState: AuthState = {
  user: null, // Initialize user as null
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { setUser, clearUser, setToken } = authSlice.actions;

export default authSlice.reducer;
