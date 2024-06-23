import { configureStore } from "@reduxjs/toolkit";
import schedule from "./reducers/schedule";
import home from "./reducers/home";

export const store = configureStore({
  reducer: {
    schedule,
    home,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
