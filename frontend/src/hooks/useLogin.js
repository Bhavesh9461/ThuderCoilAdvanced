import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import toast from 'react-hot-toast'
import { login } from '../lib/api.js'

const useLogin = () => {
  const queryClient = useQueryClient()

  const {mutate, isPending, error} = useMutation({
    mutationKey: ["signin"],
    mutationFn: login,
    onSuccess: ()=>{
        toast.success("Logged In successfully.")
        queryClient.invalidateQueries({queryKey: ["authUser"]})
    }
  })

  return {isPending, error, loginMutation: mutate}
}

export default useLogin