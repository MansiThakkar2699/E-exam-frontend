import React from "react";
import { Route } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";

import AdminLayout from "../layouts/AdminLayout";

import AdminDashboard from "../pages/AdminDashboard";
import SubjectPage from "../pages/admin/SubjectPage";
import ExamPage from "../pages/admin/ExamPage";

const AdminRoutes = () => {
  return (
    <Route
      path="/admin"
      element={
        <ProtectedRoute allowedRoles={["admin"]}>
          <AdminLayout />
        </ProtectedRoute>
      }
    >
      <Route path="dashboard" element={<AdminDashboard />} />

      <Route path="subjects" element={<SubjectPage />} />

      <Route path="exams" element={<ExamPage />} />
    </Route>
  );
};

export default AdminRoutes;