import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/SignUp";

import StudentDashboard from "../pages/student/StudentDashboard";
import TrainerDashboard from "../pages/trainer/TrainerDashboard";
import InstitutionDashboard from "../pages/institiution/InstitutionDashboard";
import ManagerDashboard from "../pages/manager/ManagerDashboard";
import MonitorDashboard from "../pages/monitor/MonitorDashboard";

import ProtectedRoute from "../components/common/ProtectedRoute";
import JoinBatch from "../pages/JoinBatches";
import RootRedirect from "../components/RootHandler";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<RootRedirect />} />

        {/* Auth */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />

        {/* Student */}
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* Trainer */}
        <Route
          path="/trainer/dashboard"
          element={
            <ProtectedRoute role="trainer">
              <TrainerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Institution */}
        <Route
          path="/institution/dashboard"
          element={
            <ProtectedRoute role="institution">
              <InstitutionDashboard />
            </ProtectedRoute>
          }
        />

        {/* Manager */}
        <Route
          path="/manager/dashboard"
          element={
            <ProtectedRoute role="manager">
              <ManagerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Monitor */}
        <Route
          path="/monitor/dashboard"
          element={
            <ProtectedRoute role="monitor">
              <MonitorDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/join/:token" element={<JoinBatch />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;