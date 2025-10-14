// import { useState } from "react";
// import { ChatsList } from "../components/ChatList";
// import { IndividualChat } from "../components/IndividualChat";
// import { SideBar } from "../components/SideBar";

// export type Chat = {
//   id: number;
//   name: string;
//   avatar: string;
//   lastMessage: string;
//   time: string;
//   unread: number;
// };

// export const ChatPage = () => {
//   const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar (always visible on desktop) */}
//       <SideBar />

//       {/* ✅ Desktop layout */}
//       <div className="hidden md:flex flex-1">
//         {/* Chats list */}
//         <div className="w-[30%] border-r border-[#27272A]">
//           <ChatsList onSelectChat={(chat) => setSelectedChat(chat)} />
//         </div>

//         {/* Chat area */}
//         <div className="flex-1">
//           {selectedChat ? (
//             <IndividualChat chat={selectedChat} />
//           ) : (
//             <div className="flex h-full items-center justify-center text-gray-400">
//               Select a chat to start messaging
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ✅ Mobile layout (toggle between list and chat) */}
//       <div className="flex flex-1 md:hidden">
//         {!selectedChat ? (
//           <ChatsList onSelectChat={(chat) => setSelectedChat(chat)} />
//         ) : (
//           <IndividualChat
//             chat={selectedChat}
//             onBack={() => setSelectedChat(null)}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

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
  const [activeMenu, setActiveMenu] = useState(1); // 1 = Chats, 2 = Calls

  const handleMenuChange = (menuId: number) => {
    setActiveMenu(menuId);
    setSelectedChat(null); // Reset selected chat when switching menus
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar (always visible on desktop) */}
      <SideBar activeMenu={activeMenu} onMenuChange={handleMenuChange} />

      {/* ✅ Desktop layout */}
      <div className="hidden md:flex flex-1">
        {/* Chats list or Calls list based on activeMenu */}
        {activeMenu === 1 && (
          <>
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

      {/* ✅ Mobile layout (toggle between list and chat) */}
      <div className="flex flex-1 md:hidden">
        {activeMenu === 1 && (
          <>
            {!selectedChat ? (
              <ChatsList onSelectChat={(chat) => setSelectedChat(chat)} />
            ) : (
              <IndividualChat
                chat={selectedChat}
                onBack={() => setSelectedChat(null)}
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
      </div>
    </div>
  );
};
