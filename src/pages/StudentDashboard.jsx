import React, { useEffect, useState } from "react";

import axiosInstance from "../api/axiosInstance";

import { toast } from "react-toastify";

import {
  BookOpen,
  CheckCircle,
  Trophy,
  FileText,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const StudentDashboard = () => {
  const [summary, setSummary] = useState({
    availableExams: 0,
    completedExams: 0,
    passedExams: 0,
    averagePercentage: 0,
  });

  const [upcomingExams, setUpcomingExams] = useState([]);

  const [recentResults, setRecentResults] = useState([]);

  const [chartData, setChartData] = useState([]);

  const [loading, setLoading] = useState(true);

  // FETCH DASHBOARD DATA
  const getDashboardData = async () => {
    try {
      setLoading(true);

      const [
        summaryRes,
        upcomingRes,
        resultsRes,
        chartRes,
      ] = await Promise.all([
        axiosInstance.get("/dashboard/dashboard-summary"),

        axiosInstance.get("/dashboard/upcoming-exams"),

        axiosInstance.get("/dashboard/recent-results"),

        axiosInstance.get("/dashboard/performance-chart"),
      ]);

      setSummary(summaryRes.data);

      setUpcomingExams(upcomingRes.data);

      setRecentResults(resultsRes.data);

      setChartData(chartRes.data);
    } catch (error) {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {/* AVAILABLE EXAMS */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">
                Available Exams
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {summary.availableExams}
              </h2>
            </div>

            <div className="h-14 w-14 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <BookOpen size={26} />
            </div>
          </div>
        </div>

        {/* COMPLETED */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">
                Completed Exams
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {summary.completedExams}
              </h2>
            </div>

            <div className="h-14 w-14 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
              <CheckCircle size={26} />
            </div>
          </div>
        </div>

        {/* PASSED */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">
                Passed Exams
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {summary.passedExams}
              </h2>
            </div>

            <div className="h-14 w-14 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <Trophy size={26} />
            </div>
          </div>
        </div>

        {/* AVG SCORE */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">
                Average Score
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {summary.averagePercentage}%
              </h2>
            </div>

            <div className="h-14 w-14 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <FileText size={26} />
            </div>
          </div>
        </div>
      </div>

      {/* CHART */}
      <div className="bg-white rounded-2xl border p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-6">
          Performance Trend
        </h2>

        {chartData.length > 0 ? (
          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="exam" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="percentage"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-slate-500">
            No performance data available
          </p>
        )}
      </div>

      {/* TWO COLUMN SECTION */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* UPCOMING EXAMS */}
        <div className="bg-white rounded-2xl border p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-5">
            Upcoming Exams
          </h2>

          {upcomingExams.length > 0 ? (
            <div className="space-y-4">
              {upcomingExams.map((exam) => (
                <div
                  key={exam._id}
                  className="border rounded-xl p-4 hover:bg-slate-50"
                >
                  <h3 className="font-semibold">
                    {exam.title}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {exam.subject?.name}
                  </p>

                  <p className="text-sm text-slate-500 mt-1">
                    {new Date(
                      exam.startTime,
                    ).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500">
              No upcoming exams
            </p>
          )}
        </div>

        {/* RECENT RESULTS */}
        <div className="bg-white rounded-2xl border p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-5">
            Recent Results
          </h2>

          {recentResults.length > 0 ? (
            <div className="space-y-4">
              {recentResults.map((result) => (
                <div
                  key={result._id}
                  className="border rounded-xl p-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold">
                      {result.exam?.title}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {new Date(
                        result.createdAt,
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <div
                    className={`font-bold text-lg ${
                      result.resultStatus === "pass"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {result.percentage.toFixed(2)}%
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500">
              No results available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;