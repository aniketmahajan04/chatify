// import { motion } from "framer-motion";
// import {
//   FiPhoneIncoming,
//   FiPhoneMissed,
//   FiPhoneOutgoing,
// } from "react-icons/fi";

// type Call = {
//   id: number;
//   name: string;
//   avatar: string;
//   type: "audio" | "video";
//   status: "incoming" | "outgoing" | "missed";
//   time: string;
// };

// const callsData: Call[] = [
//   {
//     id: 1,
//     name: "Emma Watson",
//     avatar: "https://randomuser.me/api/portraits/women/12.jpg",
//     type: "video",
//     status: "incoming",
//     time: "2:35 PM",
//   },
//   {
//     id: 2,
//     name: "John Doe",
//     avatar: "https://randomuser.me/api/portraits/men/32.jpg",
//     type: "audio",
//     status: "missed",
//     time: "11:15 AM",
//   },
//   {
//     id: 3,
//     name: "Sophie Turner",
//     avatar: "https://randomuser.me/api/portraits/women/29.jpg",
//     type: "audio",
//     status: "outgoing",
//     time: "Yesterday",
//   },
//   {
//     id: 4,
//     name: "Developers Group",
//     avatar:
//       "https://ui-avatars.com/api/?name=Dev+Group&background=555&color=fff",
//     type: "video",
//     status: "incoming",
//     time: "Monday",
//   },
//   {
//     id: 5,
//     name: "Emma Watson",
//     avatar: "https://randomuser.me/api/portraits/women/12.jpg",
//     type: "video",
//     status: "incoming",
//     time: "2:35 PM",
//   },
//   {
//     id: 6,
//     name: "John Doe",
//     avatar: "https://randomuser.me/api/portraits/men/32.jpg",
//     type: "audio",
//     status: "missed",
//     time: "11:15 AM",
//   },
//   {
//     id: 7,
//     name: "Sophie Turner",
//     avatar: "https://randomuser.me/api/portraits/women/29.jpg",
//     type: "audio",
//     status: "outgoing",
//     time: "Yesterday",
//   },
//   {
//     id: 8,
//     name: "Developers Group",
//     avatar:
//       "https://ui-avatars.com/api/?name=Dev+Group&background=555&color=fff",
//     type: "video",
//     status: "incoming",
//     time: "Monday",
//   },
// ];

// export const CallHistoryList = () => {
//   return (
//     <section
//       className="flex flex-col bg-[#18181B] text-[#E4E6EB] md:w-[25%]
//     w-full border-r border-[#27272A] h-screen overflow-hidden"
//     >
//       {/* Header */}
//       <div className="p-4 flex items-center justify-between border-b border-[#27272A]">
//         <h2 className="text-lg font-semibold text-[#A2A970]">Call History</h2>
//       </div>

//       {/* Call List */}
//       <div
//         className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#27272A]
//       scrollbar-track-transparent mb-20"
//       >
//         {callsData.map((call) => {
//           let Icon;
//           let color = "";

//           if (call.status === "incoming") {
//             Icon = FiPhoneIncoming;
//             color = "text-green-500";
//           } else if (call.status === "outgoing") {
//             Icon = FiPhoneOutgoing;
//             color = "text-blue-400";
//           } else {
//             Icon = FiPhoneMissed;
//             color = "text-red-500";
//           }

//           return (
//             <motion.div
//               key={call.id}
//               whileHover={{ scale: 1.02 }}
//               className="flex items-center justify-between p-3 mx-2 my-1 rounded-xl
//                hover:bg-[#22222A] cursor-pointer transition-all"
//             >
//               {/* Left section */}
//               <div className="flex items-center gap-3">
//                 <img
//                   src={call.avatar}
//                   alt={call.name}
//                   className="w-12 h-12 rounded-full border border-[#27272A]"
//                 />
//                 <div>
//                   <h3 className="font-medium text-[#E4E6EB]">{call.name}</h3>
//                   <div className="flex items-center gap-1 text-sm text-gray-400">
//                     <Icon className={`${color}`} />
//                     <span>
//                       {call.type === "video" ? "Video Call" : "Audio Call"}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Right section */}
//               <span className="text-xs text-gray-400">{call.time}</span>
//             </motion.div>
//           );
//         })}
//       </div>
//     </section>
//   );
// };

