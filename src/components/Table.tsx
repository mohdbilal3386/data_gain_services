import * as React from "react";
import {
  TablePagination,
  Tooltip,
  Menu,
  MenuItem,
  Box,
  IconButton,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { RowData } from "../types/tables";
import { useAppDispatch } from "../hooks/redux";
import { deleteRow } from "../store/reducers/home";

interface RowProps {
  row: RowData;
  handleEdit: (item: RowData) => void;
}

const EditDeleteMenu: React.FC<{
  handleEdit: (item: RowData) => void;
  row: RowData;
}> = ({ row, handleEdit }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip arrow title={"Edit/Delete"}>
        <IconButton aria-label="MoreVertIcon" onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleEdit(row)}>Edit</MenuItem>
        <MenuItem
          onClick={() => {
            row._id && dispatch(deleteRow(row._id));
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

const RowComponent: React.FC<RowProps> = ({ row, handleEdit }) => {
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell sx={{ color: "#17c2af" }} component="th" scope="row">
          {row.donor}
        </TableCell>
        <TableCell align="center">{row.panels}</TableCell>
        <TableCell sx={{ color: "#17c2af" }} align="center">
          {row.barcode}
        </TableCell>
        <TableCell align="center">{row.source}</TableCell>
        <TableCell align="center">{row.date}</TableCell>
        <TableCell align="center">
          {row.amount.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </TableCell>
        <TableCell align="center">{row.observed_by}</TableCell>
        <TableCell align="center">{row.status}</TableCell>
        <TableCell align="center">
          <Tooltip title={"Edit & Delete"} arrow>
            <EditDeleteMenu handleEdit={handleEdit} row={row} />
          </Tooltip>
        </TableCell>
      </TableRow>
      <TableRow></TableRow>
    </React.Fragment>
  );
};

interface DataTableProps {
  rows: RowData[];
  headers: string[];
  handleEdit: (item: RowData) => void;
}

const DataTable: React.FC<DataTableProps> = ({ rows, headers, handleEdit }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow sx={{ bgcolor: "#e5e5e5" }}>
              {headers.map((header, index) => (
                <TableCell key={index} align={index === 0 ? "left" : "center"}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {rows.length === 0 ? (
            <Box py={10}>
              <Typography variant="h6" textAlign={"center"}>
                Sorry No Data Found
              </Typography>
            </Box>
          ) : (
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <RowComponent
                    handleEdit={handleEdit}
                    key={row._id}
                    row={row}
                  />
                ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default DataTable;
