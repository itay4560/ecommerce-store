import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Orders from "../../Orders/Orders";
import { useAdminShoppingStore } from "../../../store/useAdminShoppingStore";
import agent from "../../../api/agent";
import { toast } from "react-toastify";
import { Product } from "../../../models/Product";
import ProductCard from "../../ProductCard";
import { DeleteForever } from "@mui/icons-material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { TableOrders } from "../../Tables/TableOrders";

const OrdersManagement = () => {
  const { data } = useAdminShoppingStore();

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
        <Typography variant="h2">System Orders</Typography>
      </Box>

      {data['orders'] && data['orders'].length == 0 && (
        <Typography variant="h4">No orders yet</Typography>
      )}

      {data['orders'] && data['orders'].length > 0 && (
      <Box>
        <TableOrders />
      </Box>
      )}
    </Box>
  );
};

export default OrdersManagement;
