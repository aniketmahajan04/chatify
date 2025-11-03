import { Router } from "express";
import { login, profile, friendRequests } from "../controllers/user";

const userRouter = Router();

userRouter.post("/login", login);
userRouter.get("/me", profile);
userRouter.get("/notifications/", friendRequests);

export default userRouter;
