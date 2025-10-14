import { motion } from "framer-motion";
import {
  AiOutlineHome,
  AiOutlinePhone,
  AiOutlineSetting,
} from "react-icons/ai";
import { PiChatsCircle } from "react-icons/pi";

export const SideBar = () => {
  const menu = [
    { id: 1, icon: <AiOutlineHome />, label: "Home" },
    { id: 2, icon: <PiChatsCircle />, label: "Chats" },
    { id: 3, icon: <AiOutlinePhone />, label: "Calls" },
  ];

  return (
    <aside className="flex md:flex-col justify-between items-center md:bg-[#11111b] text-[#E4E6EB] md:w-20 w-full md:h-screen h-16 p-2 md:p-0 fixed md:static bottom-0 left-0 z-50">
      {/* ===== Desktop Sidebar ===== */}
      <div className="hidden md:flex flex-col justify-between h-full items-center py-4">
        {/* Logo */}
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-lg font-bold tracking-wide text-[#cccccc]"
        >
          Chatify
        </motion.h2>

        {/* Menu Icons */}
        <nav className="flex flex-col gap-8 mt-10">
          {menu.map((item) => (
            <button
              key={item.id}
              title={item.label}
              className="text-2xl hover:text-[#A2A970] transition-colors duration-200"
            >
              {item.icon}
            </button>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="flex flex-col items-center gap-6 mt-auto mb-4">
          <button className="text-2xl hover:text-[#A2A970] transition-colors duration-200">
            <AiOutlineSetting />
          </button>
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="User Avatar"
            className="w-10 h-10 rounded-full border border-[#27272A] hover:border-[#A2A970] transition-all"
          />
        </div>
      </div>

      {/* ===== Mobile Bottom Navigation ===== */}
      <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 bg-[#1A1A24]/90 backdrop-blur-md w-[90%] max-w-sm rounded-full flex justify-around items-center py-3 px-4 shadow-lg border border-[#2A2A35]">
        {menu.map((item) => (
          <button
            key={item.id}
            title={item.label}
            className="text-2xl text-[#E4E6EB] hover:text-[#A2A970] transition-colors duration-200"
          >
            {item.icon}
          </button>
        ))}
        <button
          title="Settings"
          className="text-2xl text-[#E4E6EB] hover:text-[#A2A970] transition-colors duration-200"
        >
          <AiOutlineSetting />
        </button>
      </div>
    </aside>
  );
};
