import React, { useEffect, useState } from "react";
import { useAdminShoppingStore } from "../../store/useAdminShoppingStore";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { NavLink } from "react-router-dom";
import agent from "../../api/agent";
import { toast } from "react-toastify";

export const TableUsers = () => {
  const { data } = useAdminShoppingStore();
  const [users, setUsers] = useState<any>([]);
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

  useEffect(() => {
    if (data.users) {
      setUsers(data.users);
    }
  }, [data.users]);

  const onDeleteUser = async (userId: number) => {
    await agent.AdminActions.deleteUser(userId);
    toast.success(`User ${userId} has beed deleted`);
    setUsers((prev: any) => {
      return prev.filter((o: any) => {
        return o["userId"] !== userId;
      });
    });
  };

  function Row(props: { row: ReturnType<any> }) {
    const { row } = props;
    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell component="th" scope="row">
            {row.userId}
          </TableCell>
          <TableCell>{row["userEmail"]}</TableCell>
          <TableCell>{row["roleId"]["roleName"]}</TableCell>
          <TableCell>
            <Box display={"flex"} gap={"25px"}>
              <Box
                sx={{ cursor: "pointer" }}
                onClick={() => onDeleteUser(row.userId)}
              >
                <DeleteForever
                  sx={{
                    ":hover": {
                      color: "red",
                    },
                  }}
                />
              </Box>
              <NavLink to={`/admin/user/${row["userId"]}`}>
                <Box sx={{ cursor: "pointer" }}>
                  <EditIcon
                    sx={{
                      ":hover": {
                        color: "red",
                      },
                    }}
                  />
                </Box>
              </NavLink>
            </Box>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <Paper>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>User Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any) => (
                <Row key={row.userId} row={row} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
