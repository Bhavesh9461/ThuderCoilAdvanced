import { CloudLightning } from 'lucide-react'
import React from 'react'

const AppLogoIncoded = () => {
  return (
    <div className="flex items-center absolute z-10 gap-1.5 sm:gap-2.5 text-base opacity-10">
      <CloudLightning className="size-8 sm:size-12 md:size-16 lg:size-36" />
      <span className="text-xl sm:text-2xl md:text-5xl font-bold font-mono lg:tracking-widest">
        ThunderCoil
      </span>
    </div>
  )
}

export default AppLogoIncoded