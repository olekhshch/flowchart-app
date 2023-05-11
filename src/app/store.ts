import { configureStore } from "@reduxjs/toolkit";
import generalReducer from "../features/general/generalSlice";
import elementsReducer from "../features/elements/elementsSlice";

export const store = configureStore({
  reducer: {
    general: generalReducer,
    elements: elementsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
