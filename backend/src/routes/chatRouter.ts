import { Router } from "express";
import {
    getAllChats,
    createNewChat,
    deleteChat,
    getMessagesOfChatById,
} from "../controllers/chat";

const chatRouter = Router();

chatRouter.get("/all", getAllChats);
chatRouter.post("/new", createNewChat);
chatRouter.delete("/delete/:id", deleteChat);
chatRouter.get("/:chatId/messages", getMessagesOfChatById);

export default chatRouter;
