import React, { FC } from "react";
import { Alert } from "@mui/material";

interface IProps {
  message: string;
}
const ErrorBox: FC<IProps> = ({ message }) => {
  return <Alert severity="error">{message}</Alert>;
};

export default ErrorBox;
