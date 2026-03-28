import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { completeOnboarding } from '../lib/api.js'
import toast from 'react-hot-toast'

const useOnboard = () => {
    const queryClient = useQueryClient()

    const {mutate, isPending} = useMutation({
        mutationKey: ["onboard"],
        mutationFn: completeOnboarding,
        onSuccess: ()=>{
            toast.success("Profile onboarded successfully.")
            queryClient.invalidateQueries({queryKey: ["authUser"]})
        },
        onError: (error)=>{
            toast.error(error.response.data.message)
        }
    })

    return {isPending, onboardingMutation:mutate}
}

export default useOnboard