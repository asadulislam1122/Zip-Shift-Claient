import React from "react";
import logo from "../../assets/logo.png";
const Logo = () => {
  return (
    <div className="flex justify-center text-center">
      <img src={logo} alt="" />
      <p className="mt-6 text-3xl text-secondary font-semibold">TradeFlow</p>
    </div>
  );
};

export default Logo;
