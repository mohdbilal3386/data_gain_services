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

interface RowProps {
  row: RowData;
}

const EditDeleteMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton aria-label="MoreVertIcon" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </div>
  );
};

const RowComponent: React.FC<RowProps> = ({ row }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell sx={{ color: "#17c2af" }} component="th" scope="row">
          {row.donor}
        </TableCell>
        <TableCell align="center">{row.panels}</TableCell>
        <TableCell sx={{ color: "#17c2af" }} align="center">
          {row.barcode}
        </TableCell>
        <TableCell align="center">{row.source}</TableCell>
        <TableCell align="center">{row.date}</TableCell>
        <TableCell align="center">{row.amount}</TableCell>
        <TableCell align="center">{row.observed_by}</TableCell>
        <TableCell align="center">{row.status}</TableCell>
        <TableCell align="center">
          <Tooltip title={"Edit & Delete"} arrow>
            <EditDeleteMenu />
          </Tooltip>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases"></Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

interface DataTableProps {
  rows: RowData[];
  headers: string[];
}

const DataTable: React.FC<DataTableProps> = ({ rows, headers }) => {
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
              <TableCell />
              {headers.map((header, index) => (
                <TableCell key={index} align={index === 0 ? "left" : "center"}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <RowComponent key={row._id} row={row} />
              ))}
          </TableBody>
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
