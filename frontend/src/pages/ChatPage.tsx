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
import { CreateGroupDrawer } from "../components/CreateGroupDrawer.tsx";
import { useUserStore } from "../store/userStore.ts";
import { SocketProvider } from "../components/SocketContext.tsx";

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
    const [isUserListOpen, setIsUserListOpen] = useState(false);
    const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [isGroupDrawerOpen, setIsGroupDrawerOpen] = useState(false);

    const { currentUser, setCurrentUser } = useUserStore();

    const handleMenuChange = (menuId: number) => {
        setActiveMenu(menuId);
        setSelectedChat(null); // Reset selected chat when switching menus
    };

    return (
        <div className="flex h-screen relative overflow-hidden">
            {/* Sidebar */}
            <SocketProvider>
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
                                    onSelectChat={(chat) =>
                                        setSelectedChat(chat)
                                    }
                                    onCreateChat={() => setIsUserListOpen(true)}
                                    onCreateGroup={() =>
                                        setIsGroupDrawerOpen(true)
                                    }
                                />
                            </div>

                            <div className="flex-1 relative">
                                {selectedChat ? (
                                    <IndividualChat
                                        chat={selectedChat}
                                        onOpenProfile={() =>
                                            setIsProfileOpen(true)
                                        }
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
                            <CallHistoryList onBack={() => setActiveMenu(1)} />
                        </div>
                    )}
                </div>

                {/* ✅ Mobile layout */}
                <div className="flex flex-1 md:hidden">
                    {activeMenu === 1 && (
                        <>
                            {!selectedChat ? (
                                <ChatsList
                                    onSelectChat={(chat) =>
                                        setSelectedChat(chat)
                                    }
                                    onCreateChat={() => setIsUserListOpen(true)} // this is setting create chat option true
                                    onCreateGroup={() =>
                                        setIsGroupDrawerOpen(true)
                                    }
                                />
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
                {isMyProfileOpen && currentUser && (
                    <MyProfile
                        onClose={() => setIsMyProfileOpen(false)}
                        user={currentUser}
                        onUpdate={(updatedUser) =>
                            setCurrentUser({ ...currentUser, ...updatedUser })
                        }
                    />
                )}

                {/* ✅ Notifications - Available on both desktop and mobile */}
                {isNotificationsOpen && (
                    <Notifications
                        onClose={() => setIsNotificationsOpen(false)}
                    />
                )}

                {/* User List drawer */}
                {isUserListOpen && (
                    <UserListDrawer
                        isOpen={isUserListOpen}
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

                {/* Group Create Drawer  */}
                {isGroupDrawerOpen && (
                    <CreateGroupDrawer
                        isOpen={isGroupDrawerOpen}
                        onClose={() => setIsGroupDrawerOpen(false)}
                        onCreate={(group) => console.log("new group", group)}
                        users={dummyUsers}
                    />
                )}
            </SocketProvider>
        </div>
    );
};
