"use client";

import React from "react";
import { RowData } from "../module/tables";
import DataTable from "../components/Table";
const createData = (
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
  price: number
): RowData => ({
  name,
  calories,
  fat,
  carbs,
  protein,
  price,
  history: [
    { date: "2020-01-05", customerId: "11091700", amount: 3 },
    { date: "2020-01-02", customerId: "Anonymous", amount: 1 },
  ],
});
const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
  createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
  createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
];

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
  return <DataTable rows={rows} headers={headers} />;
};
export default Home;
