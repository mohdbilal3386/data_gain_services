import { EventTypes } from "@/src/module/schedule";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { RootState } from "..";

interface Schedule {
  eventsOrReminders: EventTypes[];
}

const initialState: Schedule = {
  eventsOrReminders: [
    {
      _id: uuid(),
      title: "Event 1",
      start: "2024-06-01",
      end: "2024-06-05",
      type: "Event",
    },
    {
      _id: uuid(),
      title: "Event 2",
      start: "2024-06-02",
      end: "2024-06-05",
      type: "Event",
    },
    {
      _id: uuid(),
      title: "Reminder 1",
      start: "2024-06-03",
      end: "2024-06-05",
      type: "Reminder",
    },
    {
      _id: uuid(),
      title: "Reminder 2",
      start: "2024-06-04",
      end: "2024-06-05",
      type: "Reminder",
    },
  ],
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
