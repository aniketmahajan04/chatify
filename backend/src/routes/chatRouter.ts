import { Router } from "express";

const chatRouter = Router();

chatRouter.post("/new", newChat);

export default chatRouter;
