import React from "react";

import { Route } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";

import FacultyLayout from "../layouts/FacultyLayout";

import FacultyDashboard from "../pages/FacultyDashboard";

import ExamPage from "../pages/admin/ExamPage";

import QuestionPage from "../pages/admin/QuestionPage";

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
    </Route>
  );
};

export default FacultyRoutes;