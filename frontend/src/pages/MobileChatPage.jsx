import { motion } from "framer-motion";
import { MessageCircle, MessageCircleOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import useAuthUser from "../hooks/useAuthUser.js";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api.js";
import { toast } from "react-hot-toast";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import ChatLoader from "../components/ChatLoader.jsx";
import { useThemeStore } from "../store/useThemeStore.js";
import CallButton from "../components/CallButton.jsx";
import { useParams } from "react-router";
import { useChatBlur } from "../store/useChatBlur.js";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const MobileChatPage = () => {
  const { id: targetUserId } = useParams();
  const { theme } = useThemeStore();
  const { isBlurred, setIsBlurred } = useChatBlur();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return;

      try {
        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.userName,
            image: authUser.profilePic,
          },
          tokenData.token
        );

        const channelId = [authUser._id, targetUserId].sort().join("-");

        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        await currChannel.watch();

        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.error(error);
        toast.error("Could not connect to chat.");
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, [tokenData, authUser, targetUserId]);

  const handleVideoCall = () => {
    if (!channel) return;

    const callUrl = `${window.location.origin}/call/${channel.id}`;

    channel.sendMessage({
      text: `I've started video call. Join: ${callUrl}`,
    });

    toast.success("Call link sent");
  };

  if (loading || !chatClient || !channel) return <ChatLoader />;

  const getStreamTheme = (theme) => {
    if (["dark", "forest", "night"].includes(theme)) {
      return "str-chat__theme-dark";
    }
    return "str-chat__theme-light";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="relative h-[calc(100dvh-64px)] max-h-[calc(100dvh-64px)] border border-base-300 rounded-2xl shadow-xl bg-base-200 flex flex-col overflow-hidden"
    >
      {/* Blur Overlay */}
      {isBlurred && (
        <div className="absolute inset-0 z-10 backdrop-blur-md bg-black/30 pointer-events-none" />
      )}

      {/* Toggle Button */}
      <button
        className="btn btn-sm border shadow-lg w-28 bg-base-100 absolute right-4 top-3 z-20"
        onClick={() => setIsBlurred((prev) => !prev)}
      >
        {isBlurred ? "Non-Blur" : "Blur"}
        {isBlurred ? (
          <MessageCircle className="size-4 opacity-70" />
        ) : (
          <MessageCircleOff className="size-4 opacity-70" />
        )}
      </button>

      {/* BODY */}
      <div
        className={`flex flex-col flex-1 overflow-hidden transition-all ${
          isBlurred ? "scale-[0.98] opacity-5 pointer-events-none" : ""
        }`}
      >
        <Chat client={chatClient} theme={getStreamTheme(theme)}>
          <Channel channel={channel}>
            
            {/* FULL HEIGHT FIX */}
            <div className="flex flex-col h-full w-full">

              {/* Call Button */}
              <div className="relative">
                <CallButton handleVideoCall={handleVideoCall} />
              </div>

              <Window>
                <ChannelHeader />

                {/* ✅ ONLY THIS SCROLLS */}
                <div className="flex-1 overflow-y-auto">
                  <MessageList />
                </div>

                <MessageInput focus />
              </Window>
            </div>

            <Thread />
          </Channel>
        </Chat>
      </div>
    </motion.div>
  );
};

export default MobileChatPage;