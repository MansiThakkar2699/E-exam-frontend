import React from "react";
import AdminSidebar from "../components/admin/AdminSidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 bg-slate-100 min-h-screen p-6">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;