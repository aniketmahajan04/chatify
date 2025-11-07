import { Router } from "express";
import { getAllChats, createNewChat, deleteChat } from "../controllers/chat";

const chatRouter = Router();

chatRouter.get("/all", getAllChats);
chatRouter.post("/new", createNewChat);
chatRouter.delete("/delete/:id", deleteChat);

export default chatRouter;
