// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { MyProfile } from "./MyProfile";
// import { User, Settings as SettingsIcon } from "lucide-react";
//
// export const Settings = () => {
//     const [showProfile, setShowProfile] = useState(false);
//
//     const user = {
//         name: "Aniket Mahajan",
//         email: "aniket@example.com",
//         bio: "Full-stack dev learning Zig ⚡",
//         avatar: "",
//     };
//
//     const handleProfileUpdate = (updatedUser: any) => {
//         console.log("Updated user:", updatedUser);
//     };
//
//     return (
//         <div className="h-full w-full bg-[#11111b] text-[#E4E6EB] p-5 relative">
//             {/* Header */}
//             <div className="flex items-center justify-between mb-6">
//                 <div className="flex items-center gap-2">
//                     <SettingsIcon className="text-[#A2A970]" size={22} />
//                     <h2 className="text-xl font-semibold">Settings</h2>
//                 </div>
//
//                 {/* Profile button (mobile only) */}
//                 <button
//                     onClick={() => setShowProfile(true)}
//                     className="md:hidden bg-[#A2A970] text-[#11111b] px-3 py-1.5 rounded-lg font-medium hover:bg-[#8b935a] flex items-center gap-1 transition"
//                 >
//                     <User size={16} /> My Profile
//                 </button>
//             </div>
//
//             {/* Settings content */}
//             <div className="space-y-5">
//                 <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.1 }}
//                     className="bg-[#1A1A24]/60 backdrop-blur-lg rounded-2xl p-5 border border-[#2B2B36]"
//                 >
//                     <h3 className="text-lg font-semibold mb-3">General</h3>
//                     <p className="text-gray-400 text-sm">
//                         Manage preferences, themes, and account settings.
//                         On desktop, your profile appears in a side panel.
//                         On mobile, tap the **My Profile** button above.
//                     </p>
//                 </motion.div>
//
//                 <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.2 }}
//                     className="bg-[#1A1A24]/60 backdrop-blur-lg rounded-2xl p-5 border border-[#2B2B36]"
//                 >
//                     <h3 className="text-lg font-semibold mb-3">Notifications</h3>
//                     <p className="text-gray-400 text-sm">
//                         Customize how you receive alerts and updates.
//                     </p>
//                 </motion.div>
//             </div>
//
//             {/* Profile Drawer */}
//             <AnimatePresence>
//                 {showProfile && (
//                     <>
//                         {/* Background blur overlay */}
//                         <motion.div
//                             className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             exit={{ opacity: 0 }}
//                             onClick={() => setShowProfile(false)}
//                         />
//
//                         {/* Slide-up drawer on mobile, side panel on desktop */}
//                         <MyProfile
//                             onClose={() => setShowProfile(false)}
//                             user={user}
//                             onUpdate={handleProfileUpdate}
//                         />
//                     </>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// };

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { MyProfile } from "./MyProfile";
// import { User, Settings as SettingsIcon, ArrowLeft } from "lucide-react";
//
// export const Settings = ({ onClose }: { onClose: () => void }) => {
//     const [showProfile, setShowProfile] = useState(false);
//
//     const user = {
//         name: "Aniket Mahajan",
//         email: "aniket@example.com",
//         bio: "Full-stack dev learning Zig ⚡",
//         avatar: "",
//     };
//
//     const handleProfileUpdate = (updatedUser: any) => {
//         console.log("Updated user:", updatedUser);
//     };
//
//     return (
//         <div className="h-full w-full bg-[#11111b] text-[#E4E6EB] p-5 relative">
//             {/* Header */}
//             <div className="flex items-center justify-between mb-6">
//                 <div className="flex items-center gap-3">
//                     {/* Back button */}
//                     <button
//                         onClick={onClose}
//                         className="flex items-center gap-1 text-gray-400 hover:text-[#A2A970] transition"
//                     >
//                         <ArrowLeft size={20} />
//                     </button>
//
//                     <SettingsIcon className="text-[#A2A970]" size={22} />
//                     <h2 className="text-xl font-semibold">Settings</h2>
//                 </div>
//
//                 {/* Profile button (mobile only) */}
//                 <button
//                     onClick={() => setShowProfile(true)}
//                     className="md:hidden bg-[#A2A970] text-[#11111b] px-3 py-1.5 rounded-lg font-medium hover:bg-[#8b935a] flex items-center gap-1 transition"
//                 >
//                     <User size={16} /> My Profile
//                 </button>
//             </div>
//
//             {/* Settings content */}
//             <div className="space-y-5">
//                 <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.1 }}
//                     className="bg-[#1A1A24]/60 backdrop-blur-lg rounded-2xl p-5 border border-[#2B2B36]"
//                 >
//                     <h3 className="text-lg font-semibold mb-3">General</h3>
//                     <p className="text-gray-400 text-sm">
//                         Manage preferences, themes, and account settings.
//                         On desktop, your profile appears in a side panel.
//                         On mobile, tap the **My Profile** button above.
//                     </p>
//                 </motion.div>
//
//                 <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.2 }}
//                     className="bg-[#1A1A24]/60 backdrop-blur-lg rounded-2xl p-5 border border-[#2B2B36]"
//                 >
//                     <h3 className="text-lg font-semibold mb-3">Notifications</h3>
//                     <p className="text-gray-400 text-sm">
//                         Customize how you receive alerts and updates.
//                     </p>
//                 </motion.div>
//             </div>
//
//             {/* Profile Drawer */}
//             <AnimatePresence>
//                 {showProfile && (
//                     <>
//                         {/* Background blur overlay */}
//                         <motion.div
//                             className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             exit={{ opacity: 0 }}
//                             onClick={() => setShowProfile(false)}
//                         />
//
//                         {/* Slide-up drawer on mobile, side panel on desktop */}
//                         <MyProfile
//                             onClose={() => setShowProfile(false)}
//                             user={user}
//                             onUpdate={handleProfileUpdate}
//                         />
//                     </>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// };

