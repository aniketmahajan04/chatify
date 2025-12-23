import { Server } from "socket.io";
import { verifyToken } from "@clerk/backend";
import { prismaClient } from "../lib/db";
// import { sendMessageToChat } from "./messageRouter";

interface MsgPayload {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  createdAt: Date;
}

// Track: userId → Set of socketIds
export const userSocket = new Map<string, Set<string>>();

// Track: socketId → userId
export const socketUser = new Map<string, string>();

const getChatOfUser = async (userId: string) => {
  const userAllChats = await prismaClient.chat.findMany({
    where: {
      participants: { some: { userId } },
    },
    include: {
      participants: { select: { userId: true } },
    },
  });

  return userAllChats;
};

const addSockets = (userId: string, socketId: string) => {
  if (!userSocket.has(userId)) {
    userSocket.set(userId, new Set());
  }

  userSocket.get(userId)?.add(socketId);
  socketUser.set(socketId, userId);
};

const removeSockets = (socketId: string): boolean => {
  const userId = socketUser.get(socketId);
  if (!userId) return false;

  const sockets = userSocket.get(userId);
  if (sockets) {
    sockets.delete(socketId);
    // if user has no sockets left, remove them from userSocket
    if (sockets?.size === 0) {
      userSocket.delete(userId);
      return true;
    }
  }

  socketUser.delete(socketId);
  return false;
};

export function socketServer(io: Server) {
  io.use(async (socket, next) => {
    try {
      const token =
        socket.handshake.auth?.token ||
        socket.handshake.headers["authorization"]
          ?.toString()
          .replace(/^Bearer\s+/, "");

      if (!token) return next(new Error("Auth token not provided!"));

      const payload = (await verifyToken(token, {
        secretKey: process.env.CLERK_SECRET_KEY,
      })) as any;

      const userId = payload.sub;

      if (!userId) return next(new Error("Unauthorized: invalid token"));

      socket.data.userId = userId;
      return next();
    } catch (err: any) {
      console.log("Socket auth failed: ", err);
      return next(new Error("Unauthorized"));
    }
  });

  io.on("connection", async (socket) => {
    const userId = socket.data.userId;
    console.log(`socket connected: ${socket.id} user=${userId}`);
    addSockets(userId, socket.id);

    const usersChat = await getChatOfUser(userId);

    // Store chats in socket data for later use
    socket.data.userChats = usersChat;

    // Emit online status only to users in the same chats
    for (const chat of usersChat) {
      socket.join(chat.id);
      // Notify all participants in this chat that this user is online
      io.to(chat.id).emit("user:online", { userId });
    }
    console.log(`User ${userId} joined rooms: ${[...socket.rooms].join(", ")}`);

    socket.on(
      "chat:message",
      async (msg: { chatId: string; content: string }) => {
        if (!msg.chatId || !msg.content) return;
        try {
          const savedMessage = await prismaClient.message.create({
            data: {
              content: msg.content,
              chatId: msg.chatId,
              senderId: userId,
            },
          });
          console.log(savedMessage);

          const messagePayload: MsgPayload = {
            id: savedMessage.id,
            content: savedMessage.content,
            senderId: savedMessage.senderId,
            chatId: savedMessage.chatId,
            createdAt: savedMessage.createdAt,
          };

          // sendMessageToChat(io, msg.chatId, messagePayload);
          io.to(msg.chatId).emit("chat:message:receive", messagePayload);
          console.log(`Message sent to room ${msg.chatId}`);
        } catch (err) {
          console.error("Prisma create failed ", err);
        }
      }
    );

    // Handler to check if a user is online
    socket.on("user:check:online", (data: { userId: string }) => {
      const isOnline = userSocket.has(data.userId);
      socket.emit("user:status", { userId: data.userId, isOnline });
    });

    socket.on("disconnect", async () => {
      const isOffline = removeSockets(socket.id);
      if (isOffline) {
        // Use stored chats to avoid extra database query
        const usersChat = socket.data.userChats || [];
        for (const chat of usersChat) {
          io.to(chat.id).emit("user:offline", { userId });
        }
      }
    });

    socket.emit("connected", {
      message: "Successfully  connected to socket server!",
      userId: userId,
    });
  });
}
