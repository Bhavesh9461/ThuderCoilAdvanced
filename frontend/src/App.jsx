import React from 'react'
import AppRoutes from './AppRoutes'
import { useThemeStore } from './store/useThemeStore.js'
import { Toaster } from 'react-hot-toast'
import useAuthUser from './hooks/useAuthUser.js'
import PageLoader from './components/PageLoader.jsx'

const App = () => {

  const {theme} = useThemeStore()

  const {isLoading, authUser} = useAuthUser()
  
  const isAuthenticated = Boolean(authUser)
  const isOnboarded = authUser?.isOnboarded
  const isVerified = authUser?.isVerified

  if(isLoading){
    return <PageLoader/>
  }

  return (
    <div className="h-screen" data-theme={theme}>
      <AppRoutes isAuthenticated={isAuthenticated} isOnboarded={isOnboarded} isVerified={isVerified} />
        
      <Toaster/>
    </div>
  )
}

export default App