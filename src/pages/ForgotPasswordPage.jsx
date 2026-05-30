import React from "react";

import { useForm } from "react-hook-form";

import axiosInstance from "../../src/api/axiosInstance";

import { toast } from "react-toastify";

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    try {
      const res = await axiosInstance.post(
        "/auth/forgot-password",
        data,
      );

      toast.success(res.data.message);

      reset();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong",
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-slate-800">
          Forgot Password
        </h1>

        <p className="mt-2 text-slate-500">
          Enter your email to receive reset link
        </p>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="mt-6 space-y-5"
        >
          <div>
            <input
              type="email"
              placeholder="Enter email"
              {...register("email", {
                required: "Email is required",
              })}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;