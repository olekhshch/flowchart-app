import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";

export interface GeneralSettingsState {
  isSBCollapsed: boolean;
  canvasSize: number;
  canvasCoordinates: { left: number; top: number };
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
    setCanvasCoordinates: (state, { payload: { newLeft, newTop } }) => {
      state.canvasCoordinates.left = newLeft;
      state.canvasCoordinates.top = newTop;
    },
  },
});

export default generalSlice.reducer;

export const { openSB, closeSB, setCanvasCoordinates } = generalSlice.actions;
