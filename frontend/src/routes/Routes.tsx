import { Navigate, createBrowserRouter } from "react-router-dom";
import HomePage from "../components/Home/HomePage";
import App from "../App";
import DashboardPage from "../components/Admin/DashboardPage";
import ProductPage from "../components/Product/ProductPage";
import Catalog from "../components/Catalog/Catalog";
import About from "../components/About/About";
import SignInPage from "../components/UserActions/SignInPage";
import RegisterPage from "../components/UserActions/RegisterPage";
import CartPage from "../components/CartPage/CartPage";
import Orders from "../components/Orders/Orders";
import OrdersManagement from "../components/Admin/OrdersManagement/OrdersManagement";
import UsersManagement from "../components/Admin/UsersManagement/UsersManagement";
import ProductManagement from "../components/Admin/ProductManagement/ProductManagement";
import EditUser from "../components/Admin/UsersManagement/EditUser";
import EditProduct from "../components/Admin/ProductManagement/EditProduct";
import NewProduct from "../components/Admin/ProductManagement/NewProduct";

export const router = createBrowserRouter([
  {
    path: "/admin",
    element: <DashboardPage />,
    children: [
      { path: "/admin/orders", element: <OrdersManagement /> },
      { path: "/admin/users", element: <UsersManagement /> },
      { path: "/admin/user/:id", element: <EditUser /> },
      { path: "/admin/products", element: <ProductManagement /> },
      { path: "/admin/product/:id", element: <EditProduct /> },
      { path: "/admin/product/new", element: <NewProduct /> },
    ],
  },
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "products", element: <Catalog /> },
      { path: "product/:id", element: <ProductPage /> },
      { path: "about", element: <About /> },
      { path: "login", element: <SignInPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "cart", element: <CartPage /> },
      { path: "orders", element: <Orders /> },
      //   { path: "contact", element: <ContactPage /> },
      //   { path: "not-found", element: <NotFound /> },
      //   { path: "server-error", element: <ServerError /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
]);
