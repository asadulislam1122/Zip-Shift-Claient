import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { router } from "./Routers/Routers.jsx";
import { RouterProvider } from "react-router/dom";
import AuthProvaider from "./Context/AuthProvaider.jsx";
import { ToastContainer } from "react-toastify";
//
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//
const queryClient = new QueryClient();
//
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvaider>
        {" "}
        <RouterProvider router={router} />
      </AuthProvaider>
      <ToastContainer />
    </QueryClientProvider>
  </StrictMode>
);
