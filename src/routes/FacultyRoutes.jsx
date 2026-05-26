import React from "react";
import { Route } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";

import FacultyLayout from "../layouts/FacultyLayout";

import FacultyDashboard from "../pages/FacultyDashboard";

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
      <Route path="dashboard" element={<FacultyDashboard />} />
    </Route>
  );
};

export default FacultyRoutes;