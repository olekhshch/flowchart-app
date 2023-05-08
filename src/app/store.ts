import { configureStore } from "@reduxjs/toolkit";
import generalReducer from "../features/general/generalSlice";

export const store = configureStore({
  reducer: {
    general: generalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
