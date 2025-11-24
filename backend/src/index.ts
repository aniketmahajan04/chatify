import "dotenv/config";
import express, { Request, Response } from "express";
import { PORT } from "./config/config";
import { requireAuth, clerkMiddleware } from "@clerk/express";
import cors from "cors";
import userRouter from "./routes/userRouter";
import chatRouter from "./routes/chatRouter";
import { socketServer } from "./websockets/socket";
import http from "http";
import { Server } from "socket.io";

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

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
  transports: ['websocket', 'polling']
})

socketServer(io);

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
