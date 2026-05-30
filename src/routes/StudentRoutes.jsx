import React from "react";
import { Route } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";

import StudentLayout from "../layouts/StudentLayout";

import StudentDashboard from "../pages/StudentDashboard";

import ExamListPage from "../pages/student/ExamListPage";

import AttemptExamPage from "../pages/student/AttemptExamPage";

import ResultPage from "../pages/student/ResultPage";

import ProfilePage from "../pages/admin/ProfilePage";

import ChangePasswordPage from "../pages/admin/ChangePasswordPage";

const StudentRoutes = () => {
  return (
    <Route
      path="/student"
      element={
        <ProtectedRoute allowedRoles={["student"]}>
          <StudentLayout />
        </ProtectedRoute>
      }
    >
      <Route path="dashboard" element={<StudentDashboard />} />

      <Route path="exams" element={<ExamListPage />} />

      <Route path="exam/:examId" element={<AttemptExamPage />} />

      <Route path="results" element={<ResultPage />} />

      <Route path="profile" element={<ProfilePage />} />

      <Route path="change-password" element={<ChangePasswordPage />} />
    </Route>
  );
};

export default StudentRoutes;
