import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SeekerApplicationState {
  appliedJobIds: string[];
}

const initialState: SeekerApplicationState = {
  appliedJobIds: [],
};

const seekerApplicationSlice = createSlice({
  name: "seekerApplications",
  initialState,
  reducers: {
    setAppliedJobs: (state, action: PayloadAction<string[]>) => {
      state.appliedJobIds = action.payload;
    },
    addAppliedJob: (state, action: PayloadAction<string>) => {
      if (!state.appliedJobIds.includes(action.payload)) {
        state.appliedJobIds.push(action.payload);
      }
    },
    removeAppliedJob: (state, action: PayloadAction<string>) => {
      state.appliedJobIds = state.appliedJobIds.filter(id => id !== action.payload);
    },
    clearAppliedJobs: (state) => {
      state.appliedJobIds = [];
    },
  },
});

export const {
  setAppliedJobs,
  addAppliedJob,
  removeAppliedJob,
  clearAppliedJobs,
} = seekerApplicationSlice.actions;

export default seekerApplicationSlice.reducer;
