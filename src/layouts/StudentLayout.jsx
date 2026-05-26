import React from "react";
import { Outlet } from "react-router-dom";
import StudentSidebar from "../components/student/StudentSidebar";

const StudentLayout = () => {
  return (
    <div className="flex">
      <StudentSidebar />

      <div className="flex-1 bg-slate-100 min-h-screen p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default StudentLayout;