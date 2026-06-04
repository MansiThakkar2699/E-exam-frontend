import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { HelpCircle, Pencil, Plus, Trash2, X } from "lucide-react";
import ConfirmModal from "../../components/common/ConfirmModal";
import Pagination from "../../components/common/Pagination";

const QuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [exams, setExams] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editQuestion, setEditQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedQueId, setSelectedQueId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // GET EXAMS
  const getExams = async () => {
    try {
      const res = await axiosInstance.get("/exam/exams");

      setExams(res.data.exams);
    } catch (error) {
      toast.error("Failed to fetch exams");
    }
  };

  // GET QUESTIONS
  const getQuestions = async () => {
    try {
      const res = await axiosInstance.get(`/que/questions?page=${currentPage}&limit=${limit}`);
      console.log(res);
      setQuestions(res.data.questions);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      toast.error("Failed to fetch questions");
    }
  };

  useEffect(() => {
    getExams();
    getQuestions();
  }, [currentPage]);

  // OPEN ADD
  const openAddModal = () => {
    setEditQuestion(null);

    reset({
      exam: "",
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correctAnswer: "",
      marks: 1,
      questionType: "mcq",
    });

    setModalOpen(true);
  };

  // OPEN EDIT
  const openEditModal = (question) => {
    setEditQuestion(question);

    setValue("exam", question.exam._id);

    setValue("question", question.question);

    setValue("option1", question.options[0]);

    setValue("option2", question.options[1]);

    setValue("option3", question.options[2]);

    setValue("option4", question.options[3]);

    setValue("correctAnswer", question.correctAnswer);

    setValue("marks", question.marks);

    setValue("questionType", question.questionType);

    setModalOpen(true);
  };

  // CLOSE
  const closeModal = () => {
    setModalOpen(false);
    setEditQuestion(null);
    reset();
  };

  // SUBMIT
  const submitHandler = async (data) => {
    try {
      setLoading(true);

      const payload = {
        exam: data.exam,
        question: data.question,
        options: [data.option1, data.option2, data.option3, data.option4],
        correctAnswer: data.correctAnswer,
        marks: data.marks,
        questionType: data.questionType,
      };

      if (editQuestion) {
        const res = await axiosInstance.put(
          `/que/questions/${editQuestion._id}`,
          payload,
        );

        toast.success(res.data.message);
      } else {
        const res = await axiosInstance.post("/que/questions", payload);

        toast.success(res.data.message);
      }

      closeModal();

      getQuestions();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (id) => {
    setSelectedQueId(id);

    setDeleteModal(true);
  };

  // DELETE
  const deleteHandler = async () => {
    try {
      const res = await axiosInstance.delete(`/que/questions/${selectedQueId}`);

      toast.success(res.data.message);

      setDeleteModal(false);

      setSelectedUserId(null);

      getQuestions();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div>
      {/* TOP */}
      <div className="flex justify-end mb-6">
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={20} />
          Add Question
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <HelpCircle size={22} />
          </div>

          <div>
            <h2 className="font-bold text-slate-800">Questions</h2>

            <p className="text-sm text-slate-500">
              Total {questions.length} questions available
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-600">#</th>
                <th className="px-6 py-4 font-semibold text-slate-600">
                  Question
                </th>
                <th className="px-6 py-4 font-semibold text-slate-600">Exam</th>
                <th className="px-6 py-4 font-semibold text-slate-600">
                  Correct Answer
                </th>
                <th className="px-6 py-4 font-semibold text-slate-600">
                  Marks
                </th>
                <th className="px-6 py-4 font-semibold text-slate-600 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {questions.length > 0 ? (
                questions.map((question, index) => (
                  <tr
                    key={question._id}
                    className="border-t border-slate-200 hover:bg-slate-50"
                  >
                    <td className="px-6 py-4">{index + 1}</td>

                    <td className="px-6 py-4 max-w-sm">{question.question}</td>

                    <td className="px-6 py-4">{question.exam?.title}</td>

                    <td className="px-6 py-4 font-semibold text-green-600">
                      {question.correctAnswer}
                    </td>

                    <td className="px-6 py-4">{question.marks}</td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditModal(question)}
                          className="h-9 w-9 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 flex items-center justify-center"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          onClick={() => openDeleteModal(question._id)}
                          className="h-9 w-9 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-10 text-center text-slate-500"
                  >
                    No questions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
       <ConfirmModal
        isOpen={deleteModal}
        title="Delete Question"
        message="Are you sure you want to delete this question? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleteLoading}
        type="delete"
        onConfirm={deleteHandler}
        onCancel={() => {
          setDeleteModal(false);
          setSelectedQueId(null);
        }}
      />

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">
            {/* HEADER */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <div>
                <h2 className="text-xl font-bold">
                  {editQuestion ? "Edit Question" : "Add Question"}
                </h2>

                <p className="text-sm text-slate-500">Manage exam questions</p>
              </div>

              <button
                onClick={closeModal}
                className="h-9 w-9 rounded-lg hover:bg-slate-100 flex items-center justify-center"
              >
                <X size={20} />
              </button>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit(submitHandler)}
              className="p-5 space-y-4"
            >
              {/* EXAM */}
              <div>
                <label className="text-sm font-semibold">Select Exam</label>

                <select
                  {...register("exam", {
                    required: "Exam is required",
                  })}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3"
                >
                  <option value="">Select Exam</option>

                  {exams.map((exam) => (
                    <option key={exam._id} value={exam._id}>
                      {exam.title}
                    </option>
                  ))}
                </select>

                {errors.exam && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.exam.message}
                  </p>
                )}
              </div>

              {/* QUESTION */}
              <div>
                <label className="text-sm font-semibold">Question</label>

                <textarea
                  rows={3}
                  placeholder="Enter question"
                  {...register("question", {
                    required: "Question is required",
                  })}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3"
                />

                {errors.question && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.question.message}
                  </p>
                )}
              </div>

              {/* OPTIONS */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Option 1"
                  {...register("option1", {
                    required: "Option 1 required",
                  })}
                  className="rounded-xl border border-slate-200 px-4 py-3"
                />

                <input
                  type="text"
                  placeholder="Option 2"
                  {...register("option2", {
                    required: "Option 2 required",
                  })}
                  className="rounded-xl border border-slate-200 px-4 py-3"
                />

                <input
                  type="text"
                  placeholder="Option 3"
                  {...register("option3", {
                    required: "Option 3 required",
                  })}
                  className="rounded-xl border border-slate-200 px-4 py-3"
                />

                <input
                  type="text"
                  placeholder="Option 4"
                  {...register("option4", {
                    required: "Option 4 required",
                  })}
                  className="rounded-xl border border-slate-200 px-4 py-3"
                />
              </div>

              {/* CORRECT ANSWER */}
              <div>
                <label className="text-sm font-semibold">Correct Answer</label>

                <input
                  type="text"
                  placeholder="Enter correct answer exactly"
                  {...register("correctAnswer", {
                    required: "Correct answer required",
                  })}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3"
                />
              </div>

              {/* ROW */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold">Marks</label>

                  <input
                    type="number"
                    {...register("marks")}
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">Question Type</label>

                  <select
                    {...register("questionType")}
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3"
                  >
                    <option value="mcq">MCQ</option>

                    <option value="truefalse">True / False</option>
                  </select>
                </div>
              </div>

              {/* BUTTONS */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-3 rounded-xl border border-slate-200"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-3 rounded-xl bg-blue-600 text-white"
                >
                  {loading
                    ? "Saving..."
                    : editQuestion
                      ? "Update Question"
                      : "Add Question"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionPage;
