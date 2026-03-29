import { useMutation, useQueryClient } from "@tanstack/react-query"
import { verifyEmail } from "../lib/api.js"
import toast from "react-hot-toast"

export const useVerifyEmail = ()=>{
    const queryClient = useQueryClient()

    const {mutate, isPending, error} = useMutation({
        mutationKey: ["verifyEmail"],
        mutationFn: verifyEmail,
        onSuccess: ()=>{
            toast.success("User Verified Successfully.")
            queryClient.invalidateQueries({queryKey: ["authUser"]})
        },
        onError: (error)=>{
            toast.error(error?.response?.data?.message || error?.message || "Something went wrong")
        }
    })

    return {verifyEmailMutation: mutate, verifyPending: isPending, verifyError: error}
}