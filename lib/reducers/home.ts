import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { tablesData } from "@/app/constant/tables";
import { RowData } from "@/app/types/tables";

interface HomeTypes {
  tableData: RowData[];
}

const initialState: HomeTypes = {
  tableData: tablesData as RowData[],
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    addRow: (state, action: PayloadAction<RowData>) => {
      state.tableData = [...state.tableData, action.payload];
    },
    editRow: (state, action: PayloadAction<RowData>) => {
      state.tableData = state.tableData.map((row: RowData) =>
        row._id === action.payload._id ? action.payload : row
      );
    },
    deleteRow: (state, action: PayloadAction<string>) => {
      state.tableData = state.tableData.filter(
        (row: RowData) => row._id !== action.payload
      );
    },
  },
});

export const { addRow, editRow, deleteRow } = homeSlice.actions;
