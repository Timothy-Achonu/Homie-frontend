// src/features/dashboard/dashboardSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
 
interface DashboardState {
  stats: {
    users: number;
    sales: number;
    visits: number;
  };
  recentActivities: string[];
}

const initialState: DashboardState = {
  stats: {
    users: 0,
    sales: 0,
    visits: 0,
  },
  recentActivities: [],
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    updateStats: (
      state,
      action: PayloadAction<Partial<DashboardState["stats"]>>
    ) => {
      state.stats = { ...state.stats, ...action.payload };
    },
    addActivity: (state, action: PayloadAction<string>) => {
      state.recentActivities.unshift(action.payload);
    },
    clearActivities: (state) => {
      state.recentActivities = [];
    },
    resetDashboard: () => initialState,
  },
});

// Export actions
export const { updateStats, addActivity, clearActivities, resetDashboard } =
  dashboardSlice.actions;

// Selectors
export const selectDashboard = (state: RootState) => state.dashboardSettings;
export const selectStats = (state: RootState) => state.dashboardSettings.stats;
export const selectActivities = (state: RootState) =>
  state.dashboardSettings.recentActivities;


// Export reducer
export const dashboardSettingsReducer = dashboardSlice.reducer;

