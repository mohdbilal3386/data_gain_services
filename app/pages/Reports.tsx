"use client";
import { Box, Typography } from "@mui/material";
import React from "react";

const Reports = () => {
  return (
    <>
      <Box
        display={{ xs: "block", sm: "flex" }}
        justifyContent={"space-between"}
        my={2}
      >
        <Typography variant="h5" gutterBottom fontWeight={"bold"}>
          Reports
        </Typography>
      </Box>
      <Box>Coming Soon!!!!!!!</Box>
    </>
  );
};

export default Reports;
