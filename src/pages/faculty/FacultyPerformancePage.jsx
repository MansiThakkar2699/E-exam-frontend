import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import {
  FileText,
  Users,
  Trophy,
  CheckCircle,
} from "lucide-react";

const FacultyPerformancePage = () => {
  const [summary, setSummary] = useState({});
  const [results, setResults] = useState([]);

  const getPerformance = async () => {
    try {
      const [summaryRes, resultRes] = await Promise.all([
        axiosInstance.get("/result/faculty-summary"),
        axiosInstance.get("/result/faculty-performance"),
      ]);

      setSummary(summaryRes.data);

      setResults(resultRes.data.results || []);
    } catch (error) {
      toast.error("Failed to fetch performance");
    }
  };

  useEffect(() => {
    getPerformance();
  }, []);

  const cards = [
    {
      title: "Total Exams",
      value: summary.totalExams || 0,
      icon: <FileText size={22} />,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "Total Attempts",
      value: summary.totalStudents || 0,
      icon: <Users size={22} />,
      bg: "bg-purple-100",
      color: "text-purple-600",
    },
    {
      title: "Average Score",
      value: `${summary.averageScore || 0}%`,
      icon: <Trophy size={22} />,
      bg: "bg-yellow-100",
      color: "text-yellow-600",
    },
    {
      title: "Pass Rate",
      value: `${summary.passPercentage || 0}%`,
      icon: <CheckCircle size={22} />,
      bg: "bg-green-100",
      color: "text-green-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* CARDS */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500">{item.title}</p>

                <h2 className="mt-2 text-3xl font-bold">
                  {item.value}
                </h2>
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

      {/* TABLE */}
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="border-b p-5">
          <h2 className="text-lg font-bold">
            Student Performance
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Exam</th>
                <th className="px-6 py-4">Marks</th>
                <th className="px-6 py-4">Percentage</th>
                <th className="px-6 py-4">Result</th>
              </tr>
            </thead>

            <tbody>
              {results.map((result) => (
                <tr key={result._id} className="border-t">
                  <td className="px-6 py-4">
                    {result.student?.fullName}
                  </td>

                  <td className="px-6 py-4">
                    {result.exam?.title}
                  </td>

                  <td className="px-6 py-4">
                    {result.obtainedMarks}/{result.totalMarks}
                  </td>

                  <td className="px-6 py-4">
                    {result.percentage}%
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        result.resultStatus === "pass"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {result.resultStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {results.length === 0 && (
            <div className="p-10 text-center text-slate-500">
              No performance data found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyPerformancePage;