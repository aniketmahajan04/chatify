import { Router } from "express";
import {
  getAllChats,
  createNewChat,
  deleteChat,
  getMessagesOfChatById,
  startCall,
  endCall,
} from "../controllers/chat";

const chatRouter = Router();

chatRouter.get("/all", getAllChats);
chatRouter.post("/new", createNewChat);
chatRouter.delete("/delete/:id", deleteChat);
chatRouter.get("/:chatId/messages", getMessagesOfChatById);
chatRouter.post("/call/start", startCall);
chatRouter.post("/:callId/end", endCall);
chatRouter.get("/callHistory");

export default chatRouter;
