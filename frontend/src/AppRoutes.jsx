import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './middleware/ProtectedRoute'
import AuthRoute from './middleware/AuthRoute'

const AppRoutes = ({isAuthenticated, isOnboarded}) => {

  return (
    <Routes>
        <Route path='/' element={
          <ProtectedRoute isAuthenticated={isAuthenticated} isOnboarded={isOnboarded}>
            homePage
          </ProtectedRoute>
        } />
        <Route path='/signup' element={
          <AuthRoute isAuthenticated={isAuthenticated} isOnboarded={isOnboarded}>
            <SignUpPage/>
          </AuthRoute>
        } />
        <Route path='/login' element={
          <AuthRoute isAuthenticated={isAuthenticated} isOnboarded={isOnboarded}>
             <LoginPage/>
          </AuthRoute>
        } />
        <Route path='/onboarding' element={
           isAuthenticated ? (
        !isOnboarded ? (
           <>
           <h1>onboard page</h1>
           </>
        ) : (
          <Navigate to="/" />
        )
      ) : (
        <Navigate to="/login" />
      )
        } />
    </Routes>
  )
}

export default AppRoutes