import React from "react";
import { Route } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";

import AdminLayout from "../layouts/AdminLayout";

import AdminDashboard from "../pages/AdminDashboard";
import SubjectPage from "../pages/admin/SubjectPage";
import ExamPage from "../pages/admin/ExamPage";
import QuestionPage from "../pages/admin/QuestionPage";
import UserPage from "../pages/admin/UserPage";

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

      <Route path="questions" element={<QuestionPage />} />

      <Route path="users" element={<UserPage />} />
    </Route>
  );
};

export default AdminRoutes;