import * as ReactDOM from "react-dom/client";
import { router } from "./routes/Routes";
import { RouterProvider } from "react-router-dom";
import "./global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
