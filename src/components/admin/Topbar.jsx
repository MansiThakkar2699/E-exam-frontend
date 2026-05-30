import React, { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  KeyRound,
  LogOut,
  User,
  ChevronRight,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { usePage } from "../../context/PageContext";

const Topbar = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef();

  const user = JSON.parse(localStorage.getItem("user"));

  const basePath = `/${user?.role}`;

  const roleName = user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1);

  const { dynamicTitle } = usePage();

  // CLOSE DROPDOWN
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // LOGOUT
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logout successful");

    navigate("/login");
  };

  // PAGE TITLES
  const pageTitles = {
    dashboard: "Dashboard",
    users: "User Management",
    departments: "Department Management",
    subjects: "Subject Management",
    exams: user?.role === "student" ? "Available Exams" : "Exam Management",
    questions: "Question Management",
    profile: "Profile",
    "change-password": "Change Password",
    results: "My Results",
  };

  const pathParts = location.pathname.split("/");

  const currentPage = pathParts[pathParts.length - 1];

  let pageTitle = pageTitles[currentPage] || "Dashboard";

  if (
    user?.role === "student" &&
    location.pathname.includes("/student/exam/")
  ) {
    pageTitle = "Attempt Exam";
  }

  const pageDescription = {
    dashboard: "Overview of the system",
    users: "Manage students and faculties",
    departments: "Manage departments",
    subjects: "Manage all subjects",
    exams:
      user?.role === "student"
        ? "View and attempt available exams assigned to you"
        : "Manage examinations",
    questions: "Manage question bank",
    profile: "Manage your profile",
    "change-password": "Update your password",
    results: "Track your exam performance",
  };

  let currentDescription = pageDescription[currentPage] || "";

  if (
    user?.role === "student" &&
    location.pathname.includes("/student/exam/")
  ) {
    currentDescription =
      "Read instructions carefully and submit before the timer ends.";
  }

  return (
    <div className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
      {/* LEFT */}
      <div>
        {/* PAGE TITLE */}
        <h1 className="mt-1 text-3xl font-bold text-slate-800">{pageTitle}</h1>
        <p className="text-md text-slate-500">{currentDescription}</p>

        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span>{roleName}</span>

          {currentPage !== "dashboard" && (
            <>
              <ChevronRight size={14} />

              <span className="font-medium text-slate-700">{pageTitle}</span>

              {dynamicTitle && (
                <>
                  <ChevronRight size={14} />

                  <span className="font-medium text-slate-700">
                    {dynamicTitle}
                  </span>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 hover:bg-slate-50"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white uppercase">
            {user?.fullName?.charAt(0)}
          </div>

          <div className="hidden text-left md:block">
            <h3 className="font-semibold text-slate-800">{user?.fullName}</h3>

            <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
          </div>

          <ChevronDown
            size={18}
            className={`transition ${dropdownOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* DROPDOWN */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-3 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
            <div className="border-b border-slate-100 p-4">
              <h3 className="font-semibold text-slate-800">{user?.fullName}</h3>

              <p className="text-sm text-slate-500">{user?.email}</p>
            </div>

            <div className="p-2">
              <button
                onClick={() => navigate(`${basePath}/profile`)}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-700 hover:bg-slate-100"
              >
                <User size={18} />
                Profile
              </button>

              <button
                onClick={() => navigate(`${basePath}/change-password`)}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-700 hover:bg-slate-100"
              >
                <KeyRound size={18} />
                Change Password
              </button>

              <button
                onClick={logoutHandler}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 hover:bg-red-50"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
