import React, {
  useEffect,
  useState,
} from "react";

import axiosInstance from "../api/axiosInstance";

import { toast } from "react-toastify";

import StatCard from "../components/dashboard/StatCard";

import {
  BookOpen,
  FileQuestion,
  FileText,
  Users,
} from "lucide-react";

const AdminDashboard = () => {
  const [analytics, setAnalytics] =
    useState({});

  const [recentExams, setRecentExams] =
    useState([]);

  // GET DASHBOARD
  const getDashboard = async () => {
    try {
      const res = await axiosInstance.get(
        "/dashboard/admin"
      );

      setAnalytics(res.data.analytics);

      setRecentExams(res.data.recentExams);
    } catch (error) {
      toast.error(
        "Failed to fetch dashboard"
      );
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

  return (
    <div>
      {/* TOP */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Admin Dashboard
        </h1>

        <p className="text-slate-500 mt-1">
          Welcome to E-Exam Portal
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5 mb-8">
        <StatCard
          title="Total Users"
          value={analytics.totalUsers || 0}
          icon={<Users className="text-white" />}
          color="bg-blue-600"
        />

        <StatCard
          title="Students"
          value={
            analytics.totalStudents || 0
          }
          icon={<BookOpen className="text-white" />}
          color="bg-green-600"
        />

        <StatCard
          title="Faculties"
          value={
            analytics.totalFaculties || 0
          }
          icon={<Users className="text-white" />}
          color="bg-purple-600"
        />

        <StatCard
          title="Exams"
          value={analytics.totalExams || 0}
          icon={<FileText className="text-white" />}
          color="bg-orange-600"
        />

        <StatCard
          title="Questions"
          value={
            analytics.totalQuestions || 0
          }
          icon={
            <FileQuestion className="text-white" />
          }
          color="bg-pink-600"
        />
      </div>

      {/* RECENT EXAMS */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">
            Recent Exams
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Latest created exams
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-600">
                  Title
                </th>

                <th className="px-6 py-4 font-semibold text-slate-600">
                  Subject
                </th>

                <th className="px-6 py-4 font-semibold text-slate-600">
                  Duration
                </th>

                <th className="px-6 py-4 font-semibold text-slate-600">
                  Total Marks
                </th>

                <th className="px-6 py-4 font-semibold text-slate-600">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {recentExams.length > 0 ? (
                recentExams.map((exam) => (
                  <tr
                    key={exam._id}
                    className="border-t border-slate-200 hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 font-semibold">
                      {exam.title}
                    </td>

                    <td className="px-6 py-4">
                      {exam.subject?.name}
                    </td>

                    <td className="px-6 py-4">
                      {exam.duration} mins
                    </td>

                    <td className="px-6 py-4">
                      {exam.totalMarks}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          exam.status ===
                          "active"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {exam.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-10 text-center text-slate-500"
                  >
                    No recent exams found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;