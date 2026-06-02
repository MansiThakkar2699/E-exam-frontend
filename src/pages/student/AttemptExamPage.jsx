import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import axiosInstance from "../../api/axiosInstance";

import { toast } from "react-toastify";
import { usePage } from "../../context/PageContext";

const AttemptExamPage = () => {
  const { examId } = useParams();

  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState([]);

  const [timeLeft, setTimeLeft] = useState(0);

  const [loading, setLoading] = useState(false);

  const [examStarted, setExamStarted] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const [exam, setExam] = useState(null);

  const { setDynamicTitle } = usePage();

  useEffect(() => {
    if (exam) {
      setDynamicTitle(exam.title);
    }

    return () => setDynamicTitle("");
  }, [exam]);

  // GET QUESTIONS
  const getQuestions = async () => {
    try {
      const res = await axiosInstance.get(`/que/questions/exam/${examId}`);

      setQuestions(res.data.questions);

      const examRes = await axiosInstance.get(`/exam/exams/${examId}`);

      console.log(examRes)

      setExam(examRes.data.exam);

      setTimeLeft(examRes.data.exam.duration * 60);

      // START EXAM
      setExamStarted(true);
    } catch (error) {
      toast.error("Failed to fetch questions");
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  // TIMER
  useEffect(() => {
    // WAIT FOR EXAM START
    if (!examStarted) return;

    // AUTO SUBMIT
    if (timeLeft === 0) {
      submitExam();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, examStarted]);

  // SELECT ANSWER
  const selectAnswer = (questionId, selectedAnswer) => {
    const existing = answers.find((a) => a.questionId === questionId);

    if (existing) {
      setAnswers(
        answers.map((a) =>
          a.questionId === questionId
            ? {
                ...a,
                selectedAnswer,
              }
            : a,
        ),
      );
    } else {
      setAnswers([
        ...answers,
        {
          questionId,
          selectedAnswer,
        },
      ]);
    }
  };

  // SUBMIT EXAM
  const submitExam = async () => {
    // PREVENT MULTIPLE SUBMISSIONS
    if (submitted) return;

    try {
      setSubmitted(true);

      setLoading(true);

      const res = await axiosInstance.post("/result/submit", {
        examId,
        answers,
      });

      toast.success(res.data.message);

      navigate("/student/results");
    } catch (error) {
      setSubmitted(false);

      toast.error(error.response?.data?.message || "Failed to submit exam");
    } finally {
      setLoading(false);
    }
  };

  // FORMAT TIMER
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);

    const seconds = timeLeft % 60;

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (questions.length === 0) {
    return <div className="text-center py-20">Loading...</div>;
  }

  const question = questions[currentQuestion];

  return (
    <div>
      {/* TOP */}
      <div className="bg-white rounded-2xl border shadow-sm p-5 mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">{exam?.title}</h2>

          <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
            <span>{questions.length} Questions</span>

            <span>•</span>

            <span>{exam?.subject?.name}</span>

            <span>•</span>

            <span>{exam?.duration} Minutes</span>
          </div>
        </div>

        <div className="bg-red-100 text-red-600 px-5 py-3 rounded-xl font-bold text-lg">
          {formatTime()}
        </div>
      </div>

      {/* QUESTION */}
      <div className="bg-white rounded-2xl border shadow-sm p-6">
        <h2 className="text-xl font-bold mb-6">
          Q{currentQuestion + 1}. {question.question}
        </h2>

        <div className="space-y-4">
          {question.options.map((option, index) => (
            <label
              key={index}
              className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer hover:border-blue-500"
            >
              <input
                type="radio"
                name={question._id}
                checked={
                  answers.find(
                    (a) =>
                      a.questionId === question._id &&
                      a.selectedAnswer === option,
                  ) || false
                }
                onChange={() => selectAnswer(question._id, option)}
              />

              <span>{option}</span>
            </label>
          ))}
        </div>

        {/* BUTTONS */}
        <div className="flex items-center justify-between mt-8">
          <button
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            className="px-5 py-3 rounded-xl border disabled:opacity-50"
          >
            Previous
          </button>

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={submitExam}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
            >
              Submit Exam
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttemptExamPage;
