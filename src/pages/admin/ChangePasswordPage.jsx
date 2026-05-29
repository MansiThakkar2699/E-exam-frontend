import React from "react";

import { useForm } from "react-hook-form";

import axiosInstance from "../../api/axiosInstance";

import { toast } from "react-toastify";

const ChangePasswordPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const submitHandler = async (data) => {
    try {
      const res = await axiosInstance.put(
        "/auth/change-password",
        data,
      );

      toast.success(res.data.message);

      reset();
    } catch (error) {
        console.log(error)
      toast.error(
        error.response?.data?.message ||
          "Failed to change password",
      );
    }
  };

  return (
    <div className="max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Change Password
        </h1>

        <p className="mt-1 text-slate-500">
          Update your account password
        </p>
      </div>

      <form
        onSubmit={handleSubmit(submitHandler)}
        className="space-y-5"
      >
        {/* OLD PASSWORD */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Old Password
          </label>

          <input
            type="password"
            {...register("oldPassword", {
              required: "Old password is required",
            })}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
          />

          {errors.oldPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.oldPassword.message}
            </p>
          )}
        </div>

        {/* NEW PASSWORD */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            New Password
          </label>

          <input
            type="password"
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
          />

          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;