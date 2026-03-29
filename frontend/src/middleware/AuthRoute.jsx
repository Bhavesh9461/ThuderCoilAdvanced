import React from "react";
import { Navigate, useLocation } from "react-router";

const AuthRoute = ({ children, isAuthenticated, isOnboarded, isVerified }) => {
 
  if (isAuthenticated && isVerified) {
    return <Navigate to={isOnboarded ? "/" : "/onboarding"} />;
  }

  return children;
};

export default AuthRoute;
