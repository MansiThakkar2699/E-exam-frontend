import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import Topbar from "../components/admin/Topbar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar />

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

export default AdminLayout;