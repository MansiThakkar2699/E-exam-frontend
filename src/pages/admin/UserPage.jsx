import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { toast } from "react-toastify";
import { Shield, Trash2, Users } from "lucide-react";
import ConfirmModal from "../../components/common/ConfirmModal";
import Pagination from "../../components/common/Pagination";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  // GET USERS
  const getUsers = async () => {
    try {
      const res = await axiosInstance.get(
        `/user/users?page=${currentPage}&limit=${limit}&search=${search}&role=${roleFilter}`,
      );

      setUsers(res.data.users);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getUsers();
    }, 500);

    return () => clearTimeout(timer);
  }, [search, roleFilter, currentPage]);

  const openDeleteModal = (id) => {
    setSelectedUserId(id);

    setDeleteModal(true);
  };

  // DELETE USER
  const deleteHandler = async () => {
    try {
      setDeleteLoading(true);

      const res = await axiosInstance.delete(`/user/users/${selectedUserId}`);

      toast.success(res.data.message);

      setDeleteModal(false);

      setSelectedUserId(null);

      getUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    } finally {
      setDeleteLoading(false);
    }
  };

  // ROLE UPDATE
  const roleChangeHandler = async (id, role) => {
    try {
      const res = await axiosInstance.put(`/user/users/role/${id}`, { role });

      toast.success(res.data.message);

      getUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Role update failed");
    }
  };

  // STATUS UPDATE
  const statusChangeHandler = async (id, accountStatus) => {
    try {
      const res = await axiosInstance.put(`/user/users/accountStatus/${id}`, {
        accountStatus,
      });

      toast.success(res.data.message);

      getUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Status update failed");
    }
  };

  const approveUserHandler = async (id) => {
    try {
      const res = await axiosInstance.put(`/auth/approve/${id}`);

      toast.success(res.data.message);

      getUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Approval failed");
    }
  };

  return (
    <div>
      {/* FILTERS */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-xl border border-slate-200 px-4 py-3"
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="rounded-xl border border-slate-200 px-4 py-3"
        >
          <option value="all">All Roles</option>

          <option value="student">Student</option>

          <option value="faculty">Faculty</option>

          <option value="admin">Admin</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center gap-3">
          <div className="h-11 w-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <Users size={22} />
          </div>

          <div>
            <h2 className="font-bold text-slate-800">Users</h2>

            <p className="text-sm text-slate-500">
              Total {users.length} users
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-600">#</th>

                <th className="px-6 py-4 font-semibold text-slate-600">
                  Full Name
                </th>

                <th className="px-6 py-4 font-semibold text-slate-600">Role</th>

                <th className="px-6 py-4 font-semibold text-slate-600">
                  Status
                </th>

                <th className="px-6 py-4 font-semibold text-slate-600">
                  Department
                </th>

                <th className="px-6 py-4 font-semibold text-slate-600">
                  Joined
                </th>

                <th className="px-6 py-4 font-semibold text-slate-600">
                  Approval
                </th>

                <th className="px-6 py-4 font-semibold text-slate-600 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr
                    key={user._id}
                    className="border-t border-slate-200 hover:bg-slate-50"
                  >
                    <td className="px-6 py-4">{index + 1}</td>

                    <td className="px-6 py-4 font-semibold">
                      <div>
                        <p className="font-semibold">{user.fullName}</p>
                        <p className="text-sm text-slate-500">{user.email}</p>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <select
                        value={user.role}
                        onChange={(e) =>
                          roleChangeHandler(user._id, e.target.value)
                        }
                        className="rounded-lg border border-slate-200 px-3 py-2"
                      >
                        <option value="student">Student</option>

                        <option value="faculty">Faculty</option>

                        <option value="admin">Admin</option>
                      </select>
                    </td>

                    <td className="px-6 py-4">
                      <select
                        value={user.accountStatus}
                        onChange={(e) =>
                          statusChangeHandler(user._id, e.target.value)
                        }
                        className={`rounded-lg px-3 py-2 border ${
                          user.accountStatus === "active"
                            ? "bg-green-50 text-green-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        <option value="active">Active</option>

                        <option value="blocked">Blocked</option>
                      </select>
                    </td>

                    <td className="px-6 py-4">{user.department.name}</td>

                    <td className="px-6 py-4">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4">
                      {user.approvalStatus === "approved" ? (
                        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
                          Approved
                        </span>
                      ) : (
                        <button
                          onClick={() => approveUserHandler(user._id)}
                          className="bg-orange-100 text-orange-600 px-4 py-2 rounded-lg"
                        >
                          Approve
                        </button>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end">
                        <button
                          onClick={() => openDeleteModal(user._id)}
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
                    colSpan="8"
                    className="px-6 py-10 text-center text-slate-500"
                  >
                    No users found
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
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleteLoading}
        type="delete"
        onConfirm={deleteHandler}
        onCancel={() => {
          setDeleteModal(false);
          setSelectedUserId(null);
        }}
      />
    </div>
  );
};

export default UserPage;
