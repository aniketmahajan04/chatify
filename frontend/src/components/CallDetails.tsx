import { motion } from "framer-motion";
import { ArrowLeft, Phone, Video } from "lucide-react";

export const CallDetails = ({
  call,
  onBack,
}: {
  call: any;
  onBack: () => void;
}) => {
  if (!call) return null;

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full bg-[#18181B] text-white p-6 md:w-2/3 w-full"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="md:hidden p-2 rounded-full hover:bg-[#2A2A2A] transition"
        >
          <ArrowLeft className="w-5 h-5 text-gray-300" />
        </button>
        <h2 className="text-xl font-semibold text-[#A2A970]">Call Details</h2>
      </div>

      {/* User Info */}
      <div className="flex flex-col items-center gap-3 mt-4">
        <img
          src={call.avatar}
          alt={call.name}
          className="w-20 h-20 rounded-full border border-[#27272A]"
        />
        <h3 className="text-lg font-medium">{call.name}</h3>
        <p className="text-gray-400">{call.time}</p>
      </div>

      {/* Call Info */}
      <div className="mt-8 flex flex-col gap-3 text-center text-gray-400">
        <p>
          <span className="text-gray-200 font-medium">Call Type:</span>{" "}
          {call.type === "video" ? "Video Call" : "Audio Call"}
        </p>
        <p>
          <span className="text-gray-200 font-medium">Status:</span>{" "}
          {call.status}
        </p>
        <p>
          <span className="text-gray-200 font-medium">Duration:</span> 3m 45s
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-10 flex justify-center gap-4">
        <button className="bg-[#A2A970] text-black hover:bg-[#9ca25c] px-4 py-2 rounded-xl flex items-center gap-2 font-medium transition">
          <Phone className="w-4 h-4" /> Voice Call
        </button>
        <button className="border border-[#A2A970] text-[#A2A970] hover:bg-[#2A2A2A] px-4 py-2 rounded-xl flex items-center gap-2 font-medium transition">
          <Video className="w-4 h-4" /> Video Call
        </button>
      </div>
    </motion.div>
  );
};
