import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";
import { useState } from "react";

type User = {
  id: number;
  name: string;
  avatar: string;
  bio?: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user: { id: string; name: string; avatar?: string; bio: string }[];
  onSelectUser: (user: User) => void;
};

const dummyUsers: User[] = [
  {
    id: 1,
    name: "Emma Watson",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    bio: "Frontend Dev",
  },
  {
    id: 2,
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/14.jpg",
    bio: "Backend Engineer",
  },
  {
    id: 3,
    name: "Ava Smith",
    avatar: "https://randomuser.me/api/portraits/women/21.jpg",
    bio: "UI/UX Designer",
  },
  {
    id: 4,
    name: "Mike Brown",
    avatar: "https://randomuser.me/api/portraits/men/33.jpg",
    bio: "Fullstack Dev",
  },
  {
    id: 5,
    name: "Sophia Patel",
    avatar: "https://randomuser.me/api/portraits/women/25.jpg",
    bio: "Product Manager",
  },
];

export const UserListDrawer = ({ isOpen, onClose, onSelectUser }: Props) => {
  const [search, setSearch] = useState("");

  const filteredUsers = dummyUsers.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-end z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:w-[380px] h-full bg-[#18181B] border-l border-[#27272A] flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-[#27272A]">
              <h2 className="text-lg font-semibold text-[#A2A970]">New Chat</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-[#2A2A35] transition"
              >
                <FiX className="text-[#E4E6EB]" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative px-4 py-3">
              <FiSearch className="absolute left-7 top-5 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-lg bg-[#1E1E25] text-sm text-[#E4E6EB]
                  placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#A2A970]"
              />
            </div>

            {/* User List */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#27272A] scrollbar-track-transparent px-3 pb-4">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <motion.div
                    key={user.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => onSelectUser(user)}
                    className="flex items-center gap-3 p-3 rounded-xl cursor-pointer hover:bg-[#22222A] transition-all"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full border border-[#27272A]"
                    />
                    <div>
                      <h3 className="font-medium text-[#E4E6EB]">
                        {user.name}
                      </h3>
                      <p className="text-sm text-gray-400">{user.bio}</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-500 text-center mt-10">
                  No users found
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
