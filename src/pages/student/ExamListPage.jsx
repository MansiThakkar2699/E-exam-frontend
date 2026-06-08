import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import {
  Clock3,
  Calendar,
  BookOpen,
  Trophy,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ExamListPage = () => {
  const [exams, setExams] = useState([]);

  const navigate = useNavigate();

  // GET EXAMS
  const getExams = async () => {
    try {
      const res = await axiosInstance.get(
        "/exam/student-exams"
      );

      setExams(res.data.exams || []);
    } catch (error) {
      toast.error("Failed to fetch exams");
    }
  };

  useEffect(() => {
    getExams();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "live":
        return "bg-green-100 text-green-600";

      case "upcoming":
        return "bg-yellow-100 text-yellow-600";

      case "completed":
        return "bg-red-100 text-red-600";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  return (
    <div>
      {exams.length === 0 ? (
        <div className="bg-white rounded-2xl border shadow-sm p-10 text-center text-slate-500">
          No exams available
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {exams.map((exam) => (
            <div
              key={exam._id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition"
            >
              {/* TOP */}
              <div className="flex items-center justify-between mb-5">
                <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
                  {exam.subject?.name}
                </span>

                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${getStatusBadge(
                    exam.examStatus
                  )}`}
                >
                  {exam.examStatus}
                </span>
              </div>

              {/* TITLE */}
              <h2 className="text-xl font-bold text-slate-800 mb-2">
                {exam.title}
              </h2>

              <p className="text-slate-500 text-sm line-clamp-2 min-h-[40px]">
                {exam.description}
              </p>

              {/* DETAILS */}
              <div className="mt-5 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Calendar size={16} />
                    <span>Date</span>
                  </div>

                  <span className="font-semibold">
                    {new Date(
                      exam.startTime
                    ).toLocaleDateString()}
                  </span>
                </div>

                {exam.startTime && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock3 size={16} />
                      <span>Start Time</span>
                    </div>

                    <span className="font-semibold">
                      {new Date(
                        exam.startTime
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Clock3 size={16} />
                    <span>Duration</span>
                  </div>

                  <span className="font-semibold">
                    {exam.duration} mins
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Trophy size={16} />
                    <span>Total Marks</span>
                  </div>

                  <span className="font-semibold">
                    {exam.totalMarks}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-500">
                    <BookOpen size={16} />
                    <span>Passing Marks</span>
                  </div>

                  <span className="font-semibold">
                    {exam.passingMarks}
                  </span>
                </div>
              </div>

              {/* COUNTDOWN */}
              {exam.examStatus === "upcoming" &&
                exam.remainingTime && (
                  <div className="mt-4 text-center text-sm font-medium text-orange-600">
                    Starts in {exam.remainingTime}
                  </div>
                )}

              {/* BUTTON */}
              <button
                disabled={exam.examStatus !== "live"}
                onClick={() =>
                  navigate(
                    `/student/exam/${exam._id}`
                  )
                }
                className={`w-full mt-6 py-3 rounded-xl font-semibold transition ${
                  exam.examStatus === "live"
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : exam.examStatus === "upcoming"
                    ? "bg-yellow-100 text-yellow-700 cursor-not-allowed"
                    : "bg-slate-200 text-slate-500 cursor-not-allowed"
                }`}
              >
                {exam.examStatus === "live"
                  ? "Start Exam"
                  : exam.examStatus === "upcoming"
                  ? "Not Started Yet"
                  : "Exam Ended"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExamListPage;