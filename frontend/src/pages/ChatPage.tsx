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
      <SideBar />

      {/* ChatsList */}
      <div className={`md:flex ${selectedChat ? "hidden" : "flex"} flex-1`}>
        <ChatsList onSelectChat={(chat) => setSelectedChat(chat)} />
      </div>

      {/* IndividualChat */}
      <div className={`flex-1 ${selectedChat ? "flex" : "hidden"} md:flex`}>
        {selectedChat ? (
          <IndividualChat
            chat={selectedChat}
            onBack={() => setSelectedChat(null)}
          />
        ) : (
          <div className="flex-1 bg-[#181818"></div>
        )}
      </div>
    </div>
  );
};
