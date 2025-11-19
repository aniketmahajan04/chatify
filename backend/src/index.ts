import "dotenv/config";
import express, { Request, Response } from "express";
import { PORT } from "./config/config";
import { requireAuth, clerkMiddleware } from "@clerk/express";
import { prismaClient } from "./lib/db";
import cors from "cors";
import userRouter from "./routes/userRouter";
import chatRouter from "./routes/chatRouter";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);
app.use(express.json());
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
      users: users.map((u) => ({
        id: u.id,
        email: u.email,
        name: u.name,
      })),
    });
  } catch (err: any) {
    console.error("Database test error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.use("/user", requireAuth(), userRouter);
app.use("/chat", requireAuth(), chatRouter);

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
