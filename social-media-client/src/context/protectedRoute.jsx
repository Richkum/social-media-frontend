import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import { checkTokenValidity, logout } from "../context/authContex";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, token } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check token validity
    dispatch(checkTokenValidity());

    if (!isAuthenticated || !token) {
      dispatch(logout()); // Invalidate the user session
      navigate("/"); // Redirect to the landing page
    }
  }, [dispatch, isAuthenticated, token, navigate]);

  // Ensure that the component only renders once token validity is confirmed
  if (!token) {
    return null; // Prevent rendering of child components until the token is checked
  }

  return <Outlet />; // Render the nested routes if authenticated
};

export default ProtectedRoute;
