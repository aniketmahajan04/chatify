import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiSearch, FiPlus } from "react-icons/fi";
import type { Chat } from "../pages/ChatPage";
import { ActionModal } from "./ActionModel";
import { ProfilePopup } from "./ProfilePopUp";
import { useChats } from "../hooks/useChats";
import { useUser } from "@clerk/clerk-react";

// Dummy data
const chatData = [
    {
        id: 1,
        name: "Emma Watson",
        avatar: "https://randomuser.me/api/portraits/women/12.jpg",
        lastMessage: "Let’s catch up later today!",
        time: "2:45 PM",
        unread: 2,
    },
    {
        id: 2,
        name: "Team Project Alpha",
        avatar: "https://ui-avatars.com/api/?name=Project+Alpha&background=444&color=fff",
        lastMessage: "Deadline is tomorrow morning.",
        time: "1:10 PM",
        unread: 0,
    },
    {
        id: 3,
        name: "John Doe",
        avatar: "https://randomuser.me/api/portraits/men/14.jpg",
        lastMessage: "Cool, I’ll send the files soon.",
        time: "11:22 AM",
        unread: 4,
    },
    {
        id: 4,
        name: "Developers Group",
        avatar: "https://ui-avatars.com/api/?name=Dev+Group&background=555&color=fff",
        lastMessage: "Zig update is rolling out.",
        time: "Yesterday",
        unread: 0,
    },
];

type Props = {
    onSelectChat: (chat: Chat) => void;
    onCreateChat?: () => void;
    onCreateGroup?: () => void;
};

export const ChatsList = ({
    onSelectChat,
    onCreateChat,
    onCreateGroup,
}: Props) => {
    const { user } = useUser();
    const [selectedProfile, setSelectedProfile] = useState<any | null>(null);
    const [search, setSearch] = useState("");
    const [selectedChatAction, setSelectedAction] = useState<any | null>(null);
    const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(
        null,
    );
    const [showDropdown, setShowDropdown] = useState(false);

    const { data: chats, isLoading, error } = useChats();

    if (isLoading)
        return <div className="text-white p-4">Loading chats...</div>;
    if (error)
        return <div className="text-red-500 p-4">Failed to load chats</div>;

    const filteredChats = chats?.filter((chat) => {
        // chat.name?.toLowerCase().includes(search.toLowerCase()) ?? []
        const otherUser = chat.participants.find(
            (p: any) => p.userId !== user?.id,
        )?.user;
        const displayName = chat.isGroup
            ? chat.name
            : (otherUser?.name ?? "Unknown user");

        const avatar = chat.isGroup ? `/group.png` : otherUser?.avatar;

        const lastMessage = chat.messages[0]?.content ?? "No messages yet";
        const lastTime = chat.messages[0]?.createdAt ?? chat.updatedAt;

        return {
            ...chat,
            displayName,
            avatar,
            lastMessage,
            lastTime,
        };
    });

    return (
        <section className="flex flex-col bg-[#18181B] text-[#E4E6EB] w-full border-r border-[#27272A] h-screen overflow-hidden">
            {/* Header */}
            <div className="p-4.5 flex items-center justify-between border-b border-[#27272A]">
                <h2 className="text-lg font-semibold text-[#A2A970]">Chats</h2>

                {/*         + Button         */}
                <div className="relative">
                    <button
                        onClick={() => setShowDropdown((p) => !p)}
                        className="p-2 rounded-full hover:bg-[#2A2A35] transition"
                    >
                        <FiPlus />
                    </button>

                    {/* Dropdown  */}
                    <AnimatePresence>
                        {showDropdown && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.15 }}
                                className="absolute right-0 mt-2 w-40 bg-[#1E1E25]
                            border border-[#27272A] rounded-lg shadow-lg z-50"
                            >
                                <button
                                    onClick={() => {
                                        setShowDropdown(false);
                                        onCreateChat?.();
                                    }}
                                    className="block w-full text-left py-2  px-4 text-sm hover:bg-[#2A2A35 transition"
                                >
                                    New Chat
                                </button>
                                <button
                                    onClick={() => {
                                        setShowDropdown(false);
                                        onCreateGroup?.();
                                    }}
                                    className="block w-full text-left py-2 px-4 text-sm hover:bg-[#2A2A35 transition"
                                >
                                    New Group
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative px-4 py-2">
                <FiSearch className="absolute left-7 top-4 text-gray-400 text-lg" />
                <input
                    type="text"
                    placeholder="Search chats..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 rounded-lg bg-[#1E1E25] text-sm text-[#E4E6EB]
          placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#A2A970]"
                />
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#27272A] scrollbar-track-transparent">
                {filteredChats?.length === 0 && (
                    <div className="text-center text-gray-400 py-6">
                        No chats yet — click "+" to start one!
                    </div>
                )}

                {filteredChats.map((chat) => (
                    <motion.div
                        key={chat.id}
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center justify-between p-3 mx-2 my-1 rounded-xl hover:bg-[#22222A] cursor-pointer transition-all"
                        onClick={() => onSelectChat(chat)}
                        onContextMenu={(e) => {
                            e.preventDefault(); // prevents default browser context menu
                            setMousePos({ x: e.clientX, y: e.clientY });
                            setSelectedAction(chat);
                        }}
                    >
                        {/* Left section */}
                        <div className="flex items-center gap-3">
                            <img
                                src={chat.avatar}
                                alt={chat.displayName}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedProfile(chat);
                                }}
                                className="w-12 h-12 rounded-full border border-[#27272A]"
                            />
                            <div>
                                <h3 className="font-medium text-[#E4E6EB]">
                                    {chat.name}
                                </h3>
                                <p className="text-sm text-gray-400 truncate w-[140px] md:w-[180px]">
                                    {chat.lastMessage}
                                </p>
                            </div>
                        </div>

                        {/* Right section (Time + Unread badge) */}
                        <div className="flex flex-col items-end justify-between h-12">
                            <span className="text-xs text-gray-400">
                                {chat.time}
                            </span>
                            {chat.unread && chat.unread > 0 && (
                                <div className="bg-[#A2A970] text-[#11111b] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center mt-1">
                                    {chat.unread}
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}

                {selectedProfile && (
                    <ProfilePopup
                        user={selectedProfile}
                        onClose={() => setSelectedProfile(null)}
                    />
                )}

                {selectedChatAction && mousePos && (
                    <ActionModal
                        isOpen={selectedChatAction}
                        title="Message Options"
                        position={mousePos}
                        actions={[
                            {
                                label: "Mark as Read",
                                onClick: () =>
                                    console.log("Read", selectedChatAction.id),
                            },
                            {
                                label: "Forward",
                                onClick: () =>
                                    console.log(
                                        "Forward",
                                        selectedChatAction.id,
                                    ),
                            },
                            {
                                label: "Delete",
                                onClick: () =>
                                    console.log(
                                        "Delete",
                                        selectedChatAction.id,
                                    ),
                                destructive: true,
                            },
                        ]}
                        onClose={() => setSelectedAction(null)}
                    />
                )}
            </div>
        </section>
    );
};
