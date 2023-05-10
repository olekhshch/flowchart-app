import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";

const scaleValues: [1, 1.25, 1.5, 2] = [1, 1.25, 1.5, 2];

export interface GeneralSettingsState {
  isSBCollapsed: boolean;
  canvasSize: number;
  canvasCoordinates: { left: number; top: number };
  scale: 1 | 1.25 | 1.5 | 2;
  scaleValues: [1, 1.25, 1.5, 2];
  grid: {
    isOn: boolean;
    step: number;
  };
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
    increaseScale: (state) => {
      if (state.scale !== 2) {
        const currectScaleIndex = scaleValues.indexOf(state.scale);
        state.scale = scaleValues[currectScaleIndex + 1];
      } else {
        state.scale = 2;
      }
    },
    descreaseScale: (state) => {
      if (state.scale !== 1) {
        const currectScaleIndex = scaleValues.indexOf(state.scale);
        state.scale = scaleValues[currectScaleIndex - 1];
      } else {
        state.scale = 1;
      }
    },
  },
});

export default generalSlice.reducer;

export const {
  openSB,
  closeSB,
  setCanvasCoordinates,
  increaseScale,
  descreaseScale,
} = generalSlice.actions;
