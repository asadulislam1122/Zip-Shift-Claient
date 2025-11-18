import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import { Link } from "react-router";
import SosialButton from "./SosialButton";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInUser } = useAuth();

  const handleLogin = (data) => {
    console.log(data);
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="card bg-white w-full max-w-sm shadow-xl rounded-2xl border border-gray-200">
        <h2 className="font-bold text-secondary text-3xl text-center mt-6 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-secondary text-sm mb-4">Please Login</p>

        <div className="card-body px-6 pb-8">
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-3">
            <fieldset className="fieldset space-y-2">
              <label className="label font-semibold">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input w-full border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/30 rounded-lg p-2"
                placeholder="Enter your email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500 text-sm">Email is required!</p>
              )}

              <label className="label font-semibold mt-3">Password</label>
              <input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                className="input w-full border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/30 rounded-lg p-2"
                placeholder="Enter your password"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500 text-sm">Password is required!</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600 text-sm">
                  Password must be at least 6 characters
                </p>
              )}

              <div className="text-right mt-2">
                <a className="link link-hover text-blue-600 text-sm cursor-pointer">
                  Forgot password?
                </a>
              </div>

              <button className="btn btn-primary w-full text-black mt-4 rounded-lg py-2 shadow-md hover:shadow-lg transition-all">
                Login
              </button>

              <p className="text-center text-secondary text-sm mt-3">
                Create a new account?{" "}
                <Link
                  to={"/register"}
                  className="font-semibold text-blue-700 hover:text-green-600 ml-1"
                >
                  Register
                </Link>
              </p>
            </fieldset>
          </form>
          <SosialButton></SosialButton>
        </div>
      </div>
    </div>
  );
};

export default Login;

// import React from "react";
// import { useForm } from "react-hook-form";
// import useAuth from "../Hooks/useAuth";
// import { Link } from "react-router";

// const Login = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   //
//   const { signInUser } = useAuth();
//   const handleLogin = (data) => {
//     console.log(data);
//     signInUser(data.email, data.password)
//       .then((result) => {
//         console.log(result.user);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   return (
//     <div className="card mx-auto  bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
//       <h2 className="font-semibold text-secondary text-3xl text-center">
//         Welcome Back <br /> Plece Login
//       </h2>
//       <div className="card-body">
//         <form onSubmit={handleSubmit(handleLogin)}>
//           <fieldset className="fieldset">
//             {/* email */}
//             <label className="label">Email</label>
//             <input
//               type="email"
//               {...register("email", { required: true })}
//               className="input"
//               placeholder="Email"
//             />
//             {errors.email?.type === "required" && (
//               <p className="text-red-500"> Email is Requared !!!</p>
//             )}
//             {/* password */}
//             <label className="label">Password</label>
//             <input
//               type="password"
//               {...register("password", { required: true, minLength: 6 })}
//               className="input"
//               placeholder="Password"
//             />
//             {errors.password?.type === "required" && (
//               <p className="text-red-500">Password is Requared !!</p>
//             )}
//             {errors.password?.type === "minLength" && (
//               <p className="text-red-600">Password must be 6 Ceracter</p>
//             )}
//             {/*  */}
//             <div>
//               <a className="link link-hover">Forgot password?</a>
//             </div>
//             <button className="btn btn-primary text-secondary mt-4">
//               Login
//             </button>
//             <p className="text-center text-secondary">
//               Create a new Account ....{" "}
//               <Link
//                 className="font-semibold text-blue-700 ml-4 hover:text-green-600"
//                 to={"/register"}
//               >
//                 Register
//               </Link>
//             </p>
//           </fieldset>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
