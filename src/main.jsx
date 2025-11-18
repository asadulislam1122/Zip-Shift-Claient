import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { router } from "./Routers/Routers.jsx";
import { RouterProvider } from "react-router/dom";
import AuthProvaider from "./Context/AuthProvaider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvaider>
      {" "}
      <RouterProvider router={router} />
    </AuthProvaider>
  </StrictMode>
);
