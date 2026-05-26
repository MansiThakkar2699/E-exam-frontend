import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";

import AdminRoutes from "./routes/AdminRoutes";
import FacultyRoutes from "./routes/FacultyRoutes";
import StudentRoutes from "./routes/StudentRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/unauthorized" element={<Unauthorized />} />

          {AdminRoutes()}

          {FacultyRoutes()}

          {StudentRoutes()}
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </>
  );
}

export default App;