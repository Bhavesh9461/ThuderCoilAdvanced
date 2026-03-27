import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './middleware/ProtectedRoute'
import AuthRoute from './middleware/AuthRoute'
import OnboardingRoute from './middleware/OnboardingRoute'
import OnboardingPage from './pages/OnboardingPage'

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
           <OnboardingRoute isAuthenticated={isAuthenticated} isOnboarded={isOnboarded} >
              <OnboardingPage/>
           </OnboardingRoute>
          } 
        />
    </Routes>
  )
}

export default AppRoutes