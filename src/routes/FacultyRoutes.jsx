import React from "react";

import { Route } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";

import FacultyLayout from "../layouts/FacultyLayout";

import FacultyDashboard from "../pages/FacultyDashboard";

import ExamPage from "../pages/admin/ExamPage";

import QuestionPage from "../pages/admin/QuestionPage";

import ProfilePage from "../pages/admin/ProfilePage";

import ChangePasswordPage from "../pages/admin/ChangePasswordPage";
import FacultyPerformancePage from "../pages/faculty/FacultyPerformancePage";


const FacultyRoutes = () => {
  return (
    <Route
      path="/faculty"
      element={
        <ProtectedRoute allowedRoles={["faculty"]}>
          <FacultyLayout />
        </ProtectedRoute>
      }
    >
      <Route
        path="dashboard"
        element={<FacultyDashboard />}
      />

      <Route
        path="exams"
        element={<ExamPage />}
      />

      <Route
        path="questions"
        element={<QuestionPage />}
      />

      <Route path="profile" element={<ProfilePage />} />

      <Route path="change-password" element={<ChangePasswordPage />} />

      <Route path="performance" element={<FacultyPerformancePage />} />
    </Route>
  );
};

export default FacultyRoutes;