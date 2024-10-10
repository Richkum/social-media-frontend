import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing/LandingPage";
import RegistrationPage from "./pages/register/Register";
import LoginPage from "./pages/login/Login";
import ResetPassword from "./pages/resert-password/ResetPass";
import Dashboard from "./pages/dashboard/Dashboard";
import FeedsPage from "./pages/home/FeedsPage";
import ProfilePage from "./pages/profile/ProfilePage";
import ProtectedRoute from "./context/protectedRoute";
import UserProfilePage from "./pages/user-profile/UserProfile";
import NotificationPage from "./pages/notifications/Notification";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route element={<ProtectedRoute />}>
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/home" element={<FeedsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/user-profile/:userId" element={<UserProfilePage />} />
          <Route path="/notifications" element={<NotificationPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
