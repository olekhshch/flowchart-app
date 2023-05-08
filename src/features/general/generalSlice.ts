import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";

export interface GeneralSettingsState {
  isSBCollapsed: boolean;
}

export const generalSlice = createSlice({
  name: "general",
  initialState: initialState,
  reducers: {
    openSB: (state) => {
      state.isSBCollapsed = false;
    },
    closeSB: (state) => {
      state.isSBCollapsed = true;
    },
  },
});

export default generalSlice.reducer;

export const { openSB, closeSB } = generalSlice.actions;
