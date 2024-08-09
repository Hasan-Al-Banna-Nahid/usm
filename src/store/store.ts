import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./userSlice";
import registrationReducer from "./registrationSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    registration: registrationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
