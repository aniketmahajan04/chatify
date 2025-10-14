import { ChatsList } from "../components/ChatList";
import { IndividualChat } from "../components/IndividualChat";
import { SideBar } from "../components/SideBar";

export const ChatPage = () => {
  return (
    <>
      <div className="flex ">
        <SideBar />
        <ChatsList />
        <IndividualChat />
      </div>
    </>
  );
};
