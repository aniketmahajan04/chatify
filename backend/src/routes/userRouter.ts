import { Router } from "express";
import {
    login,
    profile,
    friendRequests,
    getAllUser,
    sendFriendRequest,
    updateFriendRequestStatus,
} from "../controllers/user";

const userRouter = Router();

userRouter.post("/login", login);
userRouter.get("/me", profile);
userRouter.get("/notifications", friendRequests);
userRouter.post("/notifications", sendFriendRequest);
userRouter.put("/notifications/:id", updateFriendRequestStatus);
userRouter.get("/all", getAllUser);

export default userRouter;
