import { GeneralSettingsState } from "./generalSlice";

export const initialState: GeneralSettingsState = {
  isSBCollapsed: false,
  canvasSize: 1000,
  canvasCoordinates: { left: 10, top: 20 },
  scale: 1,
  scaleValues: [1, 1.25, 1.5, 2],
  grid: {
    isOn: true,
    step: 10,
  },
};
