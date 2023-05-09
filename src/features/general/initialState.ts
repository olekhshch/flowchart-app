import { GeneralSettingsState } from "./generalSlice";

export const initialState: GeneralSettingsState = {
  isSBCollapsed: false,
  canvasSize: 600,
  canvasCoordinates: { left: 10, top: 20 },
};
