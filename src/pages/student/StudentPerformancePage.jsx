import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import { BookOpen, CheckCircle, XCircle, Trophy } from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

const StudentPerformancePage = () => {
  const [summary, setSummary] = useState({});
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subjectPerformance, setSubjectPerformance] = useState([]);

  const getPerformance = async () => {
    try {
      setLoading(true);

      const [summaryRes, resultsRes] = await Promise.all([
        axiosInstance.get("/result/my-performance"),
        axiosInstance.get("/result/student"),
      ]);

      setSummary(summaryRes.data);

      setResults(resultsRes.data.results);
    } catch (error) {
      toast.error("Failed to load performance");
    } finally {
      setLoading(false);
    }
  };

  const getSubjectPerformance = async () => {
    try {
      const res = await axiosInstance.get("/result/subject-wise-performance");

      setSubjectPerformance(res.data.data);
    } catch (error) {
      toast.error("Failed to load subject performance");
    }
  };

  useEffect(() => {
    getPerformance();
    getSubjectPerformance();
  }, []);

  const stats = [
    {
      title: "Total Exams",
      value: summary.totalExams || 0,
      icon: <BookOpen size={22} />,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "Passed Exams",
      value: summary.passedExams || 0,
      icon: <CheckCircle size={22} />,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "Failed Exams",
      value: summary.failedExams || 0,
      icon: <XCircle size={22} />,
      bg: "bg-red-100",
      color: "text-red-600",
    },
    {
      title: "Average Score",
      value: `${summary.averageScore || 0}%`,
      icon: <Trophy size={22} />,
      bg: "bg-yellow-100",
      color: "text-yellow-600",
    },
  ];

  const trendData =
    results?.map((result) => ({
      exam: result.exam?.title,
      percentage: result.percentage,
    })) || [];

  const passCount = results.filter((r) => r.resultStatus === "pass").length;

  const failCount = results.filter((r) => r.resultStatus === "fail").length;

  const pieData = [
    {
      name: "Pass",
      value: passCount,
    },
    {
      name: "Fail",
      value: failCount,
    },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  const chartData = subjectPerformance.map((item) => ({
    subject: item.subject,
    percentage: item.averagePercentage,
  }));

  return (
    <div className="space-y-6">
      {/* STATS */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500">{item.title}</p>

                <h2 className="mt-2 text-3xl font-bold">{item.value}</h2>
              </div>

              <div
                className={`h-14 w-14 rounded-xl flex items-center justify-center ${item.bg} ${item.color}`}
              >
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <h2 className="text-xl font-bold mb-5">Performance Trend</h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="exam" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="percentage"
                stroke="#2563eb"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <h2 className="text-xl font-bold mb-5">Pass / Fail Ratio</h2>

          <ResponsiveContainer width="100%" height={300}>
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

      <div className="bg-white rounded-2xl border shadow-sm p-6">
        <h2 className="text-xl font-bold mb-5">Subject-wise Performance</h2>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="percentage" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StudentPerformancePage;
