import { getAuth, clerkClient } from "@clerk/express";
import { Request, Response } from "express";
import { prismaClient } from "../lib/db";

export const getCurrentUser = async (req: Request, _res: Response) => {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            // return res.status(401).json({ success: false, message: "Unauthorized" });
            return null;
        }

        let user = await prismaClient.user.findUnique({
            where: {
                clerkId: userId,
            },
        });

        // If user doesn't exist -> create it
        if (!user) {
            const clerkUser = await clerkClient.users.getUser(userId);

            user = await prismaClient.user.create({
                data: {
                    clerkId: userId,
                    name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
                    email: clerkUser.emailAddresses[0].emailAddress,
                    avatar: clerkUser.imageUrl,
                },
            });

            console.log("🆕 Created new Prisma user:", user.email);
        }

        return user;
    } catch (err: any) {
        console.error("Get user error:", err);
        // res.status(500).json({ success: false, message: err.message });
        return null;
    }
};
