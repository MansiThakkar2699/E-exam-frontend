import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import axiosInstance from "../../api/axiosInstance";

import { toast } from "react-toastify";

import { Building2, Pencil, Plus, Trash2, X } from "lucide-react";

import Pagination from "../../components/common/Pagination";

import ConfirmModal from "../../components/common/ConfirmModal";

const DepartmentPage = () => {
  const [departments, setDepartments] = useState([]);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const [editingDepartment, setEditingDepartment] = useState(null);

  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);

  const limit = 10;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      code: "",
      description: "",
      status: "active",
    },
  });

  // GET DEPARTMENTS
  const getDepartments = async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(
        `/department/departments?page=${currentPage}&limit=${limit}&search=${search}`,
      );

      setDepartments(res.data.departments);

      setTotalPages(res.data.totalPages);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch departments",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDepartments();
  }, [currentPage, search]);

  // OPEN CREATE MODAL
  const openCreateModal = () => {
    setEditingDepartment(null);

    reset({
      name: "",
      code: "",
      description: "",
      status: "active",
    });

    setModalOpen(true);
  };

  // OPEN EDIT MODAL
  const openEditModal = (department) => {
    setEditingDepartment(department);

    reset({
      name: department.name,
      code: department.code,
      description: department.description || "",
      status: department.status,
    });

    setModalOpen(true);
  };

  // CLOSE
  const closeModal = () => {
    setModalOpen(false);
    setEditingDepartment(null);
    reset();
  };

  // CREATE / UPDATE
  const submitHandler = async (data) => {
    try {
      if (editingDepartment) {
        const res = await axiosInstance.put(
          `/department/departments/${editingDepartment._id}`,
          data,
        );

        toast.success(res.data.message);
      } else {
        const res = await axiosInstance.post("/department/departments", data);

        toast.success(res.data.message);
      }

      closeModal();

      getDepartments();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  // DELETE MODAL OPEN
  const openDeleteModal = (id) => {
    setSelectedDepartmentId(id);

    setDeleteModal(true);
  };

  // DELETE
  const deleteHandler = async () => {
    try {
      const res = await axiosInstance.delete(
        `/department/departments/${selectedDepartmentId}`,
      );

      toast.success(res.data.message);

      setDeleteModal(false);

      setSelectedDepartmentId(null);

      getDepartments();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div>
      {/* TOP */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Department
        </button>
      </div>

      {/* SEARCH */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <input
          type="text"
          placeholder="Search department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* HEADER */}
        <div className="flex items-center gap-3 border-b border-slate-200 p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <Building2 size={22} />
          </div>

          <div>
            <h2 className="font-bold text-slate-800">Departments</h2>

            <p className="text-sm text-slate-500">
              Total {departments.length} departments
            </p>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-600">#</th>

                <th className="px-6 py-4 font-semibold text-slate-600">Name</th>

                <th className="px-6 py-4 font-semibold text-slate-600">Code</th>

                <th className="px-6 py-4 font-semibold text-slate-600">
                  Description
                </th>

                <th className="px-6 py-4 font-semibold text-slate-600">
                  Status
                </th>

                <th className="px-6 py-4 font-semibold text-slate-600">
                  Created
                </th>

                <th className="px-6 py-4 text-right font-semibold text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-10 text-center text-slate-500"
                  >
                    Loading...
                  </td>
                </tr>
              ) : departments.length > 0 ? (
                departments.map((department, index) => (
                  <tr
                    key={department._id}
                    className="border-t border-slate-200 hover:bg-slate-50"
                  >
                    <td className="px-6 py-4">{index + 1}</td>

                    <td className="px-6 py-4 font-semibold">
                      {department.name}
                    </td>

                    <td className="px-6 py-4">{department.code}</td>

                    <td className="max-w-xs truncate px-6 py-4">
                      {department.description ? department.description : "N/A"}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          department.status === "active"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {department.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {new Date(department.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditModal(department)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          onClick={() => openDeleteModal(department._id)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
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
                    No departments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl">
            {/* HEADER */}
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <div>
                <h2 className="text-xl font-bold">
                  {editingDepartment ? "Edit Department" : "Add Department"}
                </h2>

                <p className="text-sm text-slate-500">
                  Manage department details
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
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Department Name
                </label>

                <input
                  type="text"
                  placeholder="Enter department name"
                  {...register("name", {
                    required: "Department name is required",
                  })}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />

                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Department Code
                </label>

                <input
                  type="text"
                  placeholder="Enter code"
                  {...register("code", {
                    required: "Department code is required",
                  })}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 uppercase outline-none focus:border-blue-500"
                />

                {errors.code && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.code.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Description
                </label>

                <textarea
                  rows="4"
                  placeholder="Enter description"
                  {...register("description")}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Status
                </label>

                <select
                  {...register("status")}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value="active">Active</option>

                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* BUTTONS */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 rounded-xl border border-slate-200 py-3 font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
                >
                  {editingDepartment ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      <ConfirmModal
        isOpen={deleteModal}
        title="Delete Department"
        message="Are you sure you want to delete this department?"
        confirmText="Delete"
        cancelText="Cancel"
        type="delete"
        onConfirm={deleteHandler}
        onCancel={() => {
          setDeleteModal(false);

          setSelectedDepartmentId(null);
        }}
      />
    </div>
  );
};

export default DepartmentPage;
