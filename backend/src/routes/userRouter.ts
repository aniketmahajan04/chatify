import { Router } from "express";
import { login, profile } from "../controllers/user";

const userRouter = Router();

userRouter.post("/login", login);
userRouter.get("/me", profile);

export default userRouter;
