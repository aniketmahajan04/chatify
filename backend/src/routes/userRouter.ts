import { Router } from "express";
import {
    login,
    profile,
    friendRequests,
    getAllUser,
    sendFriendRequest,
} from "../controllers/user";

const userRouter = Router();

userRouter.post("/login", login);
userRouter.get("/me", profile);
userRouter.get("/notifications/", friendRequests);
userRouter.post("/notifications/", sendFriendRequest);
userRouter.get("/all", getAllUser);

export default userRouter;
