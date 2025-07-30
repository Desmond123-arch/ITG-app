import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import savedJobsReducer from "./savedJobsSlice";
import authReducer, { loadAuthFromStorage } from "./authSlice";
import seekerApplicationReducer from './seekerApplicationSlice';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    auth: authReducer,
    savedJobs: savedJobsReducer,
    seekerApplications: seekerApplicationReducer,
  },
});

store.dispatch(loadAuthFromStorage())

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;