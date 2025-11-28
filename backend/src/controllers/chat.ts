import { Request, Response } from "express";
import { getCurrentUser } from "../utils/user";
import { prismaClient } from "../lib/db";

const getAllChats = async (req: Request, res: Response) => {
    try {
        const user = await getCurrentUser(req, res);
        console.log("Auth user: ", user?.clerkId);

        if (!user) {
            return res
                .status(401)
                .json({ success: false, message: "Unauthorized" });
        }

        // get prisma user by clerkId
        const prismaUser = await prismaClient.user.findUnique({
            where: { id: user.id },
        });

        console.log("Found user by clerkId: ", prismaUser);

        if (!prismaUser) {
            return res.status(404).json({
                success: false,
                message: "User not found in DB",
            });
        }

        const allChats = await prismaClient.chat.findMany({
            where: {
                participants: {
                    some: { userId: prismaUser.id },
                },
            },
            include: {
                participants: {
                    include: { user: true },
                },
                messages: {
                    include: {
                        sender: true,
                    },
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

const createNewChat = async (req: Request, res: Response) => {
    try {
        const user = await getCurrentUser(req, res);
        const { participants, name, isGroup } = req.body;

        if (!user) {
            return res
                .status(401)
                .json({ success: false, message: "Unauthorized" });
        }

        const prismaUser = await prismaClient.user.findUnique({
            where: { id: user.id },
        });

        if (!prismaUser) {
            return res.status(404).json({ message: "User not found in DB" });
        }

        if (!Array.isArray(participants) || participants.length === 0) {
            return res.status(400).json({
                success: false,
                message: "At least one participants is requiered",
            });
        }

        // Fileter out null/undefined participants
        const validParticipants = participants.filter(Boolean);
        if (validParticipants.length === 0) {
            return res.status(400).json({
                message: "No valid participants",
            });
        }

        const dbParticipants = await prismaClient.user.findMany({
            where: { clerkId: { in: validParticipants } },
            select: { id: true },
        });

        if (!isGroup && dbParticipants.length === 1) {
            // 1-on-1 check if already exists.
            const existingChat = await prismaClient.chat.findFirst({
                where: {
                    isGroup: false,
                    participants: {
                        some: {
                            userId: prismaUser.id,
                        },
                    },
                    AND: {
                        participants: {
                            some: { userId: dbParticipants[0].id },
                        },
                    },
                },
            });

            if (existingChat) return res.json(existingChat);
        }

        const chat = await prismaClient.chat.create({
            data: {
                name: isGroup ? name : null,
                isGroup,
                participants: {
                    create: [
                        { userId: prismaUser.id, role: "admin" },
                        ...dbParticipants.map((p) => ({
                            userId: p.id,
                        })),
                    ],
                },
            },
            include: {
                participants: { include: { user: true } },
            },
        });

        return res.status(200).json(chat);
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
