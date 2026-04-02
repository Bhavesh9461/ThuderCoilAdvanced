import { motion } from "framer-motion";
import { MessageCircle, MessageCircleOff } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelectedUser } from "../store/useSelectedUser.js";
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
import { useChatBlur } from "../store/useChatBlur.js";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { selectedUser } = useSelectedUser();
  const { theme } = useThemeStore();
  const {isBlurred,setIsBlurred} = useChatBlur()

  const targetUserId = selectedUser._id;

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser, // this will run only when authUser is available
  });

  // create a connection
  useEffect(() => {
    const initChat = async () => {
      if (!tokenData?.token || !authUser) return;

      try {
        console.log("Initializing stream chat client...");

        const client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.userName,
            image: authUser.profilePic,
          },
          tokenData.token,
        );

        //create channel using own id for that channel
        const channelId = [authUser._id, targetUserId].sort().join("-");

        const currChannel = client.channel("messaging", channelId, {
          members: [authUser._id, targetUserId],
        });

        //fetch the channel state
        await currChannel.watch();

        setChatClient(client);
        setChannel(currChannel);
      } catch (error) {
        console.error("Error initializing chat:", error);
        toast.error("Could not connect to chat. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    initChat();
  }, [tokenData, authUser, targetUserId]);

  // handle video Call
  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started video call. Join me here: ${callUrl} via desktop/tablet`,
      });

      toast.success("Video Call link send successfully.");
    }
  };

  if (loading || !chatClient || !channel) return <ChatLoader />;

  // Theme Control
  const getStreamTheme = (theme) => {
    if (theme === "dark" || theme === "forest" || theme === "night") {
      return "str-chat__theme-dark";
    }
    return "str-chat__theme-light"; // light + lemonade
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative border hidden lg:flex border-base-300 rounded-2xl shadow-xl bg-base-200 flex-1 flex flex-col overflow-hidden"
    >
      {/* 🔥 BLUR OVERLAY */}
      {isBlurred && (
        <div className="absolute inset-0 z-10 backdrop-blur-md bg-black/30 transition-all duration-300 pointer-events-none" />
      )}

      {/* 🔥 HEADER (ALWAYS CLICKABLE) */}
      <button
        className="btn btn-sm border shadow-lg w-32 bg-base-100 absolute right-5 top-3 z-20 transition-all duration-200"
        onClick={() => isBlurred ? setIsBlurred(false) : setIsBlurred(true)}
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
        className={`flex flex-col flex-1 transition-all duration-300 overflow-x-hidden ${
          isBlurred ? "scale-[0.98] opacity-5 pointer-events-none" : ""
        }`}
      >
        {/* here was old component or ui/ux */}
        <Chat client={chatClient} 
        theme={getStreamTheme(theme)}
        >
          <Channel channel={channel}>
            <div className="w-full relative">
              {/* call button component */}
              <CallButton handleVideoCall={handleVideoCall} />

              {/* add channel component */}
              <Window>
                <ChannelHeader />
                <MessageList />
                <MessageInput focus />
              </Window>
            </div>
            {/* for multiple threads or multiple replies on 1 msg */}
            <Thread />
          </Channel>
        </Chat>
      </div>
    </motion.div>
  );
};

export default ChatPage;
