import React from "react";

import { AlertTriangle, Trash2 } from "lucide-react";

const ConfirmModal = ({
  isOpen,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
  type = "delete",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* ICON */}
        <div
          className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${
            type === "delete"
              ? "bg-red-100 text-red-600"
              : "bg-orange-100 text-orange-600"
          }`}
        >
          {type === "delete" ? (
            <Trash2 size={30} />
          ) : (
            <AlertTriangle size={30} />
          )}
        </div>

        {/* CONTENT */}
        <div className="mt-5 text-center">
          <h2 className="text-2xl font-bold text-slate-800">{title}</h2>

          <p className="mt-2 text-slate-500 leading-relaxed">{message}</p>
        </div>

        {/* BUTTONS */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 rounded-xl border border-slate-200 bg-white py-3 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 rounded-xl py-3 font-semibold text-white transition disabled:opacity-50 ${
              type === "delete"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-orange-600 hover:bg-orange-700"
            }`}
          >
            {loading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
