import { useState } from "react";
import { ChatsList } from "../components/ChatList";
import { IndividualChat } from "../components/IndividualChat";
import { SideBar } from "../components/SideBar";

export type Chat = {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
};

export const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  return (
    <div className="flex h-screen">
      {/* Sidebar (always visible on desktop) */}
      <SideBar />

      {/* ✅ Desktop layout */}
      <div className="hidden md:flex flex-1">
        {/* Chats list */}
        <div className="w-[30%] border-r border-[#27272A]">
          <ChatsList onSelectChat={(chat) => setSelectedChat(chat)} />
        </div>

        {/* Chat area */}
        <div className="flex-1">
          {selectedChat ? (
            <IndividualChat chat={selectedChat} />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              Select a chat to start messaging
            </div>
          )}
        </div>
      </div>

      {/* ✅ Mobile layout (toggle between list and chat) */}
      <div className="flex flex-1 md:hidden">
        {!selectedChat ? (
          <ChatsList onSelectChat={(chat) => setSelectedChat(chat)} />
        ) : (
          <IndividualChat
            chat={selectedChat}
            onBack={() => setSelectedChat(null)}
          />
        )}
      </div>
    </div>
  );
};
