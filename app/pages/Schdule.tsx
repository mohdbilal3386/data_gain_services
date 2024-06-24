"use client";
import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core/index.js";
import { Box, Typography } from "@mui/material";

import EventAndReminderDrawer from "../components/EventAndReminderDrawer";
import { selectEventsOrReminders } from "../../lib/reducers/schedule";
import { useAppSelector } from "../../lib/hooks";

const Schdule: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const eventsOrReminders = useAppSelector(selectEventsOrReminders);
  const [selectedEvent, setSelectedEvent] =
    React.useState<EventClickArg | null>(null);
  const [addEvent, setAddEvent] = React.useState<DateSelectArg | null>(null);

  const handleEventClick = (eventInfo: EventClickArg) => {
    setSelectedEvent(eventInfo);
    setIsEditing(true);
    setDrawerOpen(true);
  };

  const handleEventAdd = (reminderInfo: DateSelectArg) => {
    setAddEvent(reminderInfo);
    setDrawerOpen(true);
  };

  const renderEvent = (eventContent: any) => {
    const { type } = eventContent?.event?.extendedProps;
    return (
      <Box
        sx={{
          fontWeight: "bold",
          bgcolor: type === "Event" ? "blue" : "green",
        }}
      >
        {eventContent.event.title}
      </Box>
    );
  };

  return (
    <>
      <Box
        display={{ xs: "block", sm: "flex" }}
        justifyContent={"space-between"}
        my={2}
      >
        <Typography variant="h5" gutterBottom fontWeight={"bold"}>
          Schdule
        </Typography>
      </Box>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        editable
        selectable
        initialView="dayGridMonth"
        eventClick={handleEventClick}
        select={handleEventAdd}
        eventContent={renderEvent}
        events={eventsOrReminders}
        headerToolbar={{
          start: "prev,next today",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
      />
      <EventAndReminderDrawer
        drawerOpen={drawerOpen}
        selectedEvent={selectedEvent}
        addEvent={addEvent}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        setAddEvent={setAddEvent}
        setDrawerOpen={setDrawerOpen}
        setSelectedEvent={setSelectedEvent}
      />
    </>
  );
};

export default Schdule;
