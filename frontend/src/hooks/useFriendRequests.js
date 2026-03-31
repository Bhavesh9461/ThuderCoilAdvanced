import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  acceptFriendRequest,
  getFriendRequests,
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  searchUser,
  sendFriendReqs,
} from "../lib/api.js";

export const useGetUserFriends = () => {
  const { data: friends = [], isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  return { friends, loadingFriends: isLoading };
};

export const useOutgoingFriendReqs = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  return {
    outgoingFriendReqs: data?.data || data || [],
    ...rest,
  };
};

export const useSendFriendReqs = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["sendRequest"],
    mutationFn: sendFriendReqs,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] });
    },
  });

  return { sendRequestMutation: mutate, isPending, error };
};

export const useSearchUsers = (searchTerm) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["searchUsers", searchTerm],
    queryFn: () => searchUser({ userName: searchTerm }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    enabled: !!searchTerm, // only run when value exists
    staleTime: 1000 * 60, // optional: cache for 1 min
  });
};

export const useGetFriendRequests = () => {
  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  return { friendRequests, isLoading };
};

export const useAcceptFriendRequest = () => {
  const queryClient = useQueryClient();

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationKey: ["acceptRequest"],
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  return { acceptRequestMutation, isPending };
};

export const useGetRecommendedUsers = () => {
  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  return { recommendedUsers, loadingUsers };
};
