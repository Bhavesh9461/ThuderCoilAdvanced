import { PlugZap } from 'lucide-react'
import React from 'react'
import { useThemeStore } from '../store/useThemeStore.js'

const ChatLoader = () => {

   const {theme} = useThemeStore()

  return (
    <div className='relative border h-screen lg:h-full border-base-300 rounded-2xl shadow-xl bg-base-300 flex-1 flex flex-col overflow-hidden items-center justify-center select-none' data-theme={theme}>
       {/* <LoaderIcon className="animate-spin size-10 text-primary" /> */}
       <PlugZap className="animate-ping size-12 text-primary mb-6" />
       <PlugZap className="animate-pulse size-14 text-primary/60 absolute top-[40%]" />
       <p className="mt-4 text-center text-lg font-mono">Connecting to chat...</p>
    </div>
  )
}

export default ChatLoader