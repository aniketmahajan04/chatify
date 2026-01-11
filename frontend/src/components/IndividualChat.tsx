import { useEffect, useRef, useState } from "react";
import { FiPhone, FiSend, FiVideo } from "react-icons/fi";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSocket } from "./SocketContext";
import { useUser } from "@clerk/clerk-react";
// import type { Chat } from "../pages/ChatPage";
import { ActionModal } from "./ActionModel";

// Define the structure of a message received from the server
interface ReceivedMessage {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  createdAt: Date | string;
}

interface FrontendMessage {
  id: string;
  text: string;
  sender: "me" | "other";
  time: string;
}

type Props = {
  chat: {
    id: string;
    name: string;
    avatar: string;
    otherUserId: string;
  };
  onBack?: () => void; // optional
  onOpenProfile?: () => void;
};

export const IndividualChat = ({ chat, onBack, onOpenProfile }: Props) => {
  const [messages, setMessages] = useState<FrontendMessage[]>([]);
  const [newMsg, setNewMsg] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [actionModelOpen, setActionModelOpen] = useState(false);
  const [actionModelPosition, setActionModelPosition] = useState({
    x: 0,
    y: 0,
  });
  const [selectedMessage, setSelectedMessage] =
    useState<FrontendMessage | null>(null);

  // <<< NEW: Get socket and user Info
  const { socket, isConnected } = useSocket();
  const { user } = useUser();
  const currentUser = user?.id;
  const [isOnline, setIsOnline] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [otherTyping, setOtherTyping] = useState(false);
  const typingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // WebRTC states
  const [isInCall, setIsInCall] = useState(false);
  const [isVideoCall, setIsVideoCall] = useState(false);
  const [currentCallId, setCurrentCallId] = useState<string | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const localStream = useRef<MediaStream | null>(null);

  // Initialize WebRTC
  const initializePeerConnection = () => {
    const config: RTCConfiguration = {
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun.l.google.com:19302" },
      ],
    };

    const pc = new RTCPeerConnection(config);

    pc.onicecandidate = (e) => {
      if (e.candidate && socket) {
        socket.emit("webrtc:ice-candidate", {
          chatId: chat.id,
          candidate: e.candidate,
        });
      }
    };

    pc.ontrack = (e) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = e.streams[0];
      }
    };

    return pc;
  };

  useEffect(() => {
    if (!socket || !chat.otherUserId) return;

    // Check initial online status when component mounts
    socket.emit("user:check:online", { userId: chat.otherUserId });

    const handleOnline = ({ userId }: { userId: string }) => {
      if (userId === chat.otherUserId) setIsOnline(true);
    };

    const handleOffline = ({ userId }: { userId: string }) => {
      if (userId === chat.otherUserId) setIsOnline(false);
    };

    const handleStatus = ({
      userId,
      isOnline: status,
    }: {
      userId: string;
      isOnline: boolean;
    }) => {
      if (userId === chat.otherUserId) setIsOnline(status);
    };

    socket.on("user:online", handleOnline);
    socket.on("user:offline", handleOffline);
    socket.on("user:status", handleStatus);

    return () => {
      socket.off("user:online", handleOnline);
      socket.off("user:offline", handleOffline);
      socket.off("user:status", handleStatus);
    };
  }, [socket, chat.otherUserId]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, otherTyping]);

  const handleSend = () => {
    if (!newMsg.trim() || !socket || !isConnected) return;
    socket.emit("chat:message", {
      chatId: chat.id,
      content: newMsg,
    });

    setNewMsg("");
  };

  useEffect(() => {
    if (!chat.id || !currentUser) return;

    let isMounted = true;

    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/chat/${chat.id}/messages`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          console.error("Failed to fetch messages");
          return;
        }

        const data: ReceivedMessage[] = await res.json();

        if (!isMounted) return;

        setMessages(
          data.map((msg) => ({
            id: msg.id,
            text: msg.content,
            sender: msg.senderId === currentUser ? "me" : "other",
            time: new Date(msg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          }))
        );
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };
    fetchMessages();

    return () => {
      isMounted = false;
    };
  }, [chat.id, currentUser]);

  useEffect(() => {
    if (!socket) return;

    const onTypingStart = ({ userId }: { userId: string }) => {
      if (userId !== currentUser) setOtherTyping(true);
    };

    const onTypingStop = ({ userId }: { userId: string }) => {
      if (userId !== currentUser) setOtherTyping(false);
    };

    socket.on("typing:start", onTypingStart);
    socket.on("typing:stop", onTypingStop);

    return () => {
      socket.off("typing:start", onTypingStart);
      socket.off("typing:stop", onTypingStop);
    };
  }, [socket, currentUser]);

  useEffect(() => {
    if (!socket || !chat.id || !currentUser) return;

    const onMessage = (msg: ReceivedMessage) => {
      if (msg.chatId !== chat.id) return;

      setMessages((prev: FrontendMessage[]) => {
        if (prev.some((m: FrontendMessage) => m.id === msg.id)) return prev;

        return [
          ...prev,
          {
            id: msg.id,
            text: msg.content,
            sender: msg.senderId === currentUser ? "me" : "other",
            time: new Date(msg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ];
      });
    };

    socket.on("chat:message:receive", onMessage);

    return () => {
      socket.off("chat:message:receive", onMessage);
    };
  }, [socket, chat.id, currentUser]);

  const handleRightClick = (e: React.MouseEvent, message: FrontendMessage) => {
    e.preventDefault();
    setSelectedMessage(message);
    setActionModelPosition({ x: e.clientX, y: e.clientY });
    setActionModelOpen(true);
  };

  return (
    <section className="flex flex-col flex-1 bg-background text-[#E4E6EB] w-full h-screen pb-16 md:pb-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#27272A]">
        {/* Left: Avatar + Name */}
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="md:hidden p-2 rounded hover:bg-[#2A2A35]"
            >
              <IoIosArrowRoundBack />
            </button>
          )}

          <button
            onClick={onOpenProfile}
            className="flex items-center gap-3 hover:bg-[#2A2A35] p-1 rounded-lg transition"
          >
            <img
              src={chat.avatar}
              alt="Avatar"
              className="w-10 h-10 rounded-full border border-[#27272A]"
            />
            <div>
              <h2 className="font-medium text-[#E4E6EB]">{chat.name}</h2>
              <p className="text-xs text-gray-400">
                {isOnline ? "online" : "offline"}
              </p>
            </div>
          </button>
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
      <div className="flex-1 overflow-y-auto px-4 py-3 scrollbar-thin scrollbar-thumb-[#27272A] scrollbar-track-transparent min-h-0">
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              onContextMenu={(e) => handleRightClick(e, msg)}
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
          {/* Typing Indicator */}
          {otherTyping && (
            <div className="flex justify-start">
              <div className="max-w-[70%] px-4 py-2 rounded-2xl bg-[#2A2A35] rounded-bl-none">
                <div className="flex items-center gap-1">
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms", animationDuration: "1.4s" }}
                  ></span>
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{
                      animationDelay: "200ms",
                      animationDuration: "1.4s",
                    }}
                  ></span>
                  <span
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{
                      animationDelay: "400ms",
                      animationDuration: "1.4s",
                    }}
                  ></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-4 py-3 border-t border-[#27272A] bg-[#18181B]">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMsg}
          onChange={(e) => {
            setNewMsg(e.target.value);

            if (!socket) return;

            if (!isTyping) {
              setIsTyping(true);
              socket.emit("typing:start", { chatId: chat.id });
            }

            if (typingTimeout.current) {
              clearTimeout(typingTimeout.current);
            }

            typingTimeout.current = setTimeout(() => {
              setIsTyping(false);
              socket.emit("typing:stop", { chatId: chat.id });
            }, 1000);
          }}
          className="flex-1 bg-[#1E1E25] text-[#E4E6EB] placeholder-gray-500 px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-[#A2A970]"
        />
        <button
          onClick={handleSend}
          className="p-2 rounded-full bg-[#A2A970] hover:bg-[#8b935a] transition-colors"
        >
          <FiSend className="text-[#11111b] text-lg" />
        </button>
      </div>

      <ActionModal
        isOpen={actionModelOpen}
        onClose={() => setActionModelOpen(false)}
        position={actionModelPosition}
        actions={[
          {
            label: "Read",
            onClick: () => console.log("Read", selectedMessage?.id),
          },
          {
            label: "Forward",
            onClick: () => console.log("Forward", selectedMessage?.id),
          },
          {
            label: "Delete",
            onClick: () => console.log("Delete", selectedMessage?.id),
            destructive: true,
          },
        ]}
      />
    </section>
  );
};
