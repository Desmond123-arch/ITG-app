import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import authReducer, { loadAuthFromStorage } from "./authSlice";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    auth: authReducer,
  },
});

store.dispatch(loadAuthFromStorage())

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;