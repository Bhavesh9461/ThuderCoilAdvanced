import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { logout } from '../lib/api.js'
import toast from 'react-hot-toast'

const useLogout = () => {
  const queryClient = useQueryClient()

  const {mutate} = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: ()=>{
        toast.success("Logged out successfully.")
        queryClient.invalidateQueries({queryKey: ['authUser']})
    }
  })

  return {logoutMutation: mutate}
}

export default useLogout