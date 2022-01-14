import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const BasicTable = ({ columnName, data }) => {
  return (
    <TableContainer component={Paper} style={{ width: "90%" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#f2f2f2" }}>
          <TableRow>
            {columnName.slice(0, columnName.length - 1).map((name) => (
              <TableCell align="left">{name}</TableCell>
            ))}
            {columnName.slice(-1).map((name) => (
              <TableCell align="right">{name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row[0]}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {row.slice(0, row.length - 1).map((value) => (
                <TableCell align="left">{value}</TableCell>
              ))}
              {row.slice(-1).map((value) => (
                <TableCell align="right">{value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
