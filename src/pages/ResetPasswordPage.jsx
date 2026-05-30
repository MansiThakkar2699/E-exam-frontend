import React from "react";

import { useForm } from "react-hook-form";

import { useParams, useNavigate } from "react-router-dom";

import axiosInstance from "../../src/api/axiosInstance";

import { toast } from "react-toastify";

const ResetPasswordPage = () => {
  const { token } = useParams();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    try {
      const res = await axiosInstance.post(
        `/auth/reset-password/${token}`,
        data,
      );

      toast.success(res.data.message);

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Reset failed",
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-slate-800">
          Reset Password
        </h1>

        <p className="mt-2 text-slate-500">
          Enter your new password
        </p>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="mt-6 space-y-5"
        >
          <div>
            <input
              type="password"
              placeholder="New Password"
              {...register("password", {
                required: "Password is required",

                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;