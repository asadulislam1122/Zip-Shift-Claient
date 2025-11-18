import React from "react";
import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home/Home/Home";
import Covarage from "../Pages/Covarage/Covarage";
import AuthKayout from "../Layout/AuthKayout";
import Login from "../AuthPage/Login";
import Register from "../AuthPage/Register";

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
        Component: Covarage,
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
