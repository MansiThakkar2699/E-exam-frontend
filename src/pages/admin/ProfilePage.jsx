import React from "react";

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex items-center gap-5">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 text-4xl font-bold text-white uppercase">
          {user?.fullName?.charAt(0)}
        </div>

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            {user?.fullName}
          </h1>

          <p className="mt-1 text-slate-500">{user?.email}</p>

          <span className="mt-3 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold capitalize text-blue-600">
            {user?.role}
          </span>
        </div>
      </div>

      {/* INFO */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-sm text-slate-500">Department</p>

          <h3 className="mt-1 text-lg font-semibold text-slate-800">
            {user.department?.name || "-"}
          </h3>
        </div>

        <div>
          <p className="text-sm text-slate-500">Mobile</p>

          <h3 className="mt-1 text-lg font-semibold text-slate-800">
            {user?.mobile || "N/A"}
          </h3>
        </div>

        <div>
          <p className="text-sm text-slate-500">Student ID</p>

          <h3 className="mt-1 text-lg font-semibold text-slate-800">
            {user?.studentId || "N/A"}
          </h3>
        </div>

        <div>
          <p className="text-sm text-slate-500">Faculty ID</p>

          <h3 className="mt-1 text-lg font-semibold text-slate-800">
            {user?.facultyId || "N/A"}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;