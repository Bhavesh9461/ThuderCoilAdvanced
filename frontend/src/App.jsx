import React from 'react'
import AppRoutes from './AppRoutes'
import { useThemeStore } from './store/useThemeStore.js'
import { Toaster } from 'react-hot-toast'
import useAuthUser from './hooks/useAuthUser.js'

const App = () => {

  const {theme} = useThemeStore()

  const {isLoading, authUser} = useAuthUser()
  
  const isAuthenticated = Boolean(authUser)
  const isOnboarded = authUser?.isOnboarded

  if(isLoading){
    return "Loading..."
  }

  return (
    <div className="h-screen" data-theme={theme}>
      <AppRoutes isAuthenticated={isAuthenticated} isOnboarded={isOnboarded} />

      <Toaster/>
    </div>
  )
}

export default App