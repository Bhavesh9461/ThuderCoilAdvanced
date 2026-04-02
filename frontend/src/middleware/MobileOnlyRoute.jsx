import React from 'react'
import { Navigate } from 'react-router'

const MobileOnlyRoute = ({children}) => {
  const isMobile = window.innerWidth < 1024 //tailwind md breakpoint

  return isMobile ? children : <Navigate to={"/"} replace />
}

export default MobileOnlyRoute