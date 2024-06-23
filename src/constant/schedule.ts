import { v4 as uuid } from "uuid";

export const scheduleData = [
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
];
