import { Request, Response } from "express";
import { clerkClient, getAuth } from "@clerk/express";
import { prismaClient } from "../lib/db";

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

export { login, profile };
