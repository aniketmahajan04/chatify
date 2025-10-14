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
    <aside className="flex flex-col justify-between items-center bg-[#11111b] text-[#E4E6EB] md:w-20 w-full md:h-screen h-16 p-2 md:p-0 fixed md:static bottom-0 left-0">
      {/* Logo */}
      <div className="hidden md:flex flex-col items-center py-4 gap-3 text-lg font-semibold tracking-wide">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className=" font-bold tracking-wide text-[#cccccc]"
        >
          Chatify
        </motion.h2>

        {/* Navigation Icons */}
        <nav className="flex flex-col gap-6 mt-10">
          {menu.map((item) => (
            <button
              key={item.id}
              title={item.label}
              className="text-2xl hover:text-accent transition-colors duration-200"
            >
              {item.icon}
            </button>
          ))}
        </nav>
      </div>
      {/* Profile Avatar */}
      <div className="flex flex-col items-center gap-6">
        <div className="border-b-1 border-[#cccccc] pb-2">
          <nav>
            <button className="text-2xl hover:text-accent transition-colors duration-200">
              <AiOutlineSetting />
            </button>
          </nav>
        </div>
        <img
          src="https://randomuser.me/api/portraits/men/75.jpg"
          alt="User Avatar"
          className="w-10 h-10 rounded-full border border-[#27272A] hover:border-accent transition-all"
        />
      </div>
    </aside>
  );
};
