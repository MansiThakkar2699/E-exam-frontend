import React from "react";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  LogOut,
  HelpCircle,
  Building2,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <Users size={20} />,
    },
    {
      name: "Departments",
      path: "/admin/departments",
      icon : <Building2 size={20} />,
    },
    {
      name: "Subjects",
      path: "/admin/subjects",
      icon: <BookOpen size={20} />,
    },
    {
      name: "Exams",
      path: "/admin/exams",
      icon: <FileText size={20} />,
    },
    {
      name: "Questions",
      path: "/admin/questions",
      icon: <HelpCircle size={20} />,
    },
  ];

  return (
    <div className="w-72 bg-slate-900 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-10">E-Exam Admin</h1>

      <div className="space-y-3">
        {menu.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              location.pathname === item.path
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
