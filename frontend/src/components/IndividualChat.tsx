import { useEffect, useRef, useState } from "react";
import { FiPhone, FiSend, FiVideo } from "react-icons/fi";
import type { Chat } from "../pages/ChatPage";

type Props = {
  chat: Chat;
  onBack?: () => void; // optional
};

export const IndividualChat = ({ chat, onBack }: Props) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey there! How are you?",
      sender: "other",
      time: "2:42 PM",
    },
    {
      id: 2,
      text: "I'm good! Working on the project 🚀",
      sender: "me",
      time: "2:43 PM",
    },
    {
      id: 3,
      text: "That’s awesome! Can’t wait to see it.",
      sender: "other",
      time: "2:45 PM",
    },
  ]);

  const [newMsg, setNewMsg] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!newMsg.trim()) return;
    setMessages([
      ...messages,
      { id: Date.now(), text: newMsg, sender: "me", time: "Now" },
    ]);
    setNewMsg("");
  };

  return (
    <section className="flex flex-col flex-1 bg-background text-[#E4E6EB] w-full h-screen">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#27272A]">
        {/* Left: Avatar + Name */}
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="md:hidden p-2 rounded hover:bg-[#2A2A35]"
            >
              Back
            </button>
          )}
          <img
            src={chat.avatar}
            alt="Avatar"
            className="w-10 h-10 rounded-full border border-[#27272A]"
          />
          <div>
            <h2 className="font-medium text-[#E4E6EB]">{chat.name}</h2>
            <p className="text-xs text-gray-400">online</p>
          </div>
        </div>

        {/* Right: Call & Video Call */}
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-[#2A2A35] transition">
            <FiPhone className="text-[#E4E6EB] text-lg" />
          </button>
          <button className="p-2 rounded-full hover:bg-[#2A2A35] transition">
            <FiVideo className="text-[#E4E6EB] text-lg" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 scrollbar-thin scrollbar-thumb-[#27272A] scrollbar-track-transparent space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] px-3 py-2 rounded-2xl text-sm shadow-md ${
                msg.sender === "me"
                  ? "bg-[#A2A970] text-[#11111b] rounded-br-none"
                  : "bg-[#2A2A35] text-[#E4E6EB] rounded-bl-none"
              }`}
            >
              <p>{msg.text}</p>
              <span className="block text-[10px] text-gray-300 mt-1 text-right">
                {msg.time}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-4 py-3 border-t border-[#27272A] bg-[#18181B] mb-16 md:mb-0">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          className="flex-1 bg-[#1E1E25] text-[#E4E6EB] placeholder-gray-500 px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-[#A2A970]"
        />
        <button
          onClick={handleSend}
          className="p-2 rounded-full bg-[#A2A970] hover:bg-[#8b935a] transition-colors"
        >
          <FiSend className="text-[#11111b] text-lg" />
        </button>
      </div>
    </section>
  );
};
