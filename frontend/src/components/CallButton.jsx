import { VideoIcon } from 'lucide-react'
import React from 'react'

const CallButton = ({handleVideoCall}) => {
  return (
    <div className="p-3 border-b flex items-center justify-center max-w-7xl mx-auto w-full absolute top-0">
        <button 
         onClick={handleVideoCall}
         className="btn btn-primary btn-sm text-white"
        >
            <VideoIcon className='size-6' />
        </button>
    </div>
  )
}

export default CallButton