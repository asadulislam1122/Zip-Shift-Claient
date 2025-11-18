import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import { Link } from "react-router";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser, signInUser } = useAuth();

  const handleRegister = (data) => {
    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-200">
        <h3 className="text-center text-3xl font-bold text-secondary mb-6">
          Please Register
        </h3>

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
          <fieldset className="fieldset space-y-2">
            <label className="label font-semibold">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input w-full border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/30 rounded-lg p-2"
              placeholder="Enter your email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500 text-sm">Email is required</p>
            )}

            <label className="label font-semibold mt-3">Password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}\[\]|\\:;"'<>,.?/~`]).{6,}$/,
              })}
              className="input w-full border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/30 rounded-lg p-2"
              placeholder="Enter your password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500 text-sm">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-sm">
                Password must be 6 characters or longer!
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500 text-sm">
                Password must include uppercase, lowercase, number & symbol!
              </p>
            )}

            <div className="mt-2 text-right">
              <a className="link link-hover text-blue-600 text-sm cursor-pointer">
                Forgot password?
              </a>
            </div>

            <button className="btn w-full btn-primary text-black mt-4 rounded-lg py-2 shadow-md hover:shadow-lg transition-all">
              Register
            </button>

            <p className="text-secondary text-center text-sm mt-3">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="font-semibold text-blue-500 hover:text-green-500"
              >
                Login
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;

// import React from "react";
// import { useForm } from "react-hook-form";
// import useAuth from "../Hooks/useAuth";
// import { Link } from "react-router";

// const Register = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   // useAuth
//   const { registerUser, signInUser } = useAuth();
//   const handleRegister = (data) => {
//     // console.log(data);
//     registerUser(data.email, data.password)
//       .then((result) => {
//         console.log(result.user);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
//   return (
//     <div className="flex justify-center ">
//       <h3 className="text-center text-3xl text-secondary mb-6 flex justify-center items-center mr-3">
//         Plece Login
//       </h3>
//       <form onSubmit={handleSubmit(handleRegister)}>
//         <fieldset className="fieldset">
//           {/* email */}
//           <label className="label">Email</label>
//           <input
//             type="email"
//             {...register("email", { required: true })}
//             className="input"
//             placeholder="Email"
//           />
//           {errors.email?.type === "required" && (
//             <p className="text-red-500">Email is Required</p>
//           )}
//           {/* password */}
//           <label className="label">Password</label>
//           <input
//             type="password"
//             {...register("password", {
//               required: true,
//               minLength: 6,
//               pattern:
//                 /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]).{6,}$/,
//             })}
//             className="input"
//             placeholder="Password"
//           />
//           {errors.password?.type === "required" && (
//             <p className="text-red-500">Password is Requirde !!!!</p>
//           )}
//           {errors.password?.type === "minLength" && (
//             <p
//               className="
//             text-red-500"
//             >
//               password must be 6 ceracter or Longer!!!!
//             </p>
//           )}
//           {errors.password?.type === "pattern" && (
//             <p className="text-red-500">
//               Password hase been uppuercase lowercase latter simbole !!!!!!!
//             </p>
//           )}
//           {/* forget */}
//           <div>
//             <a className="link link-hover">Forgot password?</a>
//           </div>
//           <button className="btn md:w-[320px] btn-primary text-black mt-4">
//             Register
//           </button>
//           <p className="text-secondary">
//             Already have A Account ...{" "}
//             <Link
//               to={"/login"}
//               className="font-semibold text-blue-500 hover:text-green-500"
//             >
//               Login
//             </Link>
//           </p>
//         </fieldset>
//       </form>
//     </div>
//   );
// };

// export default Register;
