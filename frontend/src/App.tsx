import { useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import agent from "./api/agent";
import { useShoppingStore } from "./store/useShoppingStore";
import Footer from "./components/Footer/Footer";

export default function App() {
  const { setProducts, logOut } = useShoppingStore();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const _products = await agent.Products.list();
        setProducts(_products);
      } catch (error: any) {
        console.log("🚀 ~ useEffect ~ fetchAll:", error);
        logOut();
      }
    };
    fetchAll();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <Header />
      <Outlet />
      <Footer />
    </ThemeProvider>
  );
}
