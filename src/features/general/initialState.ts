import { GeneralSettingsState } from "./generalSlice";

export const initialState: GeneralSettingsState = {
  isSBCollapsed: false,
  canvasSize: 1100,
  canvasCoordinates: { left: -10, top: -10 },
  scale: 1,
  scaleValues: [1, 1.25, 1.5, 2, 3],
  grid: {
    isOn: true,
    step: 20,
  },
  mode: "edit",
};
