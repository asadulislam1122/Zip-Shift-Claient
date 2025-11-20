import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router";
const Logo = () => {
  return (
    <div className="flex justify-center text-center">
      <img src={logo} alt="" />
      <Link to={"/"}>
        <p className="mt-6 text-3xl text-secondary font-semibold">TradeFlow</p>
      </Link>
    </div>
  );
};

export default Logo;
