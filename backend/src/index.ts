import "dotenv/config";
import express, { Request, Response } from "express";
import { PORT } from "./config/config";
import {
  clerkClient,
  requireAuth,
  getAuth,
  clerkMiddleware,
} from "@clerk/express";
import { prismaClient } from "./lib/db";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from server");
});

app.get("/test", (req: Request, res: Response) => {
  res.json({
    message: "Backend is working!",
    timestamp: new Date().toISOString(),
  });
});

// Test database connection
app.get("/test-db", async (req: Request, res: Response) => {
  try {
    const users = await prismaClient.user.findMany();
    res.json({
      success: true,
      count: users.length,
      users: users.map((u) => ({ id: u.id, email: u.email, name: u.name })),
    });
  } catch (err: any) {
    console.error("Database test error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/login", requireAuth(), async (req, res) => {
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
});

// Get current user endpoint
app.get("/me", requireAuth(), async (req, res) => {
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
});

app.use((err: any, req: Request, res: Response, next: any) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
