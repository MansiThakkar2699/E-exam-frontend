import React from "react";
import { Outlet } from "react-router-dom";
import FacultySidebar from "../components/faculty/FacultySidebar";

const FacultyLayout = () => {
  return (
    <div className="flex">
      <FacultySidebar />

      <div className="flex-1 bg-slate-100 min-h-screen p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default FacultyLayout;