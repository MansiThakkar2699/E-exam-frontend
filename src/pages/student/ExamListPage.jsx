import React, {
  useEffect,
  useState,
} from "react";

import axiosInstance from "../../api/axiosInstance";

import { toast } from "react-toastify";

import { Clock3 } from "lucide-react";

import { useNavigate } from "react-router-dom";

const ExamListPage = () => {
  const [exams, setExams] = useState([]);

  const navigate = useNavigate();

  // GET EXAMS
  const getExams = async () => {
    try {
      const res = await axiosInstance.get(
        "/exam/exams"
      );

      const activeExams =
        res.data.exams.filter(
          (exam) => exam.status === "active"
        );

      setExams(activeExams);
    } catch (error) {
      toast.error("Failed to fetch exams");
    }
  };

  useEffect(() => {
    getExams();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Available Exams
        </h1>

        <p className="text-slate-500 mt-1">
          Start your online exam
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <div
            key={exam._id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <span className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
                {exam.subject?.name}
              </span>

              <Clock3
                size={18}
                className="text-slate-400"
              />
            </div>

            <h2 className="text-xl font-bold text-slate-800 mb-3">
              {exam.title}
            </h2>

            <p className="text-slate-500 text-sm line-clamp-2">
              {exam.description}
            </p>

            <div className="space-y-2 mt-5 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">
                  Duration
                </span>

                <span className="font-semibold">
                  {exam.duration} mins
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Total Marks
                </span>

                <span className="font-semibold">
                  {exam.totalMarks}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">
                  Passing Marks
                </span>

                <span className="font-semibold">
                  {exam.passingMarks}
                </span>
              </div>
            </div>

            <button
              onClick={() =>
                navigate(
                  `/student/exam/${exam._id}`
                )
              }
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
            >
              Start Exam
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamListPage;