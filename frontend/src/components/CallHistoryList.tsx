import { motion } from "framer-motion";
import {
  FiPhoneIncoming,
  FiPhoneMissed,
  FiPhoneOutgoing,
} from "react-icons/fi";

type Call = {
  id: number;
  name: string;
  avatar: string;
  type: "audio" | "video";
  status: "incoming" | "outgoing" | "missed";
  time: string;
};

const callsData: Call[] = [
  {
    id: 1,
    name: "Emma Watson",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    type: "video",
    status: "incoming",
    time: "2:35 PM",
  },
  {
    id: 2,
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    type: "audio",
    status: "missed",
    time: "11:15 AM",
  },
  {
    id: 3,
    name: "Sophie Turner",
    avatar: "https://randomuser.me/api/portraits/women/29.jpg",
    type: "audio",
    status: "outgoing",
    time: "Yesterday",
  },
  {
    id: 4,
    name: "Developers Group",
    avatar:
      "https://ui-avatars.com/api/?name=Dev+Group&background=555&color=fff",
    type: "video",
    status: "incoming",
    time: "Monday",
  },
];

export const CallHistoryList = () => {
  return (
    <section className="flex flex-col bg-[#18181B] text-[#E4E6EB] md:w-[25%] w-full border-r border-[#27272A] h-screen overflow-hidden">
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-[#27272A]">
        <h2 className="text-lg font-semibold text-[#A2A970]">Call History</h2>
      </div>

      {/* Call List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#27272A] scrollbar-track-transparent">
        {callsData.map((call) => {
          let Icon;
          let color = "";

          if (call.status === "incoming") {
            Icon = FiPhoneIncoming;
            color = "text-green-500";
          } else if (call.status === "outgoing") {
            Icon = FiPhoneOutgoing;
            color = "text-blue-400";
          } else {
            Icon = FiPhoneMissed;
            color = "text-red-500";
          }

          return (
            <motion.div
              key={call.id}
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between p-3 mx-2 my-1 rounded-xl hover:bg-[#22222A] cursor-pointer transition-all"
            >
              {/* Left section */}
              <div className="flex items-center gap-3">
                <img
                  src={call.avatar}
                  alt={call.name}
                  className="w-12 h-12 rounded-full border border-[#27272A]"
                />
                <div>
                  <h3 className="font-medium text-[#E4E6EB]">{call.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-400">
                    <Icon className={`${color}`} />
                    <span>
                      {call.type === "video" ? "Video Call" : "Audio Call"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right section */}
              <span className="text-xs text-gray-400">{call.time}</span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
