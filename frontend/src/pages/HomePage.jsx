import React, { useEffect, useState } from "react";
import { sendFriendReqs } from "../lib/api.js";
import FriendCard from "../components/FriendCard.jsx";
import NoFriendsFound from "../components/NoFriendsFound.jsx";
import {
  useGetUserFriends,
  useOutgoingFriendReqs,
  useSearchUsers,
  useSendFriendReqs,
} from "../hooks/useFriendRequests.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MessageCircle, MessageCircleOff, MessageSquare, MessagesSquare } from "lucide-react";

const HomePage = () => {
  const [userName, setUserName] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());
  const [pendingRequestId, setPendingRequestId] = useState(null);
  const [friendsIds, setFriendsIds] = useState(new Set());
  const [isBlurred, setIsBlurred] = useState(false);

  const { friends, loadingFriends } = useGetUserFriends();
  const { outgoingFriendReqs } = useOutgoingFriendReqs();

  useEffect(() => {
    const ids = new Set();
    if (friends?.length) {
      friends.forEach((friend) => {
        ids.add(friend._id);
      });
    }
    setFriendsIds(ids);
  }, [friends]);

  // 🔥 Debounce input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(userName);
    }, 500);

    return () => clearTimeout(timer);
  }, [userName]);

  // 🔍 Search hook (clean)
  const {
    data: searchedUsers = [],
    isLoading: isSearching,
    error: searchError,
  } = useSearchUsers(debouncedValue);

  const queryClient = useQueryClient();
  const {
    mutate: sendRequestMutation,
    isPending: sendPending,
    error: sendError,
  } = useMutation({
    mutationKey: ["sendRequest"],
    mutationFn: sendFriendReqs,
    onMutate: async (userId) => {
      setPendingRequestId(userId);
      setOutgoingRequestsIds((prev) => {
        const updated = new Set(prev);
        updated.add(userId);
        return updated;
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] });
    },
    onSettled: () => {
      setPendingRequestId(null);
    },
  });

  // 🔥 Track already sent requests
  useEffect(() => {
    const ids = new Set();
    if (outgoingFriendReqs?.length) {
      outgoingFriendReqs.forEach((req) => {
        ids.add(req.recipient._id);
      });
    }
    setOutgoingRequestsIds(ids);
  }, [outgoingFriendReqs]);

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col md:flex-row p-10 gap-8 justify-between bg-base-100">
      {/* 🔥 LEFT SIDEBAR */}
      <div className="w-80 flex flex-col gap-4">
        {/* 🔥 FRIENDS + SEARCH */}
        <div className="h-[60%] rounded-2xl shadow-xl border border-base-300 bg-base-200 flex flex-col">
          {/* 🔍 SEARCH */}
          <div className="p-4 border-b border-base-300">
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="Search friends..."
              className="input input-bordered w-full"
            />

            {/* Loading */}
            {isSearching && <p className="text-sm mt-2">Searching...</p>}

            {/* Error */}
            {searchError && (
              <p className="text-red-500 text-sm mt-2">
                {searchError.message || "Search failed"}
              </p>
            )}
          </div>

          {/* 🔥 LIST */}
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {/* 👉 SHOW SEARCH RESULTS */}
            {debouncedValue ? (
              searchedUsers.length === 0 ? (
                <p className="text-center text-sm opacity-70">No users found</p>
              ) : (
                searchedUsers.map((user) => {
                  if (!user?._id) return null;

                  const alreadySent = outgoingRequestsIds.has(user._id);
                  const isFriend = friendsIds.has(user._id);
                  const isThisSending = pendingRequestId === user._id;

                  return (
                    <div
                      key={user._id}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-base-300"
                    >
                      <FriendCard friend={user} />

                      {/* 🔥 CONDITION */}
                      {!isFriend ? (
                        <button
                          disabled={alreadySent || isThisSending}
                          onClick={() => sendRequestMutation(user._id)}
                          className="btn btn-xs btn-primary"
                        >
                          {alreadySent
                            ? "Sent"
                            : isThisSending
                              ? "Sending..."
                              : "Add"}
                        </button>
                      ) : (
                        <button className="btn btn-ghost btn-circle">
                          <MessagesSquare className="h-4 w-4  sm:h-6 sm:w-6 text-base-content opacity-70" />
                        </button>
                      )}
                    </div>
                  );
                })
              )
            ) : loadingFriends ? (
              <div className="flex justify-center py-14">
                <span className="loading loading-spinner loading-lg" />
              </div>
            ) : friends.length === 0 ? (
              <NoFriendsFound />
            ) : (
              friends.map((friend) => (
                <FriendCard
                  key={friend._id}
                  icon={MessagesSquare}
                  friend={friend}
                />
              ))
            )}

            {/* Send Request Error */}
            {sendError && (
              <p className="text-red-500 text-sm mt-2">
                {sendError?.response?.data?.message ||
                  sendError.message ||
                  "Request failed"}
              </p>
            )}
          </div>
        </div>

        {/* 🔔 NOTIFICATIONS */}
        <div className="h-[40%] rounded-2xl shadow-xl border border-base-300 bg-base-200 flex flex-col">
          <div className="p-4 border-b border-base-300 font-semibold">
            Notifications
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-base-300 cursor-pointer"
              >
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <img src="https://api.dicebear.com/9.x/toon-head/svg?seed=notif" />
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium">New friend request</p>
                  <p className="text-xs opacity-70">2 min ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🔥 RIGHT SIDE CHAT */}
      <div className="relative border hidden md:flex border-base-300 rounded-2xl shadow-xl bg-base-200 flex-1 flex flex-col overflow-hidden">
        {/* 🔥 BLUR OVERLAY */}
        {isBlurred && (
          <div className="absolute inset-0 z-10 backdrop-blur-md bg-black/30 transition-all duration-300 pointer-events-none" />
        )}

        {/* 🔥 HEADER (ALWAYS CLICKABLE) */}
        <button
            className="btn btn-sm border shadow-lg w-32 bg-base-100 absolute right-6 top-4 z-20 transition-all duration-200"
            onClick={() => setIsBlurred((prev) => !prev)}
          >
            Toggle Blur
            {!isBlurred ? (
              <MessageCircleOff className="size-4 transition duration-200 text-base-content opacity-70" />
            ) : (
              <MessageCircle className="size-4 transition duration-200 text-base-content opacity-70" />
            )}
          </button>
        
        {/* 🔥 BODY (ONLY THIS GETS DISABLED) */}
        <div
          className={`flex flex-col flex-1 transition-all duration-300 ${
            isBlurred ? "scale-[0.98] opacity-70 pointer-events-none" : ""
          }`}
        >
          <div className="p-4 border-b border-base-300 flex justify-between items-center gap-3">
          <div className="flex gap-3 items-center">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src="https://api.dicebear.com/9.x/toon-head/svg?seed=Kimberly" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold">John Doe</h3>
              <p className="text-xs opacity-70">Online</p>
            </div>
          </div>
        </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            <div className="chat chat-start">
              <div className="chat-bubble">Hello 👋</div>
            </div>

            <div className="chat chat-end">
              <div className="chat-bubble chat-bubble-primary">Hi bro 😄</div>
            </div>
          </div>

          <div className="p-4 border-t border-base-300 flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="input input-bordered flex-1"
            />
            <button className="btn btn-primary">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
