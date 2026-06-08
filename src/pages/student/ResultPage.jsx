import React, { useEffect, useState } from "react";

import axiosInstance from "../../api/axiosInstance";

import { toast } from "react-toastify";

import { Eye, FileText, Download } from "lucide-react";

import { useNavigate } from "react-router-dom";

import downloadResultPDF from "../../utils/DownloadResultPDF";

const ResultPage = () => {
  const [results, setResults] = useState([]);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // GET RESULTS
  const getResults = async () => {
    try {
      const res = await axiosInstance.get("/result/student");
      setResults(res.data.results);
    } catch (error) {
      toast.error("Failed to fetch results");
    }
  };

  useEffect(() => {
    getResults();
  }, []);

  return (
    <div>
      <div className="grid gap-5">
        {results.map((result) => (
          <div
            key={result._id}
            className="bg-white rounded-2xl border shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">{result.exam?.title}</h2>

                <p className="text-slate-500 mt-1">
                  Submitted on {new Date(result.createdAt).toLocaleString()}
                </p>
              </div>

              <span
                className={`px-4 py-2 rounded-full font-semibold ${
                  result.resultStatus === "pass"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {result.resultStatus}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-5 mt-6">
              <div>
                <p className="text-slate-500 text-sm">Total Questions</p>

                <h3 className="text-2xl font-bold mt-1">
                  {result.totalQuestions}
                </h3>
              </div>

              <div>
                <p className="text-slate-500 text-sm">Correct Answers</p>

                <h3 className="text-2xl font-bold text-green-600 mt-1">
                  {result.correctAnswers}
                </h3>
              </div>

              <div>
                <p className="text-slate-500 text-sm">Wrong Answers</p>

                <h3 className="text-2xl font-bold text-red-600 mt-1">
                  {result.wrongAnswers}
                </h3>
              </div>

              <div>
                <p className="text-slate-500 text-sm">Marks</p>

                <h3 className="text-2xl font-bold mt-1">
                  {result.obtainedMarks}/{result.totalMarks}
                </h3>
              </div>

              <div>
                <p className="text-slate-500 text-sm">Percentage</p>

                <h3 className="text-2xl font-bold text-blue-600 mt-1">
                  {result.percentage.toFixed(2)}%
                </h3>
              </div>
            </div>

            <div className="border-t border-slate-200 mt-6 pt-5">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate(`/student/result/${result._id}`)}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-white font-medium hover:bg-blue-700 transition"
                >
                  <Eye size={18} />
                  View Answers
                </button>

                <button
                  onClick={() =>
                    navigate(`/student/result/${result.exam._id}/review`)
                  }
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-700 font-medium hover:bg-slate-50 transition"
                >
                  <FileText size={18} />
                  Review Questions
                </button>

                <button
                  onClick={() => downloadResultPDF(result, user)}
                  className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-green-700 font-medium hover:bg-green-100 transition"
                >
                  <Download size={18} />
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultPage;
