import React from "react";
import { Route } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";

import StudentLayout from "../layouts/StudentLayout";

import StudentDashboard from "../pages/StudentDashboard";

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
    </Route>
  );
};

export default StudentRoutes;