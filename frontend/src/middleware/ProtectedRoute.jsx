import React from 'react'
import { Navigate, useNavigate } from 'react-router'

const ProtectedRoute = ({children, isAuthenticated, isOnboarded, isVerified}) => {

   const navigate = useNavigate()

  if(!isAuthenticated) return <Navigate to={"/login"} />
  if(!isVerified) return <Navigate to={"/verify-email"} />
  if(!isOnboarded) return <Navigate to={"/onboarding"} /> 

  return children
}

export default ProtectedRoute