import React from "react";
import {
  LayoutDashboard,
  FileText,
  ClipboardCheck,
  LogOut,
  HelpCircle,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const FacultySidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    {
      name: "Dashboard",
      path: "/faculty/dashboard",
      icon: <LayoutDashboard size={20} />,
    },

    {
      name: "Exams",
      path: "/faculty/exams",
      icon: <FileText size={20} />,
    },

    {
      name: "Questions",
      path: "/faculty/questions",
      icon: <HelpCircle size={20} />,
    },

    {
      name: "Results",
      path: "/faculty/results",
      icon: <ClipboardCheck size={20} />,
    },
  ];

  return (
    <div className="w-72 bg-slate-900 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-10">Faculty Panel</h1>

      <div className="space-y-3">
        {menu.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              location.pathname === item.path
                ? "bg-blue-600"
                : "hover:bg-indigo-800"
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

export default FacultySidebar;
