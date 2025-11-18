import React from "react";
import Logo from "../Components/Logo/Logo";
import { Outlet } from "react-router";
import authImg from "../assets/authImage.png";

const AuthKayout = () => {
  return (
    <div className="w-11/12 mx-auto">
      <nav className="flex justify-start mt-7">
        <Logo></Logo>
      </nav>

      <div className="flex flex-col-reverse md:flex-row mt-8 items-center md:items-start gap-6">
        <main className="flex-1 w-full md:w-1/2">
          <Outlet></Outlet>
        </main>

        <div className="flex-1 w-full md:w-1/2 flex justify-center">
          <img
            src={authImg}
            alt="Auth Image"
            className="w-full max-w-sm md:max-w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthKayout;

// import React from "react";
// import Logo from "../Components/Logo/Logo";
// import { Outlet } from "react-router";
// import authImg from "../assets/authImage.png";
// const AuthKayout = () => {
//   return (
//     <div className="w-11/12 mx-auto">
//       <nav className="flex justify-start mt-7">
//         <Logo></Logo>
//       </nav>
//       <div className="flex mt-8">
//         <main className="flex-1">
//           <Outlet></Outlet>
//         </main>
//         <div className="flex-1">
//           <img src={authImg} alt="" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthKayout;