// import { motion } from "framer-motion";
// import {
//   FiPhone,
//   FiPhoneIncoming,
//   FiPhoneMissed,
//   FiPhoneOutgoing,
//   FiPlus,
//   FiVideo,
// } from "react-icons/fi";

// type Call = {
//   id: number;
//   name: string;
//   avatar: string;
//   type: "audio" | "video";
//   status: "incoming" | "outgoing" | "missed";
//   time: string;
// };

// const callsData: Call[] = [
//   {
//     id: 1,
//     name: "Emma Watson",
//     avatar: "https://randomuser.me/api/portraits/women/12.jpg",
//     type: "video",
//     status: "incoming",
//     time: "2:35 PM",
//   },
//   {
//     id: 2,
//     name: "John Doe",
//     avatar: "https://randomuser.me/api/portraits/men/32.jpg",
//     type: "audio",
//     status: "missed",
//     time: "11:15 AM",
//   },
//   {
//     id: 3,
//     name: "Sophie Turner",
//     avatar: "https://randomuser.me/api/portraits/women/29.jpg",
//     type: "audio",
//     status: "outgoing",
//     time: "Yesterday",
//   },
//   {
//     id: 4,
//     name: "Developers Group",
//     avatar:
//       "https://ui-avatars.com/api/?name=Dev+Group&background=555&color=fff",
//     type: "video",
//     status: "incoming",
//     time: "Monday",
//   },
// ];

// export const CallHistoryList = () => {
//   return (
//     <section
//       className="flex flex-col bg-[#18181B] text-[#E4E6EB]
//       md:w-[40%] lg:w-[35%] w-full border-r border-[#27272A]
//       h-screen overflow-hidden transition-all duration-300"
//     >
//       {/* Header */}
//       <div className="p-4 flex items-center justify-between border-b border-[#27272A] sticky top-0 bg-[#18181B] z-10">
//         <h2 className="text-lg font-semibold text-[#A2A970]">Call History</h2>
//         <button className="hidden md:flex items-center gap-1 px-3 py-1.5 bg-[#A2A970] text-[#11111b] rounded-lg font-medium hover:bg-[#8b935a] transition">
//           <FiPlus /> New Call
//         </button>
//       </div>

//       {/* Call List */}
//       <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#27272A] scrollbar-track-transparent pb-4">
//         {callsData.map((call) => {
//           let Icon;
//           let color = "";

//           if (call.status === "incoming") {
//             Icon = FiPhoneIncoming;
//             color = "text-green-500";
//           } else if (call.status === "outgoing") {
//             Icon = FiPhoneOutgoing;
//             color = "text-blue-400";
//           } else {
//             Icon = FiPhoneMissed;
//             color = "text-red-500";
//           }

//           return (
//             <motion.div
//               key={call.id}
//               whileHover={{ scale: 1.02, backgroundColor: "#22222A" }}
//               className="flex items-center justify-between p-3 mx-3 my-2 rounded-xl
//                hover:bg-[#22222A] cursor-pointer transition-all border border-transparent hover:border-[#333338]"
//             >
//               {/* Left section */}
//               <div className="flex items-center gap-3">
//                 <img
//                   src={call.avatar}
//                   alt={call.name}
//                   className="w-12 h-12 rounded-full border border-[#27272A]"
//                 />
//                 <div>
//                   <h3 className="font-medium text-[#E4E6EB]">{call.name}</h3>
//                   <div className="flex items-center gap-1 text-sm text-gray-400">
//                     <Icon className={`${color}`} />
//                     <span>
//                       {call.type === "video" ? (
//                         <span className="flex items-center gap-1">
//                           <FiVideo size={14} /> Video
//                         </span>
//                       ) : (
//                         <span className="flex items-center gap-1">
//                           <FiPhone size={14} /> Audio
//                         </span>
//                       )}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Right section */}
//               <span className="text-xs text-gray-400">{call.time}</span>
//             </motion.div>
//           );
//         })}
//       </div>
//     </section>
//   );
// };

// import { Button } from "@/components/ui/button";
// import { AnimatePresence, motion } from "framer-motion";
// import { ArrowLeft, Phone, Video } from "lucide-react";
// import { useState } from "react";

