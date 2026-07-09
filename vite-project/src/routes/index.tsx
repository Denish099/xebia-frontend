import { Routes, Route } from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import SignUpPage from '../features/auth/pages/SignUpPage';
import CompleteProfilePage from '../features/auth/pages/CompleteProfilePage';
import ForgotPasswordPage from '../features/auth/pages/ForgotPasswordPage';
import VerifyEmailPage from '../features/auth/pages/VerifyEmailPage';
import ResetPasswordPage from '../features/auth/pages/ResetPasswordPage';
import SessionExpiredPage from '../features/auth/pages/SessionExpiredPage';
import DashboardPage from '../features/auth/pages/DashboardPage';
import ProtectedRoute from '../features/auth/guards/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/session-expired" element={<SessionExpiredPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/complete-profile"
        element={
          <ProtectedRoute>
            <CompleteProfilePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
