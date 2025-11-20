import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import { Link, useNavigate } from "react-router";
import SosialButton from "./SosialButton";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser } = useAuth();

  const handleRegister = (data) => {
    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        toast.success("Register Suscessfull", {
          autoClose: 1000,
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
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
            {/* name */}
            {/* <label className="label font-semibold">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input w-full border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/30 rounded-lg p-2"
              placeholder="Your Name"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500 text-sm">Name is required</p>
            )} */}

            {/* photo  */}

            {/* <label className="label font-semibold">Photo</label>
            <input
              type="file"
              {...register("photo", { required: true })}
              className="file-input w-full border border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/30 rounded-lg p-2"
              placeholder="Enter your email"
            />
            {errors.photo?.type === "required" && (
              <p className="text-red-500 text-sm">Photo is required</p>
            )} */}
            {/*  */}
            {/* email */}
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
            {/* password */}
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
        <SosialButton></SosialButton>
      </div>
    </div>
  );
};

export default Register;