// const callHistory = [
//   {
//     id: 1,
//     name: "Sarah Connor",
//     avatar: "https://i.pravatar.cc/100?img=1",
//     time: "Yesterday, 9:45 PM",
//     type: "voice",
//     duration: "5m 23s",
//   },
//   {
//     id: 2,
//     name: "John Doe",
//     avatar: "https://i.pravatar.cc/100?img=2",
//     time: "Today, 10:10 AM",
//     type: "video",
//     duration: "15m 12s",
//   },
//   {
//     id: 3,
//     name: "Alice Parker",
//     avatar: "https://i.pravatar.cc/100?img=3",
//     time: "Oct 15, 7:23 PM",
//     type: "voice",
//     duration: "2m 45s",
//   },
// ];

// export default function CallHistory({ onBack }) {
//   const [selectedCall, setSelectedCall] = useState(null);
//   const isMobile = window.innerWidth < 768;

//   const CallDetails = ({ call }) => (
//     <motion.div
//       key={call.id}
//       initial={{ x: 100, opacity: 0 }}
//       animate={{ x: 0, opacity: 1 }}
//       exit={{ x: 100, opacity: 0 }}
//       transition={{ duration: 0.25 }}
//       className="p-6 flex flex-col gap-6 h-full overflow-y-auto"
//     >
//       <div className="flex items-center gap-3">
//         {isMobile && (
//           <Button
//             onClick={() => setSelectedCall(null)}
//             variant="ghost"
//             size="icon"
//           >
//             <ArrowLeft className="w-5 h-5" />
//           </Button>
//         )}
//         <h2 className="text-xl font-semibold">Call Details</h2>
//       </div>

//       <div className="flex flex-col items-center mt-6">
//         <img
//           src={call.avatar}
//           alt={call.name}
//           className="w-20 h-20 rounded-full border-2 border-gray-300 dark:border-neutral-700"
//         />
//         <h3 className="text-lg font-medium mt-3">{call.name}</h3>
//         <p className="text-gray-500">{call.time}</p>
//       </div>

//       <div className="flex flex-col items-center gap-2 text-gray-400">
//         <div>
//           Duration: <span className="text-gray-200">{call.duration}</span>
//         </div>
//         <div>
//           Type: <span className="capitalize text-gray-200">{call.type}</span>
//         </div>
//       </div>

//       <div className="flex justify-center gap-4 mt-6">
//         <Button variant="default" className="flex items-center gap-2">
//           <Phone className="w-4 h-4" /> Voice Call
//         </Button>
//         <Button variant="outline" className="flex items-center gap-2">
//           <Video className="w-4 h-4" /> Video Call
//         </Button>
//       </div>
//     </motion.div>
//   );

//   return (
//     <motion.div
//       initial={{ x: "100%" }}
//       animate={{ x: 0 }}
//       exit={{ x: "100%" }}
//       transition={{ type: "tween", duration: 0.3 }}
//       className="fixed right-0 top-0 h-screen bg-white dark:bg-neutral-900 shadow-2xl border-l border-gray-200 dark:border-neutral-800 w-full md:w-[70%] lg:w-[55%] xl:w-[45%] flex"
//     >
//       {/* Left Panel — Call List */}
//       <div
//         className={`border-r border-gray-200 dark:border-neutral-800 w-full md:w-1/3 overflow-y-auto ${
//           selectedCall && isMobile ? "hidden" : "block"
//         }`}
//       >
//         <div className="p-4 flex items-center justify-between">
//           <h1 className="text-lg font-semibold">Call History</h1>
//           <Button variant="outline" size="sm" onClick={onBack}>
//             Back
//           </Button>
//         </div>

