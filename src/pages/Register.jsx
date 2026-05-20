import React, { useState } from "react";
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

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "student",
    department: "",
    mobile: "",
  });

  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axiosInstance.post("/auth/register", formData);

      alert(res.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
        {/* Left Image Section */}
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

        {/* Right Form Section */}
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

            <form onSubmit={submitHandler} className="space-y-4">
              <div className="relative">
                <User
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={changeHandler}
                  placeholder="Full Name"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={changeHandler}
                  placeholder="Email Address"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={changeHandler}
                  placeholder="Password"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="relative">
                <Users
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <select
                  name="role"
                  value={formData.role}
                  onChange={changeHandler}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                </select>
              </div>

              <div className="relative">
                <Building2
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={changeHandler}
                  placeholder="Department"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="relative">
                <Phone
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={changeHandler}
                  placeholder="Mobile Number"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
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