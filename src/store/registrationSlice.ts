// src/store/registrationSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface RegistrationState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: RegistrationState = {
  loading: false,
  error: null,
  success: false,
};
const baseUrl =
  "https://i1narwr11m.execute-api.ap-southeast-2.amazonaws.com/default/task4";
export const registerUser = createAsyncThunk(
  "registration/registerUser",
  async ({
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    const response = await axios.post(`${baseUrl}/api/auth/register`, {
      name,
      email,
      password,
    });
    return response.data;
  }
);

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Registration failed";
      });
  },
});

export const { resetState } = registrationSlice.actions;
export default registrationSlice.reducer;
