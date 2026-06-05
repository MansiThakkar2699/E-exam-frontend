import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";

const ReviewQuestionsPage = () => {
  const { examId } = useParams();

  const [questions, setQuestions] = useState([]);

  const getReviewQuestions = async () => {
    try {
      const res = await axiosInstance.get(
        `/que/questions/exam/${examId}`
      );
      setQuestions(res.data.questions);
    } catch (error) {
      toast.error("Failed to load questions");
    }
  };

  useEffect(() => {
    getReviewQuestions();
  }, []);

  return (
    <div className="space-y-5">
      {questions.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl border shadow-sm p-6"
        >
          <h2 className="font-bold text-lg mb-4">
            Q{index + 1}. {item.question}
          </h2>

          <div className="space-y-2">
            <p>
              <span className="font-semibold">
                Correct Answer:
              </span>{" "}
              {item.correctAnswer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewQuestionsPage;