import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import { BookOpen, Pencil, Plus, Trash2, X } from "lucide-react";
import ConfirmModal from "../../components/common/ConfirmModal";
import Pagination from "../../components/common/Pagination";
import { useForm } from "react-hook-form";

const SubjectPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editSubject, setEditSubject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedSubId, setSelectedSubId] = useState(null);
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

  const getSubjects = async () => {
    try {
      const res = await axiosInstance.get(`/sub/subjects?page=${currentPage}&limit=${limit}`);
      setSubjects(res.data.subjects);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch subjects");
    }
  };

  useEffect(() => {
    getSubjects();
  }, [currentPage]);

  const openAddModal = () => {
    setEditSubject(null);
    reset({
      name: "",
      code: "",
      department: "",
      status: "active",
    });
    setModalOpen(true);
  };

  const openEditModal = (subject) => {
    setEditSubject(subject);

    setValue("name", subject.name);
    setValue("code", subject.code);
    setValue("department", subject.department);
    setValue("status", subject.status);

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditSubject(null);
    reset();
  };

  const submitHandler = async (data) => {
    try {
      setLoading(true);

      if (editSubject) {
        const res = await axiosInstance.put(
          `/sub/subjects/${editSubject._id}`,
          data,
        );
        toast.success(res.data.message);
      } else {
        const res = await axiosInstance.post("/sub/subjects", data);
        toast.success(res.data.message);
      }

      closeModal();
      getSubjects();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (id) => {
    setSelectedSubId(id);

    setDeleteModal(true);
  };

  const deleteHandler = async () => {
    try {
      const res = await axiosInstance.delete(`/sub/subjects/${selectedSubId}`);
      toast.success(res.data.message);
      setDeleteModal(false);

      setSelectedUserId(null);
      getSubjects();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    } finally {
      setDeleteLoading(false);
    }
  };

  const statusBadge = (status) => {
    if (status === "active") {
      return "bg-green-100 text-green-700";
    }

    if (status === "inactive") {
      return "bg-yellow-100 text-yellow-700";
    }

    return "bg-slate-100 text-slate-700";
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Subject Management
          </h1>
          <p className="text-slate-500 mt-1">
            Manage exam subjects and departments
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700 shadow-lg shadow-blue-100"
        >
          <Plus size={20} />
          Add Subject
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <BookOpen size={22} />
          </div>
          <div>
            <h2 className="font-bold text-slate-800">Subjects</h2>
            <p className="text-sm text-slate-500">
              Total {subjects.length} subjects available
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                  #
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                  Subject Name
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                  Code
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                  Department
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                  Status
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {subjects.length > 0 ? (
                subjects.map((subject, index) => (
                  <tr
                    key={subject._id}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 text-slate-600">{index + 1}</td>

                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-800">
                        {subject.name}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-sm font-semibold">
                        {subject.code}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {subject.department}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge(
                          subject.status,
                        )}`}
                      >
                        {subject.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditModal(subject)}
                          className="h-9 w-9 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 flex items-center justify-center"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          onClick={() => openDeleteModal(subject._id)}
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
                    No subjects found
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
        title="Delete Subject"
        message="Are you sure you want to delete this subject? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleteLoading}
        type="delete"
        onConfirm={deleteHandler}
        onCancel={() => {
          setDeleteModal(false);
          setSelectedSubId(null);
        }}
      />

      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {editSubject ? "Edit Subject" : "Add Subject"}
                </h2>
                <p className="text-sm text-slate-500">
                  {editSubject
                    ? "Update subject information"
                    : "Create new subject for exams"}
                </p>
              </div>

              <button
                onClick={closeModal}
                className="h-9 w-9 rounded-lg hover:bg-slate-100 flex items-center justify-center"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit(submitHandler)}
              className="p-5 space-y-4"
            >
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Subject Name
                </label>
                <input
                  type="text"
                  placeholder="Example: React JS"
                  {...register("name", {
                    required: "Subject name is required",
                  })}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Subject Code
                </label>
                <input
                  type="text"
                  placeholder="Example: REACT101"
                  {...register("code", {
                    required: "Subject code is required",
                  })}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
                {errors.code && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.code.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Department
                </label>
                <input
                  type="text"
                  placeholder="Example: Computer Engineering"
                  {...register("department", {
                    required: "Department is required",
                  })}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
                {errors.department && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.department.message}
                  </p>
                )}
              </div>

              {editSubject && (
                <div>
                  <label className="text-sm font-semibold text-slate-700">
                    Status
                  </label>
                  <select
                    {...register("status")}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
                >
                  {loading
                    ? "Saving..."
                    : editSubject
                      ? "Update Subject"
                      : "Add Subject"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectPage;
