import React, { FC } from "react";

interface IProps {
  message: string;
}
const ErrorBox: FC<IProps> = ({ message }) => {
  return <div>Error: {message}</div>;
};

export default ErrorBox;
