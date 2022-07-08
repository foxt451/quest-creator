import React, { FC, ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { paths } from "../constants/paths";
import { ProfileUserInfo } from "../store/profile/profileSlice";

const ProtectedRoute: FC<{
  user: ProfileUserInfo | null;
  children?: ReactNode;
}> = ({ user, children }) => {
  if (!user) {
    return <Navigate to={paths.LOGIN} replace />;
  }
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
