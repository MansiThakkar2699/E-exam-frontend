import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import {
  CheckCircle,
  XCircle,
} from "lucide-react";

const ViewAnswerPage = () => {
  const { resultId } = useParams();

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const getResultDetails = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(
        `/result/student-result/${resultId}`
      );

      setResult(res.data.result);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch result"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getResultDetails();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  if (!result) {
    return (
      <div className="text-center py-20">
        Result not found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="bg-white rounded-2xl border shadow-sm p-6">
        <h1 className="text-2xl font-bold">
          {result.exam?.title}
        </h1>

        <p className="text-slate-500 mt-1">
          Answer Review
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div>
            <p className="text-slate-500 text-sm">
              Total Marks
            </p>

            <h3 className="text-xl font-bold">
              {result.obtainedMarks}/
              {result.totalMarks}
            </h3>
          </div>

          <div>
            <p className="text-slate-500 text-sm">
              Percentage
            </p>

            <h3 className="text-xl font-bold text-blue-600">
              {result.percentage}%
            </h3>
          </div>

          <div>
            <p className="text-slate-500 text-sm">
              Correct
            </p>

            <h3 className="text-xl font-bold text-green-600">
              {result.correctAnswers}
            </h3>
          </div>

          <div>
            <p className="text-slate-500 text-sm">
              Wrong
            </p>

            <h3 className="text-xl font-bold text-red-600">
              {result.wrongAnswers}
            </h3>
          </div>
        </div>
      </div>

      {/* QUESTIONS */}
      {result.answers.map(
        (answer, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border shadow-sm p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-semibold text-lg">
                Q{index + 1}.{" "}
                {
                  answer.questionId
                    ?.question
                }
              </h2>

              {answer.isCorrect ? (
                <CheckCircle
                  className="text-green-600"
                  size={24}
                />
              ) : (
                <XCircle
                  className="text-red-600"
                  size={24}
                />
              )}
            </div>

            {/* OPTIONS */}
            <div className="mt-5 space-y-3">
              {answer.questionId?.options?.map(
                (option, i) => {
                  const isSelected =
                    option ===
                    answer.selectedAnswer;

                  const isCorrect =
                    option ===
                    answer.correctAnswer;

                  return (
                    <div
                      key={i}
                      className={`rounded-xl border p-4
                        ${
                          isCorrect
                            ? "bg-green-50 border-green-300"
                            : isSelected
                            ? "bg-red-50 border-red-300"
                            : "border-slate-200"
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span>
                          {option}
                        </span>

                        {isCorrect && (
                          <span className="text-green-600 font-medium">
                            Correct
                          </span>
                        )}

                        {!isCorrect &&
                          isSelected && (
                            <span className="text-red-600 font-medium">
                              Your Answer
                            </span>
                          )}
                      </div>
                    </div>
                  );
                }
              )}
            </div>

            {/* SUMMARY */}
            <div className="mt-5 flex flex-wrap gap-6 text-sm">
              <p>
                <span className="font-semibold">
                  Your Answer:
                </span>{" "}
                {answer.selectedAnswer}
              </p>

              <p>
                <span className="font-semibold">
                  Correct Answer:
                </span>{" "}
                {answer.correctAnswer}
              </p>

              <p>
                <span className="font-semibold">
                  Marks:
                </span>{" "}
                {answer.marksObtained}/
                {
                  answer.questionId
                    ?.marks
                }
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ViewAnswerPage;