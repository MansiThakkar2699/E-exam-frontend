import React from "react";
import { Outlet } from "react-router-dom";
import StudentSidebar from "../components/student/StudentSidebar";
import Topbar from "../components/admin/Topbar";

const StudentLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <StudentSidebar />

      {/* MAIN */}
      <div className="flex-1">
        <Topbar />

        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StudentLayout;