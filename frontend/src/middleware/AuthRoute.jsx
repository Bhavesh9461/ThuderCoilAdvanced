import React from 'react'
import { Navigate } from 'react-router'

const AuthRoute = ({children, isAuthenticated, isOnboarded}) => {
  if(isAuthenticated){
    return <Navigate to={isOnboarded? "/" : "/onboarding"} />
  }

  return children
}

export default AuthRoute