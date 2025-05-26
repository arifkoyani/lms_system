import React, { useContext } from "react";
import { AuthContext } from "./authContext/authContext";
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoutes = () => {
  const { auth } = useContext(AuthContext);

  return auth?.accessToken ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default ProtectedRoutes;
