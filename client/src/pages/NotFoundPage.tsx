import React, { FC } from "react";
import { FaBan } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const NotFoundPage: FC = () => {
  return (
    <div>
      <FaBan />
      <br />
      Oops.. This path doesn&apos;t exist.
      <br />
      <NavLink to="/">Go to main page</NavLink>
    </div>
  );
};

export default NotFoundPage;
