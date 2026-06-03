import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { BookOpen, Pencil, Plus, Trash2, X } from "lucide-react";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import Pagination from "../../components/common/Pagination";
import ConfirmModal from "../../components/common/ConfirmModal";
import Select from "react-select";

const SubjectPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [facultyFilter, setFacultyFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const limit = 10;

  const { register, handleSubmit, control, reset, setValue } = useForm({
    defaultValues: {
      status: "active",
    },
  });

  // GET SUBJECTS
  const getSubjects = async () => {
    try {
      const res = await axiosInstance.get(
        `/sub/subjects?page=${currentPage}&limit=${limit}&search=${search}&department=${departmentFilter}&faculty=${facultyFilter}`,
      );

      setSubjects(res.data.subjects);

      setTotalPages(res.data.totalPages);
    } catch (error) {
      toast.error("Failed to fetch subjects");
    }
  };

  // GET DEPARTMENTS
  const getDepartments = async () => {
    try {
      const res = await axiosInstance.get("/department/department-options");
      setDepartments(res.data.departments);
    } catch (error) {
      console.log(error);
    }
  };

  const departmentOptions = departments.map((department) => ({
    value: department._id,
    label: department.name,
  }));

  // GET FACULTIES
  const getFaculties = async () => {
    try {
      const res = await axiosInstance.get("/user/faculties");

      setFaculties(res.data.faculties);
    } catch (error) {
      console.log(error);
    }
  };

  const facultyOptions = faculties.map((faculty) => ({
    value: faculty._id,
    label: faculty.fullName,
  }));

  useEffect(() => {
    getSubjects();
    getDepartments();
    getFaculties();
  }, [currentPage, search, departmentFilter, facultyFilter]);

  // OPEN CREATE MODAL
  const openCreateModal = () => {
    setEditingSubject(null);

    reset({
      name: "",
      code: "",
      department: "",
      faculty: "",
      description: "",
      status: "active",
    });

    setModalOpen(true);
  };

  // OPEN EDIT MODAL
  const openEditModal = (subject) => {
    setEditingSubject(subject);

    setValue("name", subject.name);
    setValue("code", subject.code);
    setValue("department", subject.department?._id);
    setValue("faculty", subject.faculty?._id);
    setValue("description", subject.description);
    setValue("status", subject.status);

    setModalOpen(true);
  };

  // CLOSE MODAL
  const closeModal = () => {
    setModalOpen(false);
    setEditingSubject(null);
    reset();
  };

  // CREATE / UPDATE
  const submitHandler = async (data) => {
    try {
      if (editingSubject) {
        const res = await axiosInstance.put(
          `/sub/subjects/${editingSubject._id}`,
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
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  // DELETE
  const deleteHandler = async () => {
    try {
      const res = await axiosInstance.delete(
        `/sub/subjects/${selectedSubjectId}`,
      );

      toast.success(res.data.message);

      setDeleteModal(false);

      getSubjects();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      {/* TOP */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Subject
        </button>
      </div>

      {/* FILTERS */}
      <div className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-4">
        <input
          type="text"
          placeholder="Search subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 md:col-span-2"
        />

        <Select
          options={departmentOptions}
          value={
            departmentOptions.find(
              (option) => option.value === departmentFilter,
            ) || null
          }
          onChange={(selectedOption) =>
            setDepartmentFilter(selectedOption?.value || "")
          }
          placeholder="All Departments"
          isClearable
          classNames={{
            control: () =>
              "rounded-xl border border-slate-200 min-h-[48px] px-2 py-2 hover:border-slate-300 shadow-none",
            valueContainer: () => "px-2",
            input: () => "text-slate-700",
            placeholder: () => "text-slate-400",
            menu: () =>
              "mt-2 rounded-xl border border-slate-200 shadow-lg overflow-hidden",
            option: ({ isFocused, isSelected }) =>
              `px-4 py-3 cursor-pointer ${
                isSelected
                  ? "bg-blue-600 text-white"
                  : isFocused
                    ? "bg-slate-100"
                    : "bg-white"
              }`,
          }}
        />

        <Select
          options={facultyOptions}
          value={
            facultyOptions.find((option) => option.value === facultyFilter) ||
            null
          }
          onChange={(selectedOption) =>
            setFacultyFilter(selectedOption?.value || "")
          }
          placeholder="All Faculties"
          isClearable
          classNames={{
            control: () =>
              "rounded-xl border border-slate-200 min-h-[48px] px-2 py-2 hover:border-slate-300 shadow-none",
            valueContainer: () => "px-2",
            input: () => "text-slate-700",
            placeholder: () => "text-slate-400",
            menu: () =>
              "mt-2 rounded-xl border border-slate-200 shadow-lg overflow-hidden",
            option: ({ isFocused, isSelected }) =>
              `px-4 py-3 cursor-pointer ${
                isSelected
                  ? "bg-blue-600 text-white"
                  : isFocused
                    ? "bg-slate-100"
                    : "bg-white"
              }`,
          }}
        />
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-200 p-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
            <BookOpen size={22} />
          </div>

          <div>
            <h2 className="font-bold text-slate-800">Subjects</h2>

            <p className="text-sm text-slate-500">
              Total {subjects.length} subjects
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4">#</th>

                <th className="px-6 py-4">Subject</th>

                <th className="px-6 py-4">Code</th>

                <th className="px-6 py-4">Department</th>

                <th className="px-6 py-4">Faculty</th>

                <th className="px-6 py-4">Status</th>

                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {subjects.length > 0 ? (
                subjects.map((subject, index) => (
                  <tr
                    key={subject._id}
                    className="border-t border-slate-200 hover:bg-slate-50"
                  >
                    <td className="px-6 py-4">{index + 1}</td>

                    <td className="px-6 py-4 font-semibold">{subject.name}</td>

                    <td className="px-6 py-4">{subject.code}</td>

                    <td className="px-6 py-4">{subject.department?.name}</td>

                    <td className="px-6 py-4">{subject.faculty?.fullName}</td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          subject.status === "active"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {subject.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditModal(subject)}
                          className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          onClick={() => {
                            setSelectedSubjectId(subject._id);

                            setDeleteModal(true);
                          }}
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

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl">
            {/* HEADER */}
            <div className="flex items-center justify-between border-b border-slate-200 p-5">
              <div>
                <h2 className="text-xl font-bold">
                  {editingSubject ? "Edit Subject" : "Add Subject"}
                </h2>

                <p className="text-sm text-slate-500">Manage subject details</p>
              </div>

              <button
                onClick={closeModal}
                className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* FORM */}
            <form
              onSubmit={handleSubmit(submitHandler)}
              className="space-y-4 p-5"
            >
              <input
                type="text"
                placeholder="Subject Name"
                {...register("name", {
                  required: true,
                })}
                className="w-full rounded-xl border border-slate-200 px-4 py-3"
              />

              <input
                type="text"
                placeholder="Subject Code"
                {...register("code", {
                  required: true,
                })}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 uppercase"
              />

              <Controller
                name="department"
                control={control}
                rules={{ required: "Department is required" }}
                render={({ field }) => (
                  <Select
                    options={departmentOptions}
                    placeholder="Select Department"
                    value={
                      departmentOptions.find(
                        (option) => option.value === field.value,
                      ) || null
                    }
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption?.value || "")
                    }
                    classNames={{
                      control: () =>
                        "rounded-xl border border-slate-200 min-h-[48px] px-4 py-2 shadow-none",
                    }}
                  />
                )}
              />

              <Controller
                name="faculty"
                control={control}
                rules={{ required: "Faculty is required" }}
                render={({ field }) => (
                  <Select
                    options={facultyOptions}
                    placeholder="Select Faculty"
                    value={
                      facultyOptions.find(
                        (option) => option.value === field.value,
                      ) || null
                    }
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption?.value || "")
                    }
                    classNames={{
                      control: () =>
                        "rounded-xl border border-slate-200 min-h-[48px] px-4 py-2 shadow-none",
                    }}
                  />
                )}
              />

              <textarea
                rows="4"
                placeholder="Description"
                {...register("description")}
                className="w-full rounded-xl border border-slate-200 px-4 py-3"
              />

              <select
                {...register("status")}
                className="w-full rounded-xl border border-slate-200 px-4 py-3"
              >
                <option value="active">Active</option>

                <option value="inactive">Inactive</option>
              </select>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 rounded-xl border border-slate-200 py-3 font-semibold hover:bg-slate-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
                >
                  {editingSubject ? "Update Subject" : "Create Subject"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      <ConfirmModal
        isOpen={deleteModal}
        title="Delete Subject"
        message="Are you sure you want to delete this subject?"
        confirmText="Delete"
        cancelText="Cancel"
        type="delete"
        onConfirm={deleteHandler}
        onCancel={() => setDeleteModal(false)}
      />
    </div>
  );
};

export default SubjectPage;
