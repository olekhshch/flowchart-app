import { GeneralSettingsState } from "./generalSlice";

export const initialState: GeneralSettingsState = {
  isSBCollapsed: false,
  canvasSize: 600,
  canvasCoordinates: { left: 10, top: 20 },
  scale: 2,
  scaleValues: [1, 1.25, 1.5, 2],
};
