import React from "react";
import FacultySidebar from "../components/faculty/FacultySidebar";

const FacultyLayout = ({ children }) => {
  return (
    <div className="flex">
      <FacultySidebar />
      <div className="flex-1 bg-slate-100 min-h-screen p-6">
        {children}
      </div>
    </div>
  );
};

export default FacultyLayout;