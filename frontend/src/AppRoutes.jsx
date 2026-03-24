import React from 'react'
import { Route, Routes } from 'react-router'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={"Home Page"} />
        <Route path='/signup' element={<SignUpPage/>} />
        <Route path='/login' element={<LoginPage/>} />
    </Routes>
  )
}

export default AppRoutes