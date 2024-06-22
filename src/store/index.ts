import { configureStore } from "@reduxjs/toolkit";
import schedule from "./reducers/schedule";

export const store = configureStore({
  reducer: {
    schedule,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
