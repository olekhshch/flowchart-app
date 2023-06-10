import { GeneralSettingsState } from "./generalSlice";
import { minibarMsg } from "./minibarMsgs";

export const initialState: GeneralSettingsState = {
  isSBCollapsed: false,
  canvasSize: 2 * window.innerWidth,
  canvasCoordinates: { left: -10, top: -10 },
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
