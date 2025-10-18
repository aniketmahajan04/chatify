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
