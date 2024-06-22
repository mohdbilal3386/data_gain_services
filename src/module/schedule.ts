type EventType = "Reminder" | "Event";

export type EventTypes = {
  _id?: string;
  title: string;
  start: Date | string;
  end: Date | string;
  type: EventType;
};
