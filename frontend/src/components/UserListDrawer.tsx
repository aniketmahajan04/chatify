import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";

interface UserListDrawerProp {
  isOpen: boolean;
  users: { id: number; name: string; avatar: string; bio: string }[];
  onClose: () => void;
  onUserSelect: (user: any) => void;
}

export const UserListDrawer = ({
  isOpen,
  users,
  onClose,
  onUserSelect,
}: UserListDrawerProp) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
          className="fixed inset-0 md:inset-y-0 md:right-0 md:w-[400px]
                     bg-[#11111b] text-white border-l border-[#27272A]
                     z-50 flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-[#27272A] bg-[#18181B]/60 backdrop-blur">
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#2A2A35] rounded-full transition"
            >
              <FiArrowLeft size={20} />
            </button>
            <h2 className="text-lg font-semibold text-[#E4E6EB]">
              Start New Chat
            </h2>
          </div>

          {/* Search Bar */}
          <div className="px-4 py-3 border-b border-[#27272A]">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full px-3 py-2 rounded-lg bg-[#1E1E25]
                         text-sm text-[#E4E6EB] placeholder-gray-500
                         focus:outline-none focus:ring-1 focus:ring-[#A2A970]
                         transition"
            />
          </div>

          {/* User List */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#27272A] scrollbar-track-transparent">
            {users.map((user) => (
              <motion.div
                key={user.id}
                whileHover={{ scale: 1.01 }}
                onClick={() => onUserSelect(user)}
                className="flex items-center gap-3 p-4 hover:bg-[#1E1E25]
                           cursor-pointer transition-all border-b border-[#18181B]/40"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full border border-[#27272A]"
                />
                <div>
                  <h3 className="font-medium text-[#E4E6EB]">{user.name}</h3>
                  {/* <p className="text-sm text-gray-400">{user.email}</p> */}
                </div>
              </motion.div>
            ))}

            {users.length === 0 && (
              <p className="text-gray-500 text-center mt-10">No users found</p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
