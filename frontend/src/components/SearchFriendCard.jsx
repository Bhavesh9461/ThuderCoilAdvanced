import { Link, useNavigate } from "react-router";
import { useChatOpen } from "../store/useChatOpen.js";
import { useOpenChatOnly } from "../store/useOpenChatOnly.js";
import { useSelectedUser } from "../store/useSelectedUser.js";

const SearchFriendCard = ({ user, icon: Icon, isFriend }) => {
  const { openChat, setOpenChat } = useChatOpen();
  const { selectedUser, setSelectedUser } = useSelectedUser();
  const { openChatOnly, setOpenChatOnly } = useOpenChatOnly();

  const handleClick = () => {
    setSelectedUser(user);
    setOpenChatOnly(true);
  };

  return (
    <div
      onClick={() => {
        isFriend ? (handleClick()) : ""
      }}
      className="flex items-center justify-between w-full gap-3 p-2 rounded-lg hover:bg-base-300 cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div className="avatar">
          <div className="w-7 sm:w-10 rounded-full border border-base-300">
            <img src={user.profilePic} />
          </div>
        </div>

        <div>
          <h3 className="font-medium">{user.userName}</h3>
          <p className="text-xs opacity-70">{user.skill}</p>
        </div>
      </div>

      {/* Message Button */}
      {Icon && isFriend && (
        <button
          onClick={() => {
            openChat ? setOpenChat(false) : setOpenChat(true);
            setSelectedUser(user);
          }}
          className="btn btn-ghost btn-circle hidden lg:inline-flex"
        >
          <Icon className="h-4 w-4  sm:h-6 sm:w-6 text-base-content opacity-70" />
        </button>
      )}


      {isFriend && isFriend ? (
        <Link to={`/chat/${user._id}`} className="btn rounded-full lg:hidden">
          {Icon && (
            <Icon className="h-4 w-4 sm:size-5 md:size-6 text-base-content opacity-70" />
          )}
        </Link>
      ) : (
        ""
      )}
    </div>
  );
};

export default SearchFriendCard;
