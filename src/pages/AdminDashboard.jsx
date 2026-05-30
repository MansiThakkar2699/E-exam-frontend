import React, { useEffect, useState } from "react";

import axiosInstance from "../api/axiosInstance";

import { toast } from "react-toastify";

import StatCard from "../components/dashboard/StatCard";

import {
  Users,
  GraduationCap,
  FileText,
  Building2,
  Clock3,
  Activity,
  UserCheck,
  BarChart3,
  User,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState({});

  const [recentUsers, setRecentUsers] = useState([]);

  const [upcomingExams, setUpcomingExams] = useState([]);

  // GET DASHBOARD
  const getDashboard = async () => {
    try {
      const res = await axiosInstance.get("/dashboard/admin");

      setAnalytics(res.data.analytics);

      setRecentUsers(res.data.recentUsers);

      setUpcomingExams(res.data.upcomingExams);
    } catch (error) {
      toast.error("Failed to fetch dashboard");
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

  // BAR CHART DATA
  const chartData = [
    {
      name: "Students",
      value: analytics.totalStudents,
    },
    {
      name: "Faculty",
      value: analytics.totalFaculties,
    },
    {
      name: "Exams",
      value: analytics.totalExams,
    },
    {
      name: "Departments",
      value: analytics.totalDepartments,
    },
  ];

  // PIE CHART DATA
  const pieData = [
    {
      name: "Approved",
      value: analytics.totalStudents + analytics.totalFaculty - analytics.pendingApprovals,
    },
    {
      name: "Pending",
      value: analytics.pendingApprovals,
    },
  ];

  const COLORS = ["#2563eb", "#f59e0b"];

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="space-y-6">
      {/* TOP */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Welcome back, {user?.fullName}</h2>

        <p className="text-slate-500 mt-1">Here's what's happening today.</p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5 mb-8">
        <StatCard
          title="Students"
          value={analytics.totalStudents || 0}
          icon={<Users className="text-white" />}
          color="bg-green-600"
        />

        <StatCard
          title="Faculties"
          value={analytics.totalFaculties || 0}
          icon={<GraduationCap className="text-white" />}
          color="bg-purple-600"
        />

        <StatCard
          title="Exams"
          value={analytics.totalExams || 0}
          icon={<FileText className="text-white" />}
          color="bg-orange-600"
        />

        <StatCard
          title="Departments"
          value={analytics.totalDepartments || 0}
          icon={<Building2 className="text-white" />}
          color="bg-pink-600"
        />

        <StatCard
          title="Pending Approvals"
          value={analytics.pendingApprovals || 0}
          icon={<Clock3 className="text-white" />}
          color="bg-pink-600"
        />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* BAR CHART*/ }
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <BarChart3 size={22} />
            </div>

            <div>
              <h2 className="font-bold text-slate-800">System Overview</h2>

              <p className="text-sm text-slate-500">
                Overall system statistics
              </p>
            </div>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PIE CHART */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
              <Activity size={22} />
            </div>

            <div>
              <h2 className="font-bold text-slate-800">Approval Analytics</h2>

              <p className="text-sm text-slate-500">
                Approved vs Pending users
              </p>
            </div>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={100} label>
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* TABLES */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* RECENT USERS */ }
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-200 p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <UserCheck size={22} />
            </div>

            <div>
              <h2 className="font-bold text-slate-800">Recent Users</h2>

              <p className="text-sm text-slate-500">Latest registrations</p>
            </div>
          </div>

          <div className="divide-y divide-slate-200">
            {recentUsers.map((user) => (
              <div
                key={user._id}
                className="flex items-center justify-between p-5"
              >
                <div>
                  <h3 className="font-semibold text-slate-800">
                    {user.fullName}
                  </h3>

                  <p className="text-sm text-slate-500">{user.email}</p>
                </div>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600 capitalize">
                  {user.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* UPCOMING EXAMS */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-200 p-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-green-600">
              <FileText size={22} />
            </div>

            <div>
              <h2 className="font-bold text-slate-800">Upcoming Exams</h2>

              <p className="text-sm text-slate-500">Scheduled exams</p>
            </div>
          </div>

          <div className="divide-y divide-slate-200">
            {upcomingExams.map((exam) => (
              <div
                key={exam._id}
                className="flex items-center justify-between p-5"
              >
                <div>
                  <h3 className="font-semibold text-slate-800">{exam.title}</h3>

                  <p className="text-sm text-slate-500">{exam.subject?.name}</p>
                </div>

                <span className="text-sm font-medium text-slate-600">
                  {new Date(exam.examDate).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
