import { ChatsList } from "../components/ChatList";
import { SideBar } from "../components/SideBar";

export const ChatPage = () => {
  return (
    <>
      <div className="flex ">
        <SideBar />
        <ChatsList />
      </div>
    </>
  );
};
