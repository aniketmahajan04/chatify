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

app.post("/login", requireAuth(), async (req, res) => {
  try {
    const { userId } = getAuth(req);

    if (!userId) return res.status(401).json({ msg: "Failed to get userId" });

    const clerkUser = await clerkClient.users.getUser(userId);

    // const newUser = {
    //   id: user.id,
    //   email: user.emailAddresses[0].emailAddress,
    //   name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
    // };

    let existing = await prismaClient.user.findUnique({
      where: { id: clerkUser.id },
    });
    if (!existing) {
      existing = await prismaClient.user.create({
        data: {
          id: clerkUser.id,
          name: `${clerkUser.firstName || ""} ${
            clerkUser.lastName || ""
          }`.trim(),
          email: clerkUser.emailAddresses[0].emailAddress,
        },
      });
    } else {
      console.log("User already exists in database:", existing.email);
    }

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
      where: { id: userId },
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

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
