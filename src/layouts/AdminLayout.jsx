import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 bg-slate-100 min-h-screen p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;