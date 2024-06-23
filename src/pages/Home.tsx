"use client";

import React from "react";
import DataTable from "../components/Table";
import { useAppSelector } from "../hooks/redux";

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
  return <DataTable rows={tableData} headers={headers} />;
};
export default Home;
