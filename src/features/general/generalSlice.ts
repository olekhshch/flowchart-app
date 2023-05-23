import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialState } from "./initialState";

const scaleValues: [1, 1.25, 1.5, 2, 3] = [1, 1.25, 1.5, 2, 3];

type Mode =
  | "view"
  | "edit"
  | "set_node"
  | "set_point"
  | "set_line"
  | "set_textline"
  | "connect_points";

export interface GeneralSettingsState {
  isSBCollapsed: boolean;
  canvasSize: number;
  canvasCoordinates: { left: number; top: number };
  scale: 1 | 1.25 | 1.5 | 2 | 3;
  scaleValues: [1, 1.25, 1.5, 2, 3];
  grid: {
    isOn: boolean;
    step: number;
  };
  mode: Mode;
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
      if (state.scale !== 3) {
        const currectScaleIndex = scaleValues.indexOf(state.scale);
        state.scale = scaleValues[currectScaleIndex + 1];
      } else {
        state.scale = 3;
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
    turnGridOff: (state) => {
      state.grid.isOn = false;
    },
    turnGridOn: (state) => {
      state.grid.isOn = true;
    },
    toggleGrid: (state) => {
      state.grid.isOn = !state.grid.isOn;
    },
    setMode: (state, { payload }: PayloadAction<Mode>) => {
      state.mode = payload;
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
  turnGridOff,
  turnGridOn,
  toggleGrid,
  setMode,
} = generalSlice.actions;
