import { Server } from "socket.io";
import { verifyToken } from "@clerk/backend";
import { prismaClient } from "../lib/db";
import { sendMessageToChat } from "./messageRouter";

interface MsgPayload {
  id: string,
  chatId: string,
  senderId: string,
  content: string,
  createdAt: Date,
}

// Track: userId → Set of socketIds
export const userSocket = new Map<string, Set<string>>();

// Track: socketId → userId
export const socketUser = new Map<string, string>();

// Track: chatId -> userId
export const chatParticipants = new Map<string, Set<string>>();

const addChatsInChatParticipants = (chatId: string, userId: string) => {
  if (!chatParticipants.has(chatId)) {
    chatParticipants.set(chatId, new Set());
  }

  chatParticipants.get(chatId)?.add(userId);
}

const getChatOfUser = async (userId: string) => {
  const userAllChats = await prismaClient.chat.findMany({
    where: {
      participants: { some: { userId: userId } }
    },
    select: { id: true }
  });

  return userAllChats
}

const addSockets = (userId: string, socketId: string) => {
  if (!userSocket.has(userId)) {
    userSocket.set(userId, new Set());
  }

  userSocket.get(userId)?.add(socketId);
  socketUser.set(socketId, userId);
}

const removeSockets = (socketId: string) => {
  const userId = socketUser.get(socketId);
  if (!userId) return;

  const sockets = userSocket.get(userId);
  if (sockets) {
    sockets.delete(socketId);
    // if user has no sockets left, remove them from userSocket
    if (sockets?.size === 0) {
      userSocket.delete(userId);
    }
  }

  socketUser.delete(socketId);
}

export function socketServer(io: Server) {
  io.use(async (socket, next) => {
    try {
      const token =
        socket.handshake.auth?.token ||
        socket.handshake.headers["authorization"]?.toString()
          .replace(/^Bearer\s+/, "");
      console.log("Provided token: ", token);

      if (!token) return next(new Error("Auth token not provided!"));

      const payload = await verifyToken(token, { secretKey: process.env.CLERK_SECRET_KEY }) as any;

      const userId = payload.sub;
      console.log(userId);

      if (!userId) return next(new Error("Unauthorized: invalid token"));

      socket.data.userId = userId;
      socket.data.user = {
        id: userId,
        email: payload.email,
      }


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

    for (const chat of usersChat) {
      addChatsInChatParticipants(chat.id, userId);
    }


    socket.on("chat:message", async (msg) => {
      if(!msg.chatId || !msg.content) return ;

      const savedMessage = await prismaClient.message.create({
        data: {
          content: msg.content,
          chatId: msg.chatId,
          senderId: userId
        }
      });

      const messagePayload = {
        id: savedMessage.id,
        content: savedMessage.content,
        senderId: savedMessage.senderId,
        chatId: savedMessage.chatId,
        createdAt: savedMessage.createdAt,
      };

      sendMessageToChat(io, msg.chatId, messagePayload);
    })

    socket.on("disconnect", async () => {
      const freshChats = await getChatOfUser(userId);
      removeSockets(socket.id);

      for (const chat of freshChats) {
        chatParticipants.get(chat.id)?.delete(userId);

        if (chatParticipants.get(chat.id)?.size === 0) {
          chatParticipants.delete(chat.id);
        }
      }
    });

    socket.emit("connected", {
      message: "Successfully  connected to socket server!",
      userId: userId
    });
  });
}
