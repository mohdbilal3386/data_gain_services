import { EventTypes } from "@/app/types/schedule";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { scheduleData } from "@/app/constant/schedule";

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
  selectors: {
    selectEventsOrReminders: (val) => val.eventsOrReminders,
  },
});
export const { selectEventsOrReminders } = scheduleSlice.selectors;
export const {
  addEventOrReminder,
  editEventOrReminder,
  deleteEventOrReminder,
} = scheduleSlice.actions;
