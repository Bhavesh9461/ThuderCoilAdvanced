import React from "react";
import { Link, useLocation } from "react-router";

const ButtonLink = ({ icon: Icon, routePath, hasNotification }) => {
  const location = useLocation();
  const isActive = location.pathname === routePath;

  return (
    <Link to={routePath} className="relative">
      <button className="btn btn-ghost btn-circle hidden md:inline-flex">
        
        {/* ICON */}
        <Icon className="h-4 w-4 sm:h-6 sm:w-6 text-base-content opacity-70" />

        {/* 🔴 NOTIFICATION DOT */}
        {hasNotification && routePath === "/notifications" && (
          <span className="absolute top-[20%] right-[20%] w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </button>
    </Link>
  );
};

export default ButtonLink;