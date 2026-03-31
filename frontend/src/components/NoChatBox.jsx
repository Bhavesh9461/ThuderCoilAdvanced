import { MessageCircle } from "lucide-react";
import AppLogoIncoded from "./AppLogoIncoded";
import { motion } from "framer-motion";

const NoChatBox = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative border hidden md:flex border-base-300 rounded-2xl shadow-xl bg-base-300 flex-1 flex flex-col overflow-hidden items-center justify-center select-none"
    >
      {/* APP LOGO */}
      <AppLogoIncoded />

      <div className="absolute z-20 backdrop-blur backdrop-blur-0 lg:backdrop-blur-sm flex flex-col items-center justify-center">
        {/* Icon */}
        <div className="bg-base-200 opacity-60 shadow-lg size-20 p-6 rounded-full mb-4 flex items-center justify-center">
          <MessageCircle className="size-10 text-base-content opacity-70" />
        </div>

        {/* Message */}
        <h2 className="text-xl font-semibold mb-1">Start a Conversation</h2>
        <p className="text-sm">Tap on a chat to start messaging your friends</p>
      </div>
    </motion.div>
  );
};

export default NoChatBox;
