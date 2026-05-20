import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const redirectByRole = (role) => {
    if (role === "admin") navigate("/admin/dashboard");
    else if (role === "faculty") navigate("/faculty/dashboard");
    else navigate("/student/dashboard");
  };

  const submitHandler = async (data) => {
    try {
      setLoading(true);

      const res = await axiosInstance.post("/auth/login", data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      redirectByRole(res.data.user.role);
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        <div className="relative hidden lg:block">
          <img
            src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80"
            alt="E Exam Portal"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-indigo-900/75 to-cyan-800/70"></div>

          <div className="absolute inset-0 flex flex-col justify-between p-10 text-white">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                <GraduationCap size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">E-Exam Portal</h2>
                <p className="text-sm text-blue-100">
                  Smart Online Examination System
                </p>
              </div>
            </div>

            <div>
              <h1 className="text-4xl font-bold leading-tight mb-4">
                Conduct exams online with confidence.
              </h1>
              <p className="text-blue-100 text-lg">
                Create exams, attempt tests, evaluate answers and track progress
                digitally from one platform.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="rounded-2xl bg-white/15 backdrop-blur p-4">
                <h3 className="text-2xl font-bold">24/7</h3>
                <p className="text-xs text-blue-100">Online Access</p>
              </div>
              <div className="rounded-2xl bg-white/15 backdrop-blur p-4">
                <h3 className="text-2xl font-bold">Auto</h3>
                <p className="text-xs text-blue-100">Evaluation</p>
              </div>
              <div className="rounded-2xl bg-white/15 backdrop-blur p-4">
                <h3 className="text-2xl font-bold">Live</h3>
                <p className="text-xs text-blue-100">Reports</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <div className="lg:hidden mb-5 flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
                  <GraduationCap size={28} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    E-Exam Portal
                  </h2>
                  <p className="text-sm text-slate-500">
                    Online Examination System
                  </p>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-slate-900">
                Welcome Back
              </h1>
              <p className="text-slate-500 mt-2">
                Login to continue your examination journey.
              </p>
            </div>

            <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <div className="mt-2 relative">
                  <Mail
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Enter valid email address",
                      },
                    })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Password
                </label>
                <div className="mt-2 relative">
                  <Lock
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 transition disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-7">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="font-semibold text-blue-600">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;