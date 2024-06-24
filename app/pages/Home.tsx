"use client";

import React from "react";
import DataTable from "../components/Table";
import { Box, Typography } from "@mui/material";
import StyledButton from "../components/StyledButton";
import AddAndEditRowModule from "../components/AddAndEditRowModule";
import { RowData } from "../types/tables";
import { addRow, editRow } from "../../lib/reducers/home";
import { v4 as uuid } from "uuid";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";

const headers = [
  "DONOR",
  "PENELS",
  "BARCODE",
  "SOURCE",
  "DATE",
  "AMOUNT ($)",
  "OVSERVED (BY)",
  "STATUS",
  "ACTION",
];
const Home: React.FC = () => {
  const tableData = useAppSelector((state) => state.home.tableData);
  const dispatch = useAppDispatch();
  const [itemToBeEdit, setItemToBeEdit] = React.useState<RowData | null>(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleEdit = (item: RowData) => {
    setOpen(true);
    setItemToBeEdit(item);
    setIsEditing(true);
  };
  const handleSubmit = (item: RowData) => {
    if (isEditing && itemToBeEdit) {
      const { _id } = itemToBeEdit;
      dispatch(editRow({ _id, ...item }));
    } else {
      dispatch(addRow({ _id: uuid(), ...item }));
    }
    setIsEditing(false);
    setItemToBeEdit(null);
  };
  return (
    <>
      <Box
        display={{ xs: "block", sm: "flex" }}
        justifyContent={"space-between"}
        my={2}
      >
        <Typography variant="h5" gutterBottom fontWeight={"bold"}>
          Home
        </Typography>
        <StyledButton title="Add" onClick={handleClickOpen} />
      </Box>
      <DataTable handleEdit={handleEdit} rows={tableData} headers={headers} />
      <AddAndEditRowModule
        open={open}
        setOpen={setOpen}
        isEditing={isEditing}
        itemToBeEdit={itemToBeEdit}
        onSubmit={handleSubmit}
      />
    </>
  );
};
export default Home;
