import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import {
  Building2,
  GraduationCap,
  Lock,
  Mail,
  Phone,
  User,
  Users,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [departments, setDepartments] = useState([]);

  const getDepartments = async () => {
    try {
      const res = await axiosInstance.get("/department/departments?limit=100");

      setDepartments(res.data.departments);
    } catch (error) {
      toast.error("Failed to fetch departments");
    }
  };

  useEffect(() => {
    getDepartments();
  }, []);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "student",
    },
  });

  const submitHandler = async (data) => {
    try {
      setLoading(true);

      const res = await axiosInstance.post("/auth/register", data);
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
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
            alt="Online exam registration"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/90 via-blue-900/80 to-cyan-800/70"></div>

          <div className="absolute inset-0 flex flex-col justify-between p-10 text-white">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
                <GraduationCap size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">E-Exam Portal</h2>
                <p className="text-sm text-blue-100">
                  Register. Learn. Attempt. Improve.
                </p>
              </div>
            </div>

            <div>
              <h1 className="text-4xl font-bold leading-tight mb-4">
                Start your digital exam experience.
              </h1>
              <p className="text-blue-100 text-lg">
                Students can attend exams, faculties can create tests and admins
                can manage the complete examination workflow.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="rounded-2xl bg-white/15 backdrop-blur p-4">
                <h3 className="text-2xl font-bold">MCQ</h3>
                <p className="text-xs text-blue-100">Tests</p>
              </div>
              <div className="rounded-2xl bg-white/15 backdrop-blur p-4">
                <h3 className="text-2xl font-bold">Timer</h3>
                <p className="text-xs text-blue-100">Based Exam</p>
              </div>
              <div className="rounded-2xl bg-white/15 backdrop-blur p-4">
                <h3 className="text-2xl font-bold">Result</h3>
                <p className="text-xs text-blue-100">Tracking</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">
            <div className="mb-6">
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
                Create Account
              </h1>
              <p className="text-slate-500 mt-2">
                Register to access your exam dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
              <div>
                <div className="relative">
                  <User
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    placeholder="Full Name"
                    {...register("fullName", {
                      required: "Full name is required",
                      minLength: {
                        value: 3,
                        message: "Full name must be at least 3 characters",
                      },
                    })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <div className="relative">
                  <Mail
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
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
                <div className="relative">
                  <Lock
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="password"
                    placeholder="Password"
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

              <div>
                <div className="relative">
                  <Users
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <select
                    {...register("role", {
                      required: "Role is required",
                    })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                  </select>
                </div>
                {errors.role && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.role.message}
                  </p>
                )}
              </div>

              <div>
                <div className="relative">
                  <Building2
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <select
                    name="department"
                    value={watch("department")}
                    {...register("department", {
                      required: "Department is required",
                    })}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 pl-12 pr-4"
                  >
                    <option value="">Select Department</option>

                    {departments.map((department) => (
                      <option key={department._id} value={department._id}>
                        {department.name}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.department && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.department.message}
                  </p>
                )}
              </div>

              <div>
                <div className="relative">
                  <Phone
                    size={20}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    placeholder="Mobile Number"
                    {...register("mobile", {
                      required: "Mobile number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Mobile number must be 10 digits",
                      },
                    })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
                {errors.mobile && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.mobile.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 transition disabled:opacity-60"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <p className="text-center text-sm text-slate-500 mt-6">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-blue-600">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
