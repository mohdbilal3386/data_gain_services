import { EventTypes } from "@/src/module/schedule";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "..";
import { scheduleData } from "@/src/constant/schedule";

interface Schedule {
  eventsOrReminders: EventTypes[];
}

const initialState: Schedule = {
  eventsOrReminders: scheduleData as EventTypes[],
};

export const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    addEventOrReminder: (state, action: PayloadAction<EventTypes>) => {
      state.eventsOrReminders = [...state.eventsOrReminders, action.payload];
    },
    editEventOrReminder: (state, action: PayloadAction<EventTypes>) => {
      state.eventsOrReminders = state.eventsOrReminders.map((eventOrReminder) =>
        eventOrReminder._id === action.payload._id
          ? action.payload
          : eventOrReminder
      );
    },
    deleteEventOrReminder: (state, action: PayloadAction<string>) => {
      state.eventsOrReminders = state.eventsOrReminders.filter(
        (eventOrReminder) => eventOrReminder._id !== action.payload
      );
    },
  },
  //   extraReducers: (builder) => {
  // use this for asynchronous
  //   }
});

export const {
  addEventOrReminder,
  editEventOrReminder,
  deleteEventOrReminder,
} = scheduleSlice.actions;
export const selectEvent = (state: RootState) =>
  state.schedule.eventsOrReminders;
export default scheduleSlice.reducer;
