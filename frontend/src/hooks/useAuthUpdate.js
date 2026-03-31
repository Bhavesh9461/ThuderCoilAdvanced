import { useMutation, useQueryClient } from "@tanstack/react-query";
import { forgotPassword, resetPassword, verifyEmail } from "../lib/api.js";
import toast from "react-hot-toast";

export const useVerifyEmail = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["verifyEmail"],
    mutationFn: verifyEmail,
    onSuccess: () => {
      toast.success("User Verified Successfully.");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
    },
  });

  return {
    verifyEmailMutation: mutate,
    verifyPending: isPending,
    verifyError: error,
  };
};

export const useForgotPassword = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["forgotPassword"],
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success("Sent Password Reset Email Successfully.");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
    },
  });

  return { forgotPasswordMutation: mutate, isPending, error };
};

export const useResetPassword = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Password Reset Successfully. Redirecting to Login Page...",{
        duration:2000
      });
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something Went Wrong!",
      );
    },
  });

  return { resetPasswordMutation: mutate, isPending, error };
};

