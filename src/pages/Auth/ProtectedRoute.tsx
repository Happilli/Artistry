import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import NotFound from "../../pages/404";

const ProtectedRoute: React.FC = () => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <NotFound />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
