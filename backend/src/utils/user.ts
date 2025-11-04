import { getAuth } from "@clerk/express";
import { Request, Response } from "express";
import { prismaClient } from "../lib/db";

export const getCurrentUser = async (req: Request, _res: Response) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      // return res.status(401).json({ success: false, message: "Unauthorized" });
      return null;
    }

    const user = await prismaClient.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    return user;
  } catch (err: any) {
    console.error("Get user error:", err);
    // res.status(500).json({ success: false, message: err.message });
    return null;
  }
};
