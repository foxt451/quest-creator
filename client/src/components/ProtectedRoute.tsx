import React, { FC, ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { paths } from "../constants/paths";

const ProtectedRoute: FC<{ user: unknown; children?: ReactNode }> = ({
  user,
  children,
}) => {
  if (!user) {
    return <Navigate to={paths.LOGIN} replace />;
  }
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
