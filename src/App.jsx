import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";

import AdminDashboard from "./pages/AdminDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import StudentDashboard from "./pages/StudentDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

import AdminLayout from "./layouts/AdminLayout";
import FacultyLayout from "./layouts/FacultyLayout";
import StudentLayout from "./layouts/StudentLayout";

import SubjectPage from "./pages/admin/SubjectPage";
import ExamPage from "./pages/admin/ExamPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route
            path="/admin/subjects"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout>
                  <SubjectPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/exams"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminLayout>
                  <ExamPage />
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/faculty/dashboard"
            element={
              <ProtectedRoute allowedRoles={["faculty"]}>
                <FacultyLayout>
                  <FacultyDashboard />
                </FacultyLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentLayout>
                  <StudentDashboard />
                </StudentLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </>
  );
}

export default App;
