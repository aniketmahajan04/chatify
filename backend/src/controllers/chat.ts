import { Request, Response } from "express";
import { getCurrentUser } from "../utils/user";
import { prismaClient } from "../lib/db";

const getAllChats = async (req: Request, res: Response) => {
    try {
        const user = await getCurrentUser(req, res);

        if (!user) {
            return res
                .status(401)
                .json({ success: false, message: "Unauthorized" });
        }

        const allChats = await prismaClient.chat.findMany({
            where: {
                participants: {
                    some: { userId: user.id },
                },
            },
            include: {
                participants: {
                    include: { user: true },
                },
                messages: {
                    orderBy: { createdAt: "desc" },
                    take: 1,
                },
            },
            orderBy: { updatedAt: "desc" },
        });

        return res.json(allChats);
    } catch (err: any) {
        console.error("Fetch chat error: ", err);
        res.status(500).json({ success: false, msg: err.message });
    }
};

const createNewChat = (req: Request, res: Response) => {
    try {
    } catch (err: any) {
        console.error("create chat error: ", err);
        res.status(500).json({ success: false, msg: err.message });
    }
};

const deleteChat = (req: Request, res: Response) => {
    try {
    } catch (err: any) {
        console.error("delete chat error: ", err);
        res.status(500).json({ success: false, msg: err.message });
    }
};
export { getAllChats, createNewChat, deleteChat };
