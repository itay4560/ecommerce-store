import { ThemeProvider } from "@emotion/react";
import React, { useEffect } from "react";
import theme from "../../theme";
import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useShoppingStore } from "../../store/useShoppingStore";
import agent from "../../api/agent";
import { useAdminShoppingStore } from "../../store/useAdminShoppingStore";
import SideBar from "./SideBar";
import { ToastContainer } from "react-toastify";

const DashboardPage = () => {
  const { setData } = useAdminShoppingStore();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const users = await agent.AdminActions.getUsers();
        const orders = await agent.AdminActions.getOrders();
        const products = await agent.Products.list();
        setData({ users, orders, products });
      } catch (error: any) {
        console.log("🚀 ~ useEffect ~ fetchAll:", error);
      }
    };
    fetchAll();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <SideBar />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
};

export default DashboardPage;
