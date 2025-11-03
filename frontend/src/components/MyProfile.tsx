import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  onClose: () => void;
  user: {
    name: string;
    email: string;
    bio?: string;
    avatar?: string;
  };
  onUpdate: (updatedUser: any) => void;
};

export const MyProfile = ({ onClose, user, onUpdate }: Props) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio || "");
  const [avatar, setAvatar] = useState(user.avatar || "");

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setBio(user.bio || "");
    setAvatar(user.avatar || "");
  }, [user]); // depend on user prop

  const handleUpdate = () => {
    onUpdate({ name, email, bio, avatar });
    onClose();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = URL.createObjectURL(e.target.files[0]);
      setAvatar(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="fixed md:absolute top-0 right-0 h-screen w-full md:w-[400px]
      bg-[#1A1A24] text-[#E4E6EB] border-l border-[#27272A] shadow-lg z-50 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#27272A]">
        <h2 className="text-xl font-semibold">My Profile</h2>
        <button
          onClick={onClose}
          className="text-sm text-gray-400 hover:text-[#A2A970] transition"
        >
          ✕
        </button>
      </div>

      {/* Profile Info */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Avatar */}
        <div className="flex flex-col items-center space-y-3">
          <div className="relative">
            <img
              src={
                avatar
                // "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0iIzY2NjY2NiIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+PC90ZXh0Pgo8L3N2Zz4="
              }
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover"
            />
            <label className="absolute bottom-0 right-0 bg-[#A2A970] p-1 rounded-full cursor-pointer">
              <Camera size={16} className="text-black" />
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
          </div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-gray-400 text-sm">{email}</p>
        </div>

        {/* Editable Fields */}
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#202020] rounded-lg px-3 py-2 mt-1 outline-none focus:ring-1 focus:ring-[#A2A970]"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#202020] rounded-lg px-3 py-2 mt-1 outline-none focus:ring-1 focus:ring-[#A2A970]"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-[#202020] rounded-lg px-3 py-2 mt-1 outline-none focus:ring-1 focus:ring-[#A2A970] h-20"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[#27272A]">
        <button
          onClick={handleUpdate}
          className="w-full bg-[#A2A970] hover:bg-[#8b935a] text-[#11111b] py-2 rounded-lg font-medium transition"
        >
          Update Profile
        </button>
      </div>
    </motion.div>
  );
};
