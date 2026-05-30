import React, {
  useEffect,
  useState,
} from "react";

import axiosInstance from "../../api/axiosInstance";

import { toast } from "react-toastify";

const ResultPage = () => {
  const [results, setResults] =
    useState([]);

  // GET RESULTS
  const getResults = async () => {
    try {
      const res = await axiosInstance.get(
        "/result/student"
      );
      setResults(res.data.results);
    } catch (error) {
      toast.error(
        "Failed to fetch results"
      );
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
                <h2 className="text-xl font-bold">
                  {result.exam?.title}
                </h2>

                <p className="text-slate-500 mt-1">
                  Submitted on{" "}
                  {new Date(
                    result.createdAt
                  ).toLocaleString()}
                </p>
              </div>

              <span
                className={`px-4 py-2 rounded-full font-semibold ${
                  result.resultStatus ===
                  "pass"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {result.resultStatus}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-5 mt-6">
              <div>
                <p className="text-slate-500 text-sm">
                  Total Questions
                </p>

                <h3 className="text-2xl font-bold mt-1">
                  {result.totalQuestions}
                </h3>
              </div>

              <div>
                <p className="text-slate-500 text-sm">
                  Correct Answers
                </p>

                <h3 className="text-2xl font-bold text-green-600 mt-1">
                  {result.correctAnswers}
                </h3>
              </div>

              <div>
                <p className="text-slate-500 text-sm">
                  Wrong Answers
                </p>

                <h3 className="text-2xl font-bold text-red-600 mt-1">
                  {result.wrongAnswers}
                </h3>
              </div>

              <div>
                <p className="text-slate-500 text-sm">
                  Marks
                </p>

                <h3 className="text-2xl font-bold mt-1">
                  {result.obtainedMarks}/
                  {result.totalMarks}
                </h3>
              </div>

              <div>
                <p className="text-slate-500 text-sm">
                  Percentage
                </p>

                <h3 className="text-2xl font-bold text-blue-600 mt-1">
                  {result.percentage.toFixed(2)}%
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultPage;