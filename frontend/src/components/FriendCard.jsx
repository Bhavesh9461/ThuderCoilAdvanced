import { MessageCircle, MessagesSquare } from "lucide-react";
import React from "react";

const FriendCard = ({ friend, icon:Icon }) => {
  return (
    <div className="flex items-center justify-between gap-3 p-2 rounded-lg hover:bg-base-300 cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="avatar">
          <div className="w-7 sm:w-10 rounded-full border border-base-300">
            <img src={friend.profilePic} />
          </div>
        </div>

        <div>
          <h3 className="font-medium">{friend.userName}</h3>
          <p className="text-xs opacity-70">{friend.skill}</p>
        </div>
      </div>

      {/* Message Button */}
      {Icon && (
        <button className="btn btn-ghost btn-circle">
        <Icon className="h-4 w-4  sm:h-6 sm:w-6 text-base-content opacity-70" />
      </button>
      )}
    </div>
  );
};

export default FriendCard;