//         <div className="flex flex-col">
//           {callHistory.map((call) => (
//             <div
//               key={call.id}
//               onClick={() => setSelectedCall(call)}
//               className={`cursor-pointer px-5 py-4 hover:bg-gray-100 dark:hover:bg-neutral-800 border-b border-gray-100 dark:border-neutral-800 flex items-center gap-4 transition ${
//                 selectedCall?.id === call.id
//                   ? "bg-gray-50 dark:bg-neutral-800"
//                   : ""
//               }`}
//             >
//               <img
//                 src={call.avatar}
//                 alt={call.name}
//                 className="w-10 h-10 rounded-full"
//               />
//               <div className="flex flex-col flex-1">
//                 <h3 className="text-md font-medium">{call.name}</h3>
//                 <p className="text-sm text-gray-500">{call.time}</p>
//               </div>
//               {call.type === "voice" ? (
//                 <Phone className="w-4 h-4 text-gray-400" />
//               ) : (
//                 <Video className="w-4 h-4 text-gray-400" />
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Right Panel — Call Details */}
//       <div className="flex-1 hidden md:flex flex-col">
//         <AnimatePresence mode="wait">
//           {selectedCall ? (
//             <CallDetails key={selectedCall.id} call={selectedCall} />
//           ) : (
//             <motion.div
//               key="default"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="h-full flex items-center justify-center text-gray-400"
//             >
//               Select a call to view details
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* Mobile View — Slide In */}
//       {isMobile && (
//         <AnimatePresence mode="wait">
//           {selectedCall && (
//             <CallDetails key={selectedCall.id} call={selectedCall} />
//           )}
//         </AnimatePresence>
//       )}
//     </motion.div>
//   );
// }

// import { AnimatePresence, motion } from "framer-motion";
// import { ArrowLeft, Phone, Video } from "lucide-react";
// import { useState } from "react";

// const callHistory = [
//   {
//     id: 1,
//     name: "Sarah Connor",
//     avatar: "https://i.pravatar.cc/100?img=1",
//     time: "Yesterday, 9:45 PM",
//     type: "voice",
//     duration: "5m 23s",
//   },
//   {
//     id: 2,
//     name: "John Doe",
//     avatar: "https://i.pravatar.cc/100?img=2",
//     time: "Today, 10:10 AM",
//     type: "video",
//     duration: "15m 12s",
//   },
//   {
//     id: 3,
//     name: "Alice Parker",
//     avatar: "https://i.pravatar.cc/100?img=3",
//     time: "Oct 15, 7:23 PM",
//     type: "voice",
//     duration: "2m 45s",
//   },
// ];

// export default function CallHistoryList({ onBack }: { onBack: () => void }) {
//   const [selectedCall, setSelectedCall] = useState<callHistory | null>(null);
//   const isMobile = window.innerWidth < 768;

//   // 🧩 Inner Component — Call Details
//   const CallDetails = ({ call }: { call: any }) => (
//     <motion.div
//       key={call.id}
//       initial={{ x: 100, opacity: 0 }}
//       animate={{ x: 0, opacity: 1 }}
//       exit={{ x: 100, opacity: 0 }}
//       transition={{ duration: 0.25 }}
//       className="p-6 flex flex-col gap-6 h-full overflow-y-auto bg-[#18181B] text-[#E4E6EB]"
//     >
//       {/* Header */}
//       <div className="flex items-center gap-3">
//         {isMobile && (
//           <button
//             onClick={() => setSelectedCall(null)}
//             className="p-2 rounded-full hover:bg-[#22222A] transition"
//           >
//             <ArrowLeft className="w-5 h-5 text-gray-300" />
//           </button>
//         )}
//         <h2 className="text-xl font-semibold text-[#A2A970]">Call Details</h2>
//       </div>

//       {/* User Info */}
//       <div className="flex flex-col items-center mt-6">
//         <img
//           src={call.avatar}
//           alt={call.name}
//           className="w-20 h-20 rounded-full border-2 border-[#27272A]"
//         />
//         <h3 className="text-lg font-medium mt-3">{call.name}</h3>
//         <p className="text-gray-400">{call.time}</p>
//       </div>

//       {/* Call Info */}
//       <div className="flex flex-col items-center gap-2 text-gray-400">
//         <p>
//           Duration: <span className="text-gray-200">{call.duration}</span>
//         </p>
//         <p>
//           Type: <span className="capitalize text-gray-200">{call.type}</span>
//         </p>
//       </div>

