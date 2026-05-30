import React from "react";
import { Outlet } from "react-router-dom";
import FacultySidebar from "../components/faculty/FacultySidebar";
import Topbar from "../components/admin/Topbar";

const FacultyLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <FacultySidebar />

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

export default FacultyLayout;