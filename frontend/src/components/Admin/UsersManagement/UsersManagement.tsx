import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAdminShoppingStore } from "../../../store/useAdminShoppingStore";
import { TableUsers } from "../../Tables/TableUsers";

const UsersManagement = () => {
  const { data } = useAdminShoppingStore();
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    if (data.users) {
      const _users = [...data.users].map((item, index) => {
        return {
          id: index,
          ...item,
        };
      });
      setUsers(_users);
    }
  }, [data.users]);

  return (
    <Box
      sx={{
        justifyContent: "center",
        marginTop: "100px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ marginBottom: "20px" }}>
        <Typography variant="h2">System Users</Typography>
      </Box>

      {data.users && data.users.length == 0 && (
        <Typography variant="h4">No users yet</Typography>
      )}

      {data.users && data.users.length > 0 && <TableUsers />}
    </Box>
  );
};

export default UsersManagement;
