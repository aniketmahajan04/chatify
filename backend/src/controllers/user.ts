import { Request, Response } from "express";
import { clerkClient, getAuth } from "@clerk/express";
import { prismaClient } from "../lib/db";
import { getCurrentUser } from "../utils/user";

const login = async (req: Request, res: Response) => {
  try {
    console.log("Login endpoint called");
    const { userId } = getAuth(req);
    console.log("UserId from auth:", userId);

    if (!userId) {
      return res.status(401).json({ msg: "Failed to get userId" });
    }
    console.log("Getting user from Clerk...");
    const clerkUser = await clerkClient.users.getUser(userId);
    console.log("Clerk user details:", {
      id: clerkUser.id,
      email: clerkUser.emailAddresses[0]?.emailAddress,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      createdAt: clerkUser.createdAt,
    });

    // const newUser = {
    //   id: user.id,
    //   email: user.emailAddresses[0].emailAddress,
    //   name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
    // };

    const userEmail = clerkUser.emailAddresses[0]?.emailAddress;
    const userName =
      `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
      "User";

    if (!userEmail) {
      console.error("No email found for user");
      return res.status(400).json({
        success: false,
        message: "User email not found",
      });
    }

    console.log("Checking if user exists in database...");
    let existing = await prismaClient.user.findUnique({
      where: { clerkId: clerkUser.id },
    });

    if (!existing) {
      console.log("User not found, creating new user...");
      try {
        existing = await prismaClient.user.create({
          data: {
            clerkId: clerkUser.id,
            name: userName,
            email: userEmail,
          },
        });
        console.log("User created successfully:", existing.email);
      } catch (createError: any) {
        console.error("Error creating user:", createError);

        // Check if it's a unique constraint error (user might have been created by another request)
        if (createError.code === "P2002") {
          console.log("User was created by another request, fetching...");
          existing = await prismaClient.user.findUnique({
            where: { clerkId: clerkUser.id },
          });
        } else {
          throw createError;
        }
      }
    } else {
      console.log("User already exists in database:", existing.email);
    }

    console.log("Sending response...");
    res.json({ success: true, user: existing });
  } catch (err: any) {
    console.error("Login/sync error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const profile = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await prismaClient.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (err: any) {
    console.error("Get user error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    // const user = getCurrentUser(req, res);
    // if (!user) {
    //   return res.status(401).json({ success: false, message: "Unauthorized" });
    // }

    const allUsers = await prismaClient.user.findMany({
      select: {
        id: true,
        name: true,
        avatar: true,
        bio: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return res.json(allUsers);
  } catch (err: any) {
    console.error("Fetch all user error", err);
    return res.status(404).json({ success: false, message: "User not found" });
  }
};

const friendRequests = async (req: Request, res: Response) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const user = await prismaClient.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const friendRequests = await prismaClient.notifications.findMany({
      where: {
        receiverId: user.id,
      },
      include: { sender: true },
      orderBy: { createdAt: "desc" },
    });

    // Enrich each notification with sender's Clerk profile (e.g., avatar)
    const enriched = await Promise.all(
      friendRequests.map(async (n) => {
        let senderAvatar: string | null = null;
        let senderName: string | null = n.sender?.name ?? null;
        try {
          if (n.sender?.clerkId) {
            const clerkUser = await clerkClient.users.getUser(n.sender.clerkId);
            senderAvatar = clerkUser.imageUrl ?? null;
            if (!senderName) {
              const fullName = `${clerkUser.firstName || ""} ${
                clerkUser.lastName || ""
              }`.trim();
              senderName =
                fullName ||
                clerkUser.username ||
                clerkUser.emailAddresses[0]?.emailAddress ||
                null;
            }
          }
        } catch (e) {
          // If Clerk lookup fails, continue without avatar
        }
        return {
          id: n.id,
          status: n.status,
          createdAt: n.createdAt,
          senderId: n.senderId,
          receiverId: n.receiverId,
          // frontend-friendly fields
          senderName,
          senderAvatar,
        };
      })
    );

    return res.json(enriched);
  } catch (err: any) {
    console.error("Get user error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const sendFriendRequest = async (req: Request, res: Response) => {
  const user = await getCurrentUser(req, res);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
};

export { login, profile, friendRequests };
