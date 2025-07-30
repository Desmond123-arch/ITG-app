import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SavedJobsState {
  jobIds: string[];
}

const initialState: SavedJobsState = {
  jobIds: [],
};

const savedJobsSlice = createSlice({
  name: "savedJobs",
  initialState,
  reducers: {
    setSavedJobs: (state, action: PayloadAction<string[]>) => {
      state.jobIds = action.payload;
    },
    addSavedJob: (state, action: PayloadAction<string>) => {
      if (!state.jobIds.includes(action.payload)) {
        state.jobIds.push(action.payload);
      }
    },
    removeSavedJob: (state, action: PayloadAction<string>) => {
      state.jobIds = state.jobIds.filter(id => id !== action.payload);
    },
    clearSavedJobs: (state) => {
      state.jobIds = [];
    },
  },
});

export const {
  setSavedJobs,
  addSavedJob,
  removeSavedJob,
  clearSavedJobs,
} = savedJobsSlice.actions;

export default savedJobsSlice.reducer;
