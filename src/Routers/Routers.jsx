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
import DashBoardLayout from "../Layout/DashBoardLayout";
import Myparcels from "../Pages/DashBoard/Myparcels";
import Payment from "../Pages/DashBoard/Payment";
import PaymentSuccessFul from "../Pages/DashBoard/PaymentSuccessFul";
import PaymentCancel from "../Pages/DashBoard/PaymentCancel";
import PaymentHistry from "../Pages/DashBoard/PaymentHistry";
import ApproveRiders from "../Pages/DashBoard/ApproveRiders";
import UsersManegement from "../Pages/DashBoard/UsersManegement";
import AdminRoute from "./AdminRoute";
import AssignRider from "../Raider/AssignRider";

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
        loader: () => fetch("/location.json").then((res) => res.json()),
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
  {
    path: "dashboard",
    element: (
      <PrivetRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivetRoute>
    ),
    children: [
      {
        path: "my-parcels",
        Component: Myparcels,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "payment-success",
        Component: PaymentSuccessFul,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancel,
      },
      {
        path: "payment-history",
        Component: PaymentHistry,
      },
      {
        path: "approve-riders",
        element: (
          <AdminRoute>
            <ApproveRiders></ApproveRiders>
          </AdminRoute>
        ),
      },
      {
        path: "assign-riders",
        element: (
          <AdminRoute>
            <AssignRider></AssignRider>
          </AdminRoute>
        ),
      },
      {
        path: "users-management",
        element: (
          <AdminRoute>
            <UsersManegement></UsersManegement>
          </AdminRoute>
        ),
      },
    ],
  },
]);
