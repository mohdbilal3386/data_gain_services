import * as React from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material/";
import * as yup from "yup";
import StyledButton from "./StyledButton";
import { Formik, Form } from "formik";
import moment from "moment";
import { RowData } from "../types/tables";

interface AddAndEditRowModuleProps {
  open: boolean;
  itemToBeEdit: RowData | null;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (values: RowData) => void | Promise<any>;
  isEditing: boolean;
}

const validationSchema = yup.object({
  donor: yup.string().required("Donor is required"),
  date: yup.string().required("Date is required"),
  panels: yup.string().required("Panels is required"),
  barcode: yup.string().required("Barcode is required"),
  source: yup.string().required("Source is required"),
  amount: yup.string().required("Amount is required"),
  observed_by: yup.string().required("Observed by is required"),
  status: yup.string().required("Status is required"),
});
const AddAndEditRowModule: React.FC<AddAndEditRowModuleProps> = ({
  open,
  isEditing,
  setOpen,
  onSubmit,
  itemToBeEdit,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const handleClose = () => {
    setOpen(false);
  };

  const initialValues: RowData = {
    donor: (itemToBeEdit && itemToBeEdit.donor) || "",
    panels: (itemToBeEdit && itemToBeEdit.panels) || "",
    barcode: (itemToBeEdit && itemToBeEdit.barcode) || "",
    source: (itemToBeEdit && itemToBeEdit.source) || "",
    date:
      (itemToBeEdit && moment(itemToBeEdit.date).format("YYYY-MM-DD")) || "",
    amount: (itemToBeEdit && itemToBeEdit.amount) || 0,
    observed_by: (itemToBeEdit && itemToBeEdit.observed_by) || "",
    status: (itemToBeEdit && itemToBeEdit.status) || "",
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {isEditing ? "Edit" : "Create"}
        </DialogTitle>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSubmit(values);
            handleClose();
          }}
        >
          {({ values, handleChange, handleSubmit, errors, touched }) => (
            <Form onSubmit={handleSubmit}>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6} mt={2}>
                    <TextField
                      id="donor"
                      name="donor"
                      label="Donor"
                      variant="outlined"
                      fullWidth
                      value={values.donor}
                      onChange={handleChange}
                      error={touched.donor && Boolean(errors.donor)}
                      helperText={touched.donor && errors.donor}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} mt={2}>
                    <TextField
                      id="panels"
                      name="panels"
                      label="Panels"
                      variant="outlined"
                      fullWidth
                      value={values.panels}
                      onChange={handleChange}
                      error={touched.panels && Boolean(errors.panels)}
                      helperText={touched.panels && errors.panels}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} mt={2}>
                    <TextField
                      id="barcode"
                      name="barcode"
                      label="Barcode"
                      variant="outlined"
                      fullWidth
                      value={values.barcode}
                      onChange={handleChange}
                      error={touched.barcode && Boolean(errors.barcode)}
                      helperText={touched.barcode && errors.barcode}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} mt={2}>
                    <TextField
                      id="source"
                      name="source"
                      select
                      label="Source"
                      variant="outlined"
                      fullWidth
                      value={values.source}
                      onChange={handleChange}
                    >
                      <MenuItem value="medicaid">medicaid</MenuItem>
                      <MenuItem value="Self Pay">Self Pay</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6} mt={2}>
                    <TextField
                      id="date"
                      name="date"
                      label="Date"
                      type="date"
                      variant="outlined"
                      fullWidth
                      value={values.date}
                      onChange={handleChange}
                      error={touched.date && Boolean(errors.date)}
                      helperText={touched.date && errors.date}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} mt={2}>
                    <TextField
                      id="amount"
                      name="amount"
                      label="Amount ($)"
                      variant="outlined"
                      fullWidth
                      type="number"
                      value={values.amount}
                      onChange={handleChange}
                      error={touched.amount && Boolean(errors.amount)}
                      helperText={touched.amount && errors.amount}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} mt={2}>
                    <TextField
                      id="observed_by"
                      name="observed_by"
                      label="Observed By"
                      variant="outlined"
                      fullWidth
                      value={values.observed_by}
                      onChange={handleChange}
                      error={touched.observed_by && Boolean(errors.observed_by)}
                      helperText={touched.observed_by && errors.observed_by}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} mt={2}>
                    <TextField
                      id="status"
                      name="status"
                      label="Status"
                      variant="outlined"
                      fullWidth
                      value={values.status}
                      onChange={handleChange}
                      error={touched.status && Boolean(errors.status)}
                      helperText={touched.status && errors.status}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions sx={{ mx: 2 }}>
                <StyledButton
                  title={"Cancel"}
                  autoFocus
                  onClick={handleClose}
                />
                <StyledButton
                  title={isEditing ? "Update" : "Submit"}
                  type="submit"
                  autoFocus
                />
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
};
export default AddAndEditRowModule;
