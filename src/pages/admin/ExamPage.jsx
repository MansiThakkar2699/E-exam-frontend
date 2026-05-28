import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { ClipboardList, Pencil, Plus, Trash2, X } from "lucide-react";
import ConfirmModal from "../../components/common/ConfirmModal";
import Pagination from "../../components/common/Pagination";

const ExamPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [exams, setExams] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editExam, setEditExam] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedExamId, setSelectedExamId] = useState(null);
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

  // GET SUBJECTS
  const getSubjects = async () => {
    try {
      const res = await axiosInstance.get("/sub/subjects");
      setSubjects(res.data.subjects);
    } catch (error) {
      toast.error("Failed to fetch subjects");
    }
  };

  // GET EXAMS
  const getExams = async () => {
    try {
      const res = await axiosInstance.get(
        `/exam/exams?page=${currentPage}&limit=${limit}`,
      );
      setExams(res.data.exams);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      toast.error("Failed to fetch exams");
    }
  };

  useEffect(() => {
    getSubjects();
    getExams();
  }, [currentPage]);

  // OPEN ADD
  const openAddModal = () => {
    setEditExam(null);

    reset({
      title: "",
      subject: "",
      description: "",
      duration: "",
      totalMarks: "",
      passingMarks: "",
      examDate: "",
      status: "active",
    });

    setModalOpen(true);
  };

  // OPEN EDIT
  const openEditModal = (exam) => {
    setEditExam(exam);

    setValue("title", exam.title);
    setValue("subject", exam.subject._id);
    setValue("description", exam.description);
    setValue("duration", exam.duration);
    setValue("totalMarks", exam.totalMarks);
    setValue("passingMarks", exam.passingMarks);

    setValue("examDate", new Date(exam.examDate).toISOString().slice(0, 16));

    setValue("status", exam.status);

    setModalOpen(true);
  };

  // CLOSE
  const closeModal = () => {
    setModalOpen(false);
    setEditExam(null);
    reset();
  };

  // SUBMIT
  const submitHandler = async (data) => {
    try {
      setLoading(true);

      if (editExam) {
        const res = await axiosInstance.put(
          `/exam/exams/${editExam._id}`,
          data,
        );

        toast.success(res.data.message);
      } else {
        const res = await axiosInstance.post("/exam/exams", data);

        toast.success(res.data.message);
      }

      closeModal();
      getExams();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (id) => {
    setSelectedExamId(id);

    setDeleteModal(true);
  };

  // DELETE
  const deleteHandler = async () => {
    try {
      const res = await axiosInstance.delete(`/exam/exams/${selectedExamId}`);

      toast.success(res.data.message);

      setDeleteModal(false);

      setSelectedUserId(null);

      getExams();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div>
      {/* TOP */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Exam Management</h1>

          <p className="text-slate-500 mt-1">Create and manage online exams</p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={20} />
          Add Exam
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <ClipboardList size={22} />
          </div>

          <div>
            <h2 className="font-bold text-slate-800">Exams</h2>

            <p className="text-sm text-slate-500">
              Total {exams.length} exams available
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-600">#</th>
                <th className="px-6 py-4 font-semibold text-slate-600">
                  Title
                </th>
                <th className="px-6 py-4 font-semibold text-slate-600">
                  Subject
                </th>
                <th className="px-6 py-4 font-semibold text-slate-600">
                  Duration
                </th>
                <th className="px-6 py-4 font-semibold text-slate-600">
                  Marks
                </th>
                <th className="px-6 py-4 font-semibold text-slate-600">
                  Exam Date
                </th>
                <th className="px-6 py-4 font-semibold text-slate-600 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {exams.length > 0 ? (
                exams.map((exam, index) => (
                  <tr
                    key={exam._id}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-6 py-4">{index + 1}</td>

                    <td className="px-6 py-4 font-semibold">{exam.title}</td>

                    <td className="px-6 py-4">{exam.subject?.name}</td>

                    <td className="px-6 py-4">{exam.duration} min</td>

                    <td className="px-6 py-4">{exam.totalMarks}</td>

                    <td className="px-6 py-4">
                      {new Date(exam.examDate).toLocaleString()}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditModal(exam)}
                          className="h-9 w-9 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 flex items-center justify-center"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          onClick={() => openDeleteModal(exam._id)}
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
                    colSpan="7"
                    className="px-6 py-10 text-center text-slate-500"
                  >
                    No exams found
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
        title="Delete Exam"
        message="Are you sure you want to delete this exam? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleteLoading}
        type="delete"
        onConfirm={deleteHandler}
        onCancel={() => {
          setDeleteModal(false);
          setSelectedExamId(null);
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
                  {editExam ? "Edit Exam" : "Add Exam"}
                </h2>

                <p className="text-sm text-slate-500">Manage exam details</p>
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
              {/* TITLE */}
              <div>
                <label className="text-sm font-semibold">Exam Title</label>

                <input
                  type="text"
                  placeholder="Enter exam title"
                  {...register("title", {
                    required: "Title is required",
                  })}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3"
                />

                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* SUBJECT */}
              <div>
                <label className="text-sm font-semibold">Subject</label>

                <select
                  {...register("subject", {
                    required: "Subject is required",
                  })}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3"
                >
                  <option value="">Select Subject</option>

                  {subjects.map((subject) => (
                    <option key={subject._id} value={subject._id}>
                      {subject.name}
                    </option>
                  ))}
                </select>

                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="text-sm font-semibold">Description</label>

                <textarea
                  rows={3}
                  placeholder="Enter exam description"
                  {...register("description")}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3"
                />
              </div>

              {/* ROW */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold">
                    Duration (minutes)
                  </label>

                  <input
                    type="number"
                    {...register("duration", {
                      required: "Duration is required",
                    })}
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">Total Marks</label>

                  <input
                    type="number"
                    {...register("totalMarks", {
                      required: "Total marks required",
                    })}
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3"
                  />
                </div>
              </div>

              {/* ROW */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold">Passing Marks</label>

                  <input
                    type="number"
                    {...register("passingMarks", {
                      required: "Passing marks required",
                    })}
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">Exam Date</label>

                  <input
                    type="datetime-local"
                    {...register("examDate", {
                      required: "Exam date required",
                    })}
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3"
                  />
                </div>
              </div>

              {/* STATUS */}
              {editExam && (
                <div>
                  <label className="text-sm font-semibold">Status</label>

                  <select
                    {...register("status")}
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              )}

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
                    : editExam
                      ? "Update Exam"
                      : "Add Exam"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamPage;