import { motion } from "framer-motion";
import { ArrowLeft, Bell, LogOut, Palette, Shield, User } from "lucide-react";
import { useState } from "react";
import { MyProfile } from "./MyProfile";

type Props = {
  onClose: () => void;
  onLogout: () => void;
};

export const Settings = ({ onClose, onLogout }: Props) => {
  const [showProfile, setShowProfile] = useState(false);

  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Hey there! I'm using Chatify 🚀",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  });

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 80, damping: 20 }}
      className="fixed md:absolute top-0 right-0 h-screen w-full md:w-[400px]
       bg-[#1A1A24] text-[#E4E6EB] border-l border-[#27272A] shadow-lg z-50 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#27272A]">
        <button
          onClick={onClose}
          className="flex items-center gap-1 text-gray-400 hover:text-[#A2A970] transition"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-semibold">Settings</h2>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Account */}
        <section className="space-y-3">
          <h3 className="text-lg font-medium">Account</h3>
          {/* Profile button (mobile only) */}
          <button
            onClick={() => setShowProfile(true)}
            className="md:hidden bg-[#A2A970] text-[#11111b] px-3 py-1.5 rounded-lg font-medium 
            hover:bg-[#8b935a] flex items-center gap-1 transition"
          >
            <User size={16} /> My Profile
          </button>
        </section>

        {/* Notifications */}
        <section className="space-y-3">
          <h3 className="text-lg font-medium">Notifications</h3>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center p-3 bg-[#2A2A2E] rounded-xl hover:bg-[#333338]">
              <div className="flex items-center gap-3">
                <Bell size={20} />
                <span>Enable Notifications</span>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
          </div>
        </section>

        {/* Appearance */}
        <section className="space-y-3">
          <h3 className="text-lg font-medium">Appearance</h3>
          <div className="flex justify-between items-center p-3 bg-[#2A2A2E] rounded-xl hover:bg-[#333338]">
            <div className="flex items-center gap-3">
              <Palette size={20} />
              <span>Dark Mode</span>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>
        </section>

        {/* Privacy & Security */}
        <section className="space-y-3">
          <h3 className="text-lg font-medium">Privacy & Security</h3>
          <div className="flex justify-between items-center p-3 bg-[#2A2A2E] rounded-xl hover:bg-[#333338]">
            <div className="flex items-center gap-3">
              <Shield size={20} />
              <span>Secure Account</span>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5" />
          </div>
        </section>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-[#27272A]">
        <button
          onClick={onLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl font-medium transition"
        >
          <LogOut size={20} className="inline mr-2" />
          Logout
        </button>
      </div>

      {showProfile && (
        <MyProfile
          onClose={() => setShowProfile(false)}
          user={user}
          onUpdate={(updatedUser) => setUser(updatedUser)}
        />
      )}
    </motion.div>
  );
};
