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
// Use requireAuth() to protect this route
// If user isn't authenticated, requireAuth() will redirect back to the homepage
app.get("/protected", requireAuth(), async (req, res) => {
  // Use `getAuth()` to get the user's `userId`
  const auth = getAuth(req);
  console.log(auth);

  if (!auth.userId) return res.status(401).json({ error: "No user session" });
  // Use Clerk's JavaScript Backend SDK to get the user's User object
  const user = await clerkClient.users.getUser(auth.userId);

  return res.json({ user });
});

app.post("/sync-user", requireAuth(), async (req, res) => {
  const { userId } = getAuth(req);
  if (!userId) return res.json({ msg: "Failed to get userId" });
  const user = await clerkClient.users.getUser(userId);
  const newUser = {
    id: user.id,
    email: user.emailAddresses[0].emailAddress,
    name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
  };

  let existing = await prismaClient.user.findUnique({ where: { id: user.id } });
  if (!existing) {
    existing = await prismaClient.user.create({ data: newUser });
  }

  res.json({ success: true, user: existing });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
