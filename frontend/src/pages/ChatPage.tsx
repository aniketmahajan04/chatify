import { useState } from "react";
import { ChatsList } from "../components/ChatList";
import { IndividualChat } from "../components/IndividualChat";
import ProfilePanel from "../components/ProfilePanel";
import { Settings } from "../components/Settings";
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
  const [activeMenu, setActiveMenu] = useState(1); // 1 = Chats, 2 = Calls
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleMenuChange = (menuId: number) => {
    setActiveMenu(menuId);
    setSelectedChat(null); // Reset selected chat when switching menus
  };

  return (
    <div className="flex h-screen relative overflow-hidden">
      {/* Sidebar */}
      <SideBar activeMenu={activeMenu} onMenuChange={handleMenuChange} />

      {/* ✅ Desktop layout */}
      <div className="hidden md:flex flex-1">
        {activeMenu === 1 && (
          <>
            <div className="w-[30%] border-r border-[#27272A]">
              <ChatsList onSelectChat={(chat) => setSelectedChat(chat)} />
            </div>

            <div className="flex-1 relative">
              {selectedChat ? (
                <IndividualChat
                  chat={selectedChat}
                  onOpenProfile={() => setIsProfileOpen(true)}
                />
              ) : (
                <div className="flex h-full items-center justify-center text-gray-400">
                  Select a chat to start messaging
                </div>
              )}
            </div>
          </>
        )}

        {activeMenu === 2 && (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <p className="text-2xl mb-2">📞</p>
              <p>Calls feature coming soon</p>
            </div>
          </div>
        )}
      </div>

      {/* ✅ Mobile layout */}
      <div className="flex flex-1 md:hidden">
        {activeMenu === 1 && (
          <>
            {!selectedChat ? (
              <ChatsList onSelectChat={(chat) => setSelectedChat(chat)} />
            ) : (
              <IndividualChat
                chat={selectedChat}
                onBack={() => setSelectedChat(null)}
                onOpenProfile={() => setIsProfileOpen(true)}
              />
            )}
          </>
        )}

        {activeMenu === 2 && (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <p className="text-2xl mb-2">📞</p>
              <p>Calls feature coming soon</p>
            </div>
          </div>
        )}

        {isSettingsOpen && (
          <div className="flex-1">
            <Settings
              onLogout={() => console.log("Logged out")}
              onClose={() => setIsSettingsOpen(false)}
            />
          </div>
        )}
      </div>

      {/* ✅ Profile Panel */}
      <ProfilePanel
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </div>
  );
};
