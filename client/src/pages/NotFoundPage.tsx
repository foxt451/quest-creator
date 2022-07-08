import { Alert } from "@mui/material";
import React, { FC } from "react";
import { Link } from "react-router-dom";

const NotFoundPage: FC = () => {
  return (
    <Alert severity="error">
      Oops.. This path doesn&apos;t exist. <Link to="/">Go to main page</Link>
    </Alert>
  );
};

export default NotFoundPage;
