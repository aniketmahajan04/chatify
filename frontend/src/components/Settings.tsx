// import { Bell, LogOut, Palette, Shield, User } from "lucide-react";

// export const Settings = ({ onLogout }: { onLogout: () => void }) => {
//   return (
//     <div className="flex flex-col flex-1 bg-[#1E1E20] text-gray-100">
//       {/* Header */}
//       <div className="p-4 border-b border-[#27272A]">
//         <h2 className="text-xl font-semibold">Settings</h2>
//       </div>

//       {/* Settings Options */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         <div className="flex items-center justify-between p-3 bg-[#2A2A2E] rounded-xl hover:bg-[#333338] cursor-pointer">
//           <div className="flex items-center space-x-3">
//             <User size={20} />
//             <span>Account</span>
//           </div>
//         </div>

//         <div className="flex items-center justify-between p-3 bg-[#2A2A2E] rounded-xl hover:bg-[#333338] cursor-pointer">
//           <div className="flex items-center space-x-3">
//             <Bell size={20} />
//             <span>Notifications</span>
//           </div>
//         </div>

//         <div className="flex items-center justify-between p-3 bg-[#2A2A2E] rounded-xl hover:bg-[#333338] cursor-pointer">
//           <div className="flex items-center space-x-3">
//             <Palette size={20} />
//             <span>Appearance</span>
//           </div>
//         </div>

//         <div className="flex items-center justify-between p-3 bg-[#2A2A2E] rounded-xl hover:bg-[#333338] cursor-pointer">
//           <div className="flex items-center space-x-3">
//             <Shield size={20} />
//             <span>Privacy & Security</span>
//           </div>
//         </div>
//       </div>

//       {/* Logout Button */}
//       <div className="p-4 border-t border-[#27272A]">
//         <button
//           onClick={onLogout}
//           className="flex items-center justify-center w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl transition"
//         >
//           <LogOut size={20} className="mr-2" />
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

import { motion } from "framer-motion";

type Props = {
  onClose: () => void;
  onLogout: () => void;
};

export const Settings = ({ onClose, onLogout }: Props) => {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 80, damping: 20 }}
      className="fixed md:absolute top-0 right-0 h-screen w-full md:w-[400px] bg-[#1A1A24] text-[#E4E6EB] border-l border-[#27272A] shadow-lg z-50 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#27272A]">
        <h2 className="text-xl font-semibold">Settings ⚙️</h2>
        <button
          onClick={onClose}
          className="text-sm text-gray-400 hover:text-[#A2A970] transition"
        >
          Close ✕
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <section>
          <h3 className="text-lg font-medium mb-2">Account</h3>
          <div className="flex flex-col gap-3">
            <label className="flex flex-col">
              <span className="text-sm text-gray-400 mb-1">Username</span>
              <input
                type="text"
                defaultValue="aniket_mahajan"
                className="bg-[#202020] rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-[#A2A970]"
              />
            </label>

            <label className="flex flex-col">
              <span className="text-sm text-gray-400 mb-1">Email</span>
              <input
                type="email"
                defaultValue="aniket@example.com"
                className="bg-[#202020] rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-[#A2A970]"
              />
            </label>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-medium mb-2">Preferences</h3>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span>Dark Mode</span>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
            <div className="flex justify-between items-center">
              <span>Notifications</span>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[#27272A]">
        <button
          onClick={onLogout}
          className="w-full bg-[#A2A970] hover:bg-[#8b935a] text-[#11111b] py-2 rounded-lg font-medium transition"
        >
          Logout
        </button>
      </div>
    </motion.div>
  );
};
