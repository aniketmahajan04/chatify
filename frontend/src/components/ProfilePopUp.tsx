import { motion } from "framer-motion";
import { IoCallOutline, IoVideocamOutline } from "react-icons/io5";

interface ProfilePopupProps {
  user: {
    name: string;
    avatar: string;
    status: string;
    lastSeen: string;
  };
  onClose: () => void;
}

export const ProfilePopup = ({ user, onClose }: ProfilePopupProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="absolute z-50 bg-[#1E1E2E] text-[#E4E6EB] p-4 rounded-xl shadow-lg border border-[#2A2A3C] w-64 right-4 top-16"
    >
      <div className="flex flex-col items-center gap-3">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-full border border-[#333]"
        />
        <div className="text-center">
          <h3 className="text-lg font-semibold">{user.name}</h3>
          <p className="text-sm text-gray-400">{user.status}</p>
          <p className="text-xs text-gray-500 mt-1">
            Last seen {user.lastSeen}
          </p>
        </div>

        <div className="flex gap-6 mt-3">
          <button className="text-xl hover:text-green-400 transition-colors">
            <IoCallOutline />
          </button>
          <button className="text-xl hover:text-blue-400 transition-colors">
            <IoVideocamOutline />
          </button>
        </div>
      </div>

      {/* Close button (for mobile use) */}
      <button
        onClick={onClose}
        className="absolute top-2 right-3 text-gray-400 hover:text-white text-sm"
      >
        ✕
      </button>
    </motion.div>
  );
};
