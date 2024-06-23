"use client";

import React from "react";
import DataTable from "../components/Table";
import { useAppSelector } from "../hooks/redux";
import { Box, Typography } from "@mui/material";
import StyledButton from "../components/StyledButton";

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
  const { tableData } = useAppSelector((state) => state.home);
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
        <StyledButton title="Add" />
      </Box>
      <DataTable rows={tableData} headers={headers} />
    </>
  );
};
export default Home;
