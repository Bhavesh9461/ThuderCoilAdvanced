import { motion } from "framer-motion";
import { MessageCircle, MessageCircleOff } from "lucide-react";
import React from "react";
import { useSelectedUser } from "../store/useSelectedUser.js";


const ChatPage = ({ isBlurred, setIsBlurred }) => {

    const {selectedUser} = useSelectedUser()
    console.log(selectedUser);
    

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative border hidden md:flex border-base-300 rounded-2xl shadow-xl bg-base-200 flex-1 flex flex-col overflow-hidden"
    >
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
                <img src={selectedUser.profilePic} />
              </div>
            </div>
            <div>
              <h3 className="font-semibold">{selectedUser.userName}</h3>
              <p className="text-xs opacity-70">{selectedUser.fullName}</p>
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
    </motion.div>
  );
};

export default ChatPage;
