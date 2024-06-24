import React from "react";
import {
  Drawer,
  Box,
  Typography,
  TextField,
  MenuItem,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core/index.js";
import moment from "moment";
import { v4 as uuid } from "uuid";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  addEventOrReminder,
  deleteEventOrReminder,
  editEventOrReminder,
} from "../../lib/reducers/schedule";
import StyledButton from "./StyledButton";
import { useAppDispatch } from "../../lib/hooks";

interface EventAndReminderDrawerProps {
  drawerOpen: boolean;
  selectedEvent: EventClickArg | null;
  addEvent: DateSelectArg | null;
  isEditing: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAddEvent: React.Dispatch<React.SetStateAction<DateSelectArg | null>>;
  setSelectedEvent: React.Dispatch<React.SetStateAction<EventClickArg | null>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}
const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  start: yup.string().required("Start Date is required"),
  end: yup.string().required("End Date is required"),
  type: yup.string().required("Type is required"),
});
const EventAndReminderDrawer: React.FC<EventAndReminderDrawerProps> = ({
  drawerOpen,
  selectedEvent,
  addEvent,
  isEditing,
  setIsEditing,
  setAddEvent,
  setDrawerOpen,
  setSelectedEvent,
}) => {
  const dispatch = useAppDispatch();
  const handleClose = () => {
    setDrawerOpen(false);
    setSelectedEvent(null);
    setAddEvent(null);
    setIsEditing(false);
  };

  const initialValues = {
    title: selectedEvent?.event.title || "",
    start: selectedEvent?.event.start
      ? moment(selectedEvent.event.start).format("YYYY-MM-DD")
      : addEvent?.start
      ? moment(addEvent.start).format("YYYY-MM-DD")
      : "",
    end: selectedEvent?.event.end
      ? moment(selectedEvent.event.end).format("YYYY-MM-DD")
      : addEvent?.end
      ? moment(addEvent.end).format("YYYY-MM-DD")
      : "",
    type: selectedEvent?.event.extendedProps?.type || "Event",
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          if (isEditing && selectedEvent) {
            const { _id } = selectedEvent?.event?.extendedProps;
            dispatch(editEventOrReminder({ _id, ...values }));
          } else {
            dispatch(addEventOrReminder({ _id: uuid(), ...values }));
          }
          setIsEditing(false);
          handleClose();
        }}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <Drawer anchor="right" open={drawerOpen} onClose={handleClose}>
            <Box p={2} width="300px">
              <Typography variant="h6">
                {isEditing
                  ? "Edit Event/Reminder Details"
                  : "Create Event/Reminder Details"}
              </Typography>
              <Form onSubmit={handleSubmit}>
                <Box mt={2}>
                  <TextField
                    id="title"
                    name="title"
                    label="Title"
                    variant="outlined"
                    fullWidth
                    value={values.title}
                    onChange={handleChange}
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                  />
                </Box>
                <Box mt={2}>
                  <TextField
                    id="start"
                    name="start"
                    label="Start Date"
                    type="date"
                    variant="outlined"
                    fullWidth
                    value={values.start}
                    onChange={handleChange}
                    error={touched.start && Boolean(errors.start)}
                    helperText={touched.start && errors.start}
                  />
                </Box>
                <Box mt={2}>
                  <TextField
                    id="end"
                    name="end"
                    label="End Date"
                    type="date"
                    variant="outlined"
                    fullWidth
                    value={values.end}
                    onChange={handleChange}
                    error={touched.end && Boolean(errors.end)}
                    helperText={touched.end && errors.end}
                  />
                </Box>
                <Box mt={2}>
                  <TextField
                    id="type"
                    name="type"
                    select
                    label="Type"
                    variant="outlined"
                    fullWidth
                    value={values.type}
                    onChange={handleChange}
                  >
                    <MenuItem value="Event">Event</MenuItem>
                    <MenuItem value="Reminder">Reminder</MenuItem>
                  </TextField>
                </Box>
                <Box mt={2} display={"flex"} gap={2}>
                  <StyledButton
                    title={isEditing ? "Update" : "Save"}
                    type="submit"
                    variant="contained"
                    color="primary"
                  />
                  {isEditing ? (
                    <IconButton
                      aria-label="MoreVertIcon"
                      onClick={() => {
                        if (isEditing && selectedEvent) {
                          const { _id } = selectedEvent?.event?.extendedProps;
                          dispatch(deleteEventOrReminder(_id));
                          handleClose();
                        }
                      }}
                    >
                      <Tooltip arrow title="Delete Event/Reminder">
                        <DeleteIcon />
                      </Tooltip>
                    </IconButton>
                  ) : null}
                </Box>
              </Form>
            </Box>
          </Drawer>
        )}
      </Formik>
    </>
  );
};

export default EventAndReminderDrawer;
