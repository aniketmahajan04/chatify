import { useState } from "react";
import { CallHistoryList } from "../components/CallHistoryList.tsx";
import { ChatsList } from "../components/ChatList";
import { IndividualChat } from "../components/IndividualChat";
import { MyProfile } from "../components/MyProfile.tsx";
import { Notifications } from "../components/Notifications.tsx";
import ProfilePanel from "../components/ProfilePanel";
import { Settings } from "../components/Settings";
import { SideBar } from "../components/SideBar";
import { UserListDrawer } from "../components/UserListDrawer.tsx";
import { UserProfileDrawer } from "../components/userProfileDrawer.tsx";

export type Chat = {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
};
const dummyUsers = [
  {
    id: 1,
    name: "Emma Watson",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    bio: "Frontend Dev",
  },
  {
    id: 2,
    name: "John Doe",
    avatar: "https://randomuser.me/api/portraits/men/14.jpg",
    bio: "Backend Engineer",
  },
  {
    id: 3,
    name: "Ava Smith",
    avatar: "https://randomuser.me/api/portraits/women/21.jpg",
    bio: "UI/UX Designer",
  },
];

export const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [activeMenu, setActiveMenu] = useState(1); // 1 = Chats, 2 = Calls
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMyProfileOpen, setIsMyProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      sender: "Alice",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      message: "wants to connect with you",
    },
  ]);
  const [isUserListOpen, setIsUserListOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Hey there! I'm using Chatify 🚀",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  });

  const handleMenuChange = (menuId: number) => {
    setActiveMenu(menuId);
    setSelectedChat(null); // Reset selected chat when switching menus
  };

  const handleAccept = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    console.log("Accepted request", id);
  };

  const handleReject = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    console.log("Rejected request", id);
  };

  return (
    <div className="flex h-screen relative overflow-hidden">
      {/* Sidebar */}
      <SideBar
        activeMenu={activeMenu}
        onMenuChange={handleMenuChange}
        onSettingsClick={() => setIsSettingsOpen(true)}
        onMyProfileClick={() => setIsMyProfileOpen(true)}
        onNotificationsClick={() => setIsNotificationsOpen(true)}
      />

      {/* ✅ Desktop layout */}
      <div className="hidden md:flex flex-1">
        {activeMenu === 1 && (
          <>
            <div className="w-[30%] border-r border-[#27272A]">
              <ChatsList
                onSelectChat={(chat) => setSelectedChat(chat)}
                onCreateChat={() => setIsUserListOpen(true)}
              />
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
            {/* <div className="text-center">
              <p className="text-2xl mb-2">📞</p>
              <p>Calls feature coming soon</p>
            </div> */}
            <CallHistoryList onBack={() => setActiveMenu(1)} />
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
          <div className="flex flex-1 items-center justify-center text-gray-400">
            <CallHistoryList onBack={() => setActiveMenu(1)} />
          </div>
        )}
        {/*
        <div className="flex flex-1 md:hidden">
          {isSettingsOpen && (
            <div className="flex-1 flex h-screen relative overflow-hidden ">
              <Settings
                onLogout={() => console.log("Logged out")}
                onClose={() => setIsSettingsOpen(false)}
              />
            </div>
          )}
        </div> */}
      </div>

      {/* Settings */}
      {isSettingsOpen && (
        <div className="absolute inset-0 z-50 bg-black/40">
          <Settings
            onClose={() => setIsSettingsOpen(false)}
            onLogout={() => console.log("Logged out")}
          />
        </div>
      )}

      {/* ✅ Profile Panel */}
      <ProfilePanel
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* ✅ My Profile Panel (for logged-in user) */}
      {isMyProfileOpen && (
        <MyProfile
          onClose={() => setIsMyProfileOpen(false)}
          user={user}
          onUpdate={(updatedUser) => setUser(updatedUser)}
        />
      )}

      {/* ✅ Notifications - Available on both desktop and mobile */}
      {isNotificationsOpen && (
        <Notifications
          notifications={notifications}
          onAccept={handleAccept}
          onReject={handleReject}
          onClose={() => setIsNotificationsOpen(false)}
        />
      )}

      {/* User List drawer */}
      {isUserListOpen && (
        <UserListDrawer
          isOpen={isUserListOpen}
          users={dummyUsers}
          onClose={() => setIsUserListOpen(false)}
          onUserSelect={(user) => {
            setSelectedUser(user);
            setIsUserListOpen(false);
            setIsUserProfileOpen(true);
          }}
        />
      )}

      {/* User Profile Drawer */}
      {isUserProfileOpen && selectedUser && (
        <UserProfileDrawer
          isOpen={isUserProfileOpen}
          user={selectedUser}
          onClose={() => setIsUserProfileOpen(false)}
        />
      )}
    </div>
  );
};
