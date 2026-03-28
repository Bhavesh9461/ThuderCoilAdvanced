import { LoaderIcon, PlugZap } from 'lucide-react'
import React from 'react'
import { useThemeStore } from '../store/useThemeStore.js'

const PageLoader = () => {

//   const {theme} = useThemeStore()
  const theme = "forest"

  return (
    <div className='min-h-screen flex items-center justify-center relative' data-theme={theme}>
       {/* <LoaderIcon className="animate-spin size-10 text-primary" /> */}
       <PlugZap className="animate-ping size-12 text-primary" />
       <PlugZap className="animate-pulse size-14 text-primary/60 absolute" />
    </div>
  )
}

export default PageLoader