import { combineSlices, configureStore } from "@reduxjs/toolkit";
import commonReducer from "./commonSlice.js";

export const rootReducer = combineSlices({
  common: commonReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
