import { GeneralSettingsState } from "./generalSlice";
import { minibarMsg } from "./minibarMsgs";

export const initialState: GeneralSettingsState = {
  isSBCollapsed: false,
  canvasSize: 6 * window.innerWidth,
  canvasCoordinates: {
    left: -2 * window.innerWidth,
    top: -2 * window.innerWidth,
  },
  scale: 1,
  scaleValues: [0.75, 1, 1.25, 1.5, 2, 3],
  grid: {
    isOn: true,
    step: 20,
  },
  mode: "edit",
  isCanvasMoving: true,
  minibarMessage: minibarMsg.Empty,
};
