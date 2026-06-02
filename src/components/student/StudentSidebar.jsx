import React from "react";
import { LayoutDashboard, FileText, Trophy, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const StudentSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    {
      name: "Dashboard",
      path: "/student/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Available Exams",
      path: "/student/exams",
      icon: <FileText size={20} />,
    },
    {
      name: "Results",
      path: "/student/results",
      icon: <Trophy size={20} />,
    },
    {
      name: "My Performance",
      path: "/student/performance",
      icon: <Trophy size={20} />,
    },
  ];

  return (
    <div className="w-72 bg-slate-900 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-10">Student Panel</h1>

      <div className="space-y-3">
        {menu.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              location.pathname === item.path
                ? "bg-blue-600"
                : "hover:bg-cyan-800"
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

export default StudentSidebar;
