import { motion } from "framer-motion";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

// Dummy data
const chatData = [
  {
    id: 1,
    name: "Emma Watson",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    lastMessage: "Let’s catch up later today!",
    time: "2:45 PM",
    unread: 2,
  },
  {
    id: 2,
    name: "Team Project Alpha",
    avatar:
      "https://ui-avatars.com/api/?name=Project+Alpha&background=444&color=fff",
    lastMessage: "Deadline is tomorrow morning.",
    time: "1:10 PM",
    unread: 0,
  },
  {
    id: 3,
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/14.jpg",
    lastMessage: "Cool, I’ll send the files soon.",
    time: "11:22 AM",
    unread: 4,
  },
  {
    id: 4,
    name: "Developers Group",
    avatar:
      "https://ui-avatars.com/api/?name=Dev+Group&background=555&color=fff",
    lastMessage: "Zig update is rolling out.",
    time: "Yesterday",
    unread: 0,
  },
];

export const ChatsList = () => {
  const [search, setSearch] = useState("");

  const filteredChats = chatData.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="flex flex-col bg-[#18181B] text-[#E4E6EB] md:w-[25%] w-full border-r border-[#27272A] h-screen overflow-hidden">
      {/* Header */}
      <div className="p-4.5 flex items-center justify-between border-b border-[#27272A]">
        <h2 className="text-lg font-semibold text-[#A2A970]">Chats</h2>
      </div>

      {/* Search Bar */}
      <div className="relative px-4 py-2">
        <FiSearch className="absolute left-7 top-4 text-gray-400 text-lg" />
        <input
          type="text"
          placeholder="Search chats..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-3 py-2 rounded-lg bg-[#1E1E25] text-sm text-[#E4E6EB] placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#A2A970]"
        />
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#27272A] scrollbar-track-transparent">
        {filteredChats.map((chat) => (
          <motion.div
            key={chat.id}
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between p-3 mx-2 my-1 rounded-xl hover:bg-[#22222A] cursor-pointer transition-all"
          >
            {/* Left section */}
            <div className="flex items-center gap-3">
              <img
                src={chat.avatar}
                alt={chat.name}
                className="w-12 h-12 rounded-full border border-[#27272A]"
              />
              <div>
                <h3 className="font-medium text-[#E4E6EB]">{chat.name}</h3>
                <p className="text-sm text-gray-400 truncate w-[140px] md:w-[180px]">
                  {chat.lastMessage}
                </p>
              </div>
            </div>

            {/* Right section (Time + Unread badge) */}
            <div className="flex flex-col items-end justify-between h-12">
              <span className="text-xs text-gray-400">{chat.time}</span>
              {chat.unread > 0 && (
                <div className="bg-[#A2A970] text-[#11111b] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mt-1">
                  {chat.unread}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
