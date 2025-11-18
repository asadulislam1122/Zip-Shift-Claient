import React from "react";
import { Outlet } from "react-router";
import Footer from "../Pages/Shayred/Navbar/Footer/Footer";
import Navbar from "../Pages/Shayred/Navbar/Navbar";

const RootLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <main className="w-11/12 mx-auto">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
