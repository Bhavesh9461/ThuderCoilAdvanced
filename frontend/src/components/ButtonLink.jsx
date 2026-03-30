import React from "react";
import { Link } from "react-router";

const ButtonLink = ({icon:Icon, routePath}) => {
  return (
    <Link to={routePath}>
      <button className="btn btn-ghost btn-circle hidden md:inline-flex">
        <Icon className="h-4 w-4  sm:h-6 sm:w-6 text-base-content opacity-70" />
      </button>
    </Link>
  );
};

export default ButtonLink;
