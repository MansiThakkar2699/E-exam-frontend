import React from "react";
import StudentSidebar from "../components/student/StudentSidebar";

const StudentLayout = ({ children }) => {
  return (
    <div className="flex">
      <StudentSidebar />
      <div className="flex-1 bg-slate-100 min-h-screen p-6">
        {children}
      </div>
    </div>
  );
};

export default StudentLayout;