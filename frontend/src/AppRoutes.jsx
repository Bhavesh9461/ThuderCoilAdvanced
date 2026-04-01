import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import ProtectedRoute from './middleware/ProtectedRoute'
import AuthRoute from './middleware/AuthRoute'
import OnboardingRoute from './middleware/OnboardingRoute'
import OnboardingPage from './pages/OnboardingPage'
import HomePage from './pages/HomePage'
import Layout from './components/Layout'
import EmailVerificationPage from './pages/EmailVerificationPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import NotificationsPage from './pages/NotificationsPage'
import CallPage from './pages/CallPage'

const AppRoutes = ({isAuthenticated, isOnboarded, isVerified}) => {

  return (
    <Routes>
        <Route path='/' element={
          <ProtectedRoute isAuthenticated={isAuthenticated} isOnboarded={isOnboarded} isVerified={isVerified}>
            <Layout>
              <HomePage/>
            </Layout>
          </ProtectedRoute>
        } />
        <Route path='/signup' element={
          <AuthRoute isAuthenticated={isAuthenticated} isOnboarded={isOnboarded} isVerified={isVerified}>
            <SignUpPage/>
          </AuthRoute>
        } />
        <Route path='/login' element={
          <AuthRoute isAuthenticated={isAuthenticated} isOnboarded={isOnboarded} isVerified={isVerified}>
             <LoginPage/>
          </AuthRoute>
        } />
        <Route path='/verify-email' element={
          isAuthenticated ? (
            isVerified ? (
              <Navigate to={"/"}/>
            ) : (
              <EmailVerificationPage/>
            )
          ) : (
            <Navigate to={"/login"} />
          )
        }
        />

        <Route path='/forgot-password' element={
          <AuthRoute isAuthenticated={isAuthenticated} isOnboarded={isOnboarded} isVerified={isVerified}>
              <ForgotPasswordPage/>
          </AuthRoute>
        } />
        <Route path='/reset-password/:token' element={
          <AuthRoute isAuthenticated={isAuthenticated} isOnboarded={isOnboarded} isVerified={isVerified}>
              <ResetPasswordPage/>
          </AuthRoute>
        } />

        <Route path='/onboarding' element={
           <OnboardingRoute isAuthenticated={isAuthenticated} isOnboarded={isOnboarded} isVerified={isVerified}>
              <OnboardingPage/>
           </OnboardingRoute>
          } 
        />

        <Route path='/notifications' element={
          <ProtectedRoute isAuthenticated={isAuthenticated} isOnboarded={isOnboarded} isVerified={isVerified}>
            <Layout>
              <NotificationsPage/>
            </Layout>
          </ProtectedRoute>
        }
        />


        {/* call page */}
        <Route path='/call/:id' element={
          <ProtectedRoute isAuthenticated={isAuthenticated} isOnboarded={isOnboarded} isVerified={isVerified}>
            <CallPage/>
          </ProtectedRoute>
        }
        />

    </Routes>
  )
}

export default AppRoutes