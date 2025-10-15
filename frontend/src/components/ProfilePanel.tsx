"use client";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

interface ProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfilePanel({ isOpen, onClose }: ProfileProps) {
  const [name, setName] = useState("Aniket Mahajan");
  const [bio, setBio] = useState(
    "Passionate about building clean and simple UIs ⚡"
  );
  const [email, setEmail] = useState("aniket@example.com");
  const [location, setLocation] = useState("Pune, India");

  const handleUpdate = () => {
    console.log({ name, bio, email, location });
    alert("✅ Profile updated successfully!");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sliding panel */}
          <motion.div
            className="fixed top-0 right-0 h-full bg-[#18181B] text-white z-50 shadow-2xl rounded-l-2xl
                       w-full sm:w-[400px] flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-neutral-800">
              <h2 className="text-lg font-semibold">Profile</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-[#2A2A35] transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Avatar Section */}
              <div className="flex flex-col items-center">
                <img
                  src="https://i.pravatar.cc/150"
                  alt="Avatar"
                  className="w-28 h-28 rounded-full mb-3 border border-[#27272A]"
                />
                <button className="text-sm text-[#A2A970] hover:underline">
                  Change Photo
                </button>
              </div>

              {/* Editable Fields */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#1E1E25] border border-[#27272A] rounded-lg px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#A2A970]"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400">About</label>
                  <textarea
                    rows={2}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full bg-[#1E1E25] border border-[#27272A] rounded-lg px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#A2A970]"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#1E1E25] border border-[#27272A] rounded-lg px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#A2A970]"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-[#1E1E25] border border-[#27272A] rounded-lg px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#A2A970]"
                  />
                </div>
              </div>
            </div>

            {/* Update Button */}
            <div className="p-4 border-t border-neutral-800">
              <button
                onClick={handleUpdate}
                className="w-full py-2 rounded-lg bg-[#A2A970] text-[#11111b] font-semibold hover:bg-[#8b935a] transition"
              >
                Update Profile
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
