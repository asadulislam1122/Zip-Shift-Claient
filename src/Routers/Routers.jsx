import React from "react";
import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Covarage from "../Pages/Covarage/Covarage";
import AuthKayout from "../Layout/AuthKayout";
import Login from "../AuthPage/Login";
import Register from "../AuthPage/Register";
import PrivetRoute from "./PrivetRoute";
import Raider from "../Raider/Raider";
import SendParcel from "../Pages/SendParsel/SendParcel";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    hydrateFallbackElement: <p>Loading.....</p>,
    children: [
      { index: true, Component: Home },
      {
        path: "/coverage",

        loader: () => fetch("/location.json").then((res) => res.json()),
        // Component: Covarage,
        element: (
          <PrivetRoute>
            <Covarage></Covarage>
          </PrivetRoute>
        ),
      },
      {
        path: "/raider",
        element: (
          <PrivetRoute>
            <Raider></Raider>
          </PrivetRoute>
        ),
      },
      {
        path: "/send_parsel",
        loader: () => fetch("/location.json").then((res) => res.json()),
        element: (
          <PrivetRoute>
            <SendParcel></SendParcel>
          </PrivetRoute>
        ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthKayout,
    children: [
      { path: "/login", Component: Login },
      { path: "/register", Component: Register },
    ],
  },
]);
