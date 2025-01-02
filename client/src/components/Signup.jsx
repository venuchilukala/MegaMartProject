import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import Modal from "./Modal";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  return (
    <div className="max-w-md shadow flex items-center justify-center mx-auto bg-white w-full my-20 relative">
      <div className="modal-action flex flex-col justify-center items-center mt-0 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body"
          method="dialog"
        >
          <h3 className="font-bold text-lg">Create an account!</h3>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              {...register("email")}
            />
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              {...register("password")}
            />
            {/* <label className="label mt-1">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label> */}
          </div>
          {/* Error */}

          {/* Login Btn */}
          <div className="form-control mt-6">
            <input type="submit" value="Login" className="btn btn-primary" />
          </div>
          <p className="text-center my-2">
            Have an account?{" "}
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="text-red-500 underline ml-2"
            >
              Login
            </button>
          </p>

          <Link to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-1 top-2"
          >
            ✕
          </Link>
        </form>

        <div className="flex gap-5 my-5">
          <button className="btn btn-circle hover:bg-primary hover:text-white">
            <FaGoogle />
          </button>
          <button className="btn btn-circle hover:bg-primary hover:text-white">
            <FaFacebookF />
          </button>
          <button className="btn btn-circle hover:bg-primary hover:text-white">
            <FaXTwitter />
          </button>
        </div>
      </div>
      <Modal />
    </div>
  );
};

export default Signup;