//       {/* Buttons */}
//       <div className="flex justify-center gap-4 mt-6">
//         <button className="px-4 py-2 rounded-lg bg-[#A2A970] text-black font-medium flex items-center gap-2 hover:bg-[#9ca25c] transition">
//           <Phone className="w-4 h-4" /> Voice Call
//         </button>
//         <button className="px-4 py-2 rounded-lg border border-[#A2A970] text-[#A2A970] font-medium flex items-center gap-2 hover:bg-[#2A2A2A] transition">
//           <Video className="w-4 h-4" /> Video Call
//         </button>
//       </div>
//     </motion.div>
//   );

//   // 🧩 Main Render
//   return (
//     <motion.div
//       initial={{ x: "100%" }}
//       animate={{ x: 0 }}
//       exit={{ x: "100%" }}
//       transition={{ type: "tween", duration: 0.3 }}
//       className="fixed right-0 top-0 h-screen bg-[#18181B] text-[#E4E6EB] shadow-2xl
//                  border-l border-[#27272A] w-full md:w-[70%] lg:w-[55%] xl:w-[45%] flex"
//     >
//       {/* Left: Call List */}
//       <div
//         className={`border-r border-[#27272A] w-full md:w-1/3 overflow-y-auto ${
//           selectedCall && isMobile ? "hidden" : "block"
//         }`}
//       >
//         <div className="p-4 flex items-center justify-between border-b border-[#27272A]">
//           <h1 className="text-lg font-semibold text-[#A2A970]">Call History</h1>
//           <button
//             onClick={onBack}
//             className="px-3 py-1 rounded-lg text-sm border border-[#A2A970] text-[#A2A970] hover:bg-[#22222A] transition"
//           >
//             Back
//           </button>
//         </div>

//         {/* List */}
//         <div className="flex flex-col">
//           {callHistory.map((call) => (
//             <div
//               key={call.id}
//               onClick={() => setSelectedCall(call)}
//               className={`cursor-pointer px-5 py-4 hover:bg-[#22222A] border-b border-[#27272A]
//                          flex items-center gap-4 transition ${
//                            selectedCall?.id === call.id ? "bg-[#202020]" : ""
//                          }`}
//             >
//               <img
//                 src={call.avatar}
//                 alt={call.name}
//                 className="w-10 h-10 rounded-full border border-[#27272A]"
//               />
//               <div className="flex flex-col flex-1">
//                 <h3 className="text-md font-medium">{call.name}</h3>
//                 <p className="text-sm text-gray-400">{call.time}</p>
//               </div>
//               {call.type === "voice" ? (
//                 <Phone className="w-4 h-4 text-gray-400" />
//               ) : (
//                 <Video className="w-4 h-4 text-gray-400" />
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Right: Call Details (desktop only) */}
//       <div className="flex-1 hidden md:flex flex-col">
//         <AnimatePresence mode="wait">
//           {selectedCall ? (
//             <CallDetails key={selectedCall.id} call={selectedCall} />
//           ) : (
//             <motion.div
//               key="default"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="h-full flex items-center justify-center text-gray-500"
//             >
//               Select a call to view details
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* Mobile View: Fullscreen CallDetails */}
//       {isMobile && (
//         <AnimatePresence mode="wait">
//           {selectedCall && (
//             <CallDetails key={selectedCall.id} call={selectedCall} />
//           )}
//         </AnimatePresence>
//       )}
//     </motion.div>
//   );
// }

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Phone, Video } from "lucide-react";
import { useState } from "react";

// 🧩 Type definition for a call
type Call = {
  id: number;
  name: string;
  avatar: string;
  time: string;
  type: "voice" | "video";
  duration: string;
};

// 🧩 Sample data
const callHistory: Call[] = [
  {
    id: 1,
    name: "Sarah Connor",
    avatar: "https://i.pravatar.cc/100?img=1",
    time: "Yesterday, 9:45 PM",
    type: "voice",
    duration: "5m 23s",
  },
  {
    id: 2,
    name: "John Doe",
    avatar: "https://i.pravatar.cc/100?img=2",
    time: "Today, 10:10 AM",
    type: "video",
    duration: "15m 12s",
  },
  {
    id: 3,
    name: "Alice Parker",
    avatar: "https://i.pravatar.cc/100?img=3",
    time: "Oct 15, 7:23 PM",
    type: "voice",
    duration: "2m 45s",
  },
];

