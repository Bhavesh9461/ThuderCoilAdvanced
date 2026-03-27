import React from 'react'
import { Navigate, useNavigate } from 'react-router'

const ProtectedRoute = ({children, isAuthenticated, isOnboarded}) => {

   const navigate = useNavigate()

  if(!isAuthenticated) return <Navigate to={"/login"} />
  if(!isOnboarded) return <Navigate to={"/onboarding"} /> 

  return children
}

export default ProtectedRoute