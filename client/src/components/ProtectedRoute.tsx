import React, { FC, ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { paths } from "../constants/paths";
import { UserInfo } from "../types/models/UserInfo";

const ProtectedRoute: FC<{ user: UserInfo | null; children?: ReactNode }> = ({
  user,
  children,
}) => {
  if (!user) {
    return <Navigate to={paths.LOGIN} replace />;
  }
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