export function CallHistoryList({ onBack }: { onBack: () => void }) {
  const [selectedCall, setSelectedCall] = useState<Call | null>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  // 🧩 Inner Component — Call Details
  const CallDetails = ({ call }: { call: Call }) => (
    <motion.div
      key={call.id}
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="p-6 flex flex-col gap-6 h-full overflow-y-auto bg-[#18181B] text-[#E4E6EB]"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        {isMobile && (
          <button
            onClick={() => setSelectedCall(null)}
            className="p-2 rounded-full hover:bg-[#22222A] transition"
          >
            <ArrowLeft className="w-5 h-5 text-gray-300" />
          </button>
        )}
        <h2 className="text-xl font-semibold text-[#A2A970]">Call Details</h2>
      </div>

      {/* User Info */}
      <div className="flex flex-col items-center mt-6">
        <img
          src={call.avatar}
          alt={call.name}
          className="w-20 h-20 rounded-full border-2 border-[#27272A]"
        />
        <h3 className="text-lg font-medium mt-3">{call.name}</h3>
        <p className="text-gray-400">{call.time}</p>
      </div>

      {/* Call Info */}
      <div className="flex flex-col items-center gap-2 text-gray-400">
        <p>
          Duration: <span className="text-gray-200">{call.duration}</span>
        </p>
        <p>
          Type: <span className="capitalize text-gray-200">{call.type}</span>
        </p>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <button className="px-4 py-2 rounded-lg bg-[#A2A970] text-black font-medium flex items-center gap-2 hover:bg-[#9ca25c] transition">
          <Phone className="w-4 h-4" /> Voice Call
        </button>
        <button className="px-4 py-2 rounded-lg border border-[#A2A970] text-[#A2A970] font-medium flex items-center gap-2 hover:bg-[#2A2A2A] transition">
          <Video className="w-4 h-4" /> Video Call
        </button>
      </div>
    </motion.div>
  );

  // 🧩 Main Render
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
      //
      className="flex flex-1 h-full bg-[#18181B] text-[#E4E6EB] overflow-hidden"
    >
      {/* Left: Call List */}
      <div
        className={`border-r border-[#27272A] w-full md:w-1/3 overflow-y-auto ${
          selectedCall && isMobile ? "hidden" : "block"
        }`}
      >
        <div className="p-4 flex items-center justify-between border-b border-[#27272A]">
          <h1 className="text-lg font-semibold text-[#A2A970]">Call History</h1>
          <button
            onClick={onBack}
            className="px-3 py-1 rounded-lg text-sm border border-[#A2A970] text-[#A2A970] hover:bg-[#22222A] transition"
          >
            Back
          </button>
        </div>

        {/* List */}
        <div className="flex flex-col">
          {callHistory.map((call) => (
            <div
              key={call.id}
              onClick={() => setSelectedCall(call)}
              className={`cursor-pointer px-5 py-4 hover:bg-[#22222A] border-b border-[#27272A] 
                         flex items-center gap-4 transition ${
                           selectedCall?.id === call.id ? "bg-[#202020]" : ""
                         }`}
            >
              <img
                src={call.avatar}
                alt={call.name}
                className="w-10 h-10 rounded-full border border-[#27272A]"
              />
              <div className="flex flex-col flex-1">
                <h3 className="text-md font-medium">{call.name}</h3>
                <p className="text-sm text-gray-400">{call.time}</p>
              </div>
              {call.type === "voice" ? (
                <Phone className="w-4 h-4 text-gray-400" />
              ) : (
                <Video className="w-4 h-4 text-gray-400" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right: Call Details (desktop only) */}
      <div className="flex-1 hidden md:flex flex-col">
        <AnimatePresence mode="wait">
          {selectedCall ? (
            <CallDetails key={selectedCall.id} call={selectedCall} />
          ) : (
            <motion.div
              key="default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex items-center justify-center text-gray-500"
            >
              Select a call to view details
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile View: Fullscreen CallDetails */}
      {isMobile && (
        <AnimatePresence mode="wait">
          {selectedCall && (
            <CallDetails key={selectedCall.id} call={selectedCall} />
          )}
        </AnimatePresence>
      )}
    </motion.div>
  );
}
