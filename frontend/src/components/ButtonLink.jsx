import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { useGetFriendRequests } from "../hooks/useFriendRequests.js";

const ButtonLink = ({ icon: Icon, routePath }) => {
  const location = useLocation();
  const isActive = location.pathname === routePath;

  const { friendRequests } = useGetFriendRequests();

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];


  return (
    <Link to={routePath} className="relative">
      <button className="btn btn-ghost btn-circle hidden md:inline-flex">
        {/* ICON */}
        <Icon className="h-4 w-4 sm:h-6 sm:w-6 text-base-content opacity-70" />

        {/* 🔴 NOTIFICATION DOT */}
        {routePath === "/notifications" &&
          !isActive &&
          (incomingRequests.length > 0) && (
            <span className="absolute top-[20%] right-[20%] w-2 h-2 bg-red-500 rounded-full"></span>
          )}
      </button>
    </Link>
  );
};

export default ButtonLink;
