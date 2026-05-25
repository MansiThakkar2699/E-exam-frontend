import React from "react";
import {
  LayoutDashboard,
  FileText,
  ClipboardCheck,
  LogOut,
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
      name: "Evaluation",
      path: "/faculty/evaluation",
      icon: <ClipboardCheck size={20} />,
    },
  ];

  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="w-72 bg-indigo-900 text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-10">
        Faculty Panel
      </h1>

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

      <button
        onClick={logoutHandler}
        className="mt-10 flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-600 transition w-full"
      >
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
};

export default FacultySidebar;