import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing/LandingPage";
import RegistrationPage from "./pages/register/Register";
import LoginPage from "./pages/login/Login";
import ResetPassword from "./pages/resert-password/ResetPass";
import Dashboard from "./pages/dashboard/Dashboard";
// import FeedsPage from "./pages/home/FeedsPage";
// import ProtectedRoute from "./context/protectedRoute";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* <ProtectedRoute> */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/home" element={<FeedsPage />} /> */}
        {/* </ProtectedRoute> */}
      </Routes>
    </Router>
  );
}

export default App;
