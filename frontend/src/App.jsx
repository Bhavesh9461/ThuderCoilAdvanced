import React from 'react'
import AppRoutes from './AppRoutes'
import { useThemeStore } from './store/useThemeStore.js'

const App = () => {

  const {theme} = useThemeStore()

  return (
    <div className="h-screen" data-theme={theme}>
      <AppRoutes/>
    </div>
  )
}

export default App