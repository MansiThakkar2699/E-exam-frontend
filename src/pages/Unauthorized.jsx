import React from "react";
import { ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="bg-white shadow-xl rounded-3xl p-10 text-center max-w-md">
        <ShieldAlert className="mx-auto text-red-500 mb-5" size={70} />

        <h1 className="text-3xl font-bold text-slate-800">
          Access Denied
        </h1>

        <p className="text-slate-500 mt-3">
          You are not authorized to access this page.
        </p>

        <Link
          to="/login"
          className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;