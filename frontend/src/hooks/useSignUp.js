import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast";
import { signup } from "../lib/api.js";


const useSignUp = () => {
    const queryClient = useQueryClient()

    const {mutate, isPending, error} = useMutation({
        mutationKey: ["signup"],
        mutationFn: signup,
        onSuccess: () =>{
            toast.success("We sent a email, verify your email.")
            queryClient.invalidateQueries({queryKey: ["authUser"]})
        },
        onError: (error)=>{
            toast.error(error?.response?.data?.message || error?.message || "Something Went Wrong! Please try again")
        }
    })

    return {isPending, error, signupMutation: mutate}
}

export default useSignUp