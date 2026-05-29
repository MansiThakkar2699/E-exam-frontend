import React, { useEffect, useRef, useState } from "react";

import { ChevronDown, KeyRound, LogOut, User } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

const Topbar = () => {
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef();

  const user = JSON.parse(localStorage.getItem("user"));

  // CLOSE DROPDOWN ON OUTSIDE CLICK
  useEffect(() => {
    const handler = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  // LOGOUT
  const logoutHandler = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    toast.success("Logout successful");

    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
      {/* LEFT */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Admin Dashboard
        </h1>

        <p className="text-sm text-slate-500">
          Welcome back, {user?.fullName}
        </p>
      </div>

      {/* RIGHT */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 hover:bg-slate-50"
        >
          {/* PROFILE ICON */}
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white uppercase">
            {user?.fullName?.charAt(0)}
          </div>

          <div className="hidden text-left md:block">
            <h3 className="font-semibold text-slate-800">
              {user?.fullName}
            </h3>

            <p className="text-xs text-slate-500 capitalize">
              {user?.role}
            </p>
          </div>

          <ChevronDown
            size={18}
            className={`transition ${
              dropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* DROPDOWN */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-3 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
            {/* USER INFO */}
            <div className="border-b border-slate-100 p-4">
              <h3 className="font-semibold text-slate-800">
                {user?.fullName}
              </h3>

              <p className="text-sm text-slate-500">
                {user?.email}
              </p>
            </div>

            {/* MENU */}
            <div className="p-2">
              <button
                onClick={() => navigate("/admin/profile")}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-700 hover:bg-slate-100"
              >
                <User size={18} />

                Profile
              </button>

              <button
                onClick={() => navigate("/admin/change-password")}
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