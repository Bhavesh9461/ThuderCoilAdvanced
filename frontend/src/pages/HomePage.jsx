import React from "react";

const HomePage = () => {
  const dummyFriends = [1, 2, 3, 4, 5];

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col md:flex-row p-10 gap-8 justify-between bg-base-100">
      
      {/* 🔥 LEFT SIDEBAR (Friends + Search) */}
      <div className="w-80 flex flex-col gap-4">
  
  {/* 🔥 FRIENDS CARD */}
  <div className="h-[60%] rounded-2xl shadow-xl border border-base-300 bg-base-200 flex flex-col">
    
    {/* SEARCH BAR */}
    <div className="p-4 border-b border-base-300">
      <input
        type="text"
        placeholder="Search friends..."
        className="input input-bordered w-full"
      />
    </div>

    {/* FRIEND LIST */}
    <div className="flex-1 overflow-y-auto p-2 space-y-2">
      {dummyFriends.map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-base-300 cursor-pointer"
        >
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src="https://api.dicebear.com/9.x/toon-head/svg?seed=Kimberly" />
            </div>
          </div>

          <div>
            <h3 className="font-medium">John Doe</h3>
            <p className="text-xs opacity-70">Online</p>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* 🔥 NOTIFICATIONS CARD */}
  <div className="h-[40%] rounded-2xl shadow-xl border border-base-300 bg-base-200 flex flex-col">
    
    {/* HEADER */}
    <div className="p-4 border-b border-base-300 font-semibold">
      Notifications
    </div>

    {/* NOTIFICATION LIST */}
    <div className="flex-1 overflow-y-auto p-2 space-y-2">
      {[1,2,3].map((_, index) => (
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

      {/* 🔥 RIGHT SIDE (Chat Box) */}
      <div className="border hidden md:flex border-base-300 rounded-2xl shadow-xl bg-base-200 flex-1 flex flex-col">
        
        {/* CHAT HEADER */}
        <div className="p-4 border-b border-base-300 flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src="https://api.dicebear.com/9.x/toon-head/svg?seed=Kimberly" alt="user" />
            </div>
          </div>
          <div>
            <h3 className="font-semibold">John Doe</h3>
            <p className="text-xs opacity-70">Online</p>
          </div>
        </div>

        {/* MESSAGES AREA */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          
          {/* MESSAGE (LEFT) */}
          <div className="chat chat-start">
            <div className="chat-bubble">Hello 👋</div>
          </div>

          {/* MESSAGE (RIGHT) */}
          <div className="chat chat-end">
            <div className="chat-bubble chat-bubble-primary">
              Hi bro 😄
            </div>
          </div>

        </div>

        {/* INPUT BOX */}
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
  );
};

export default HomePage;