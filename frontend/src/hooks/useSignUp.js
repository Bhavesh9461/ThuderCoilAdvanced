import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast";
import { signup } from "../lib/api.js";


const useSignUp = () => {
    const queryClient = useQueryClient()

    const {mutate, isPending, error} = useMutation({
        mutationKey: ["signup"],
        mutationFn: signup,
        onSuccess: () =>{
            toast.success("Account registered successfully.")
            queryClient.invalidateQueries({queryKey: ["authUser"]})
        }
    })

    return {isPending, error, signupMutation: mutate}
}

export default useSignUp