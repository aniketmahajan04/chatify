import { chatParticipants, userSocket } from "./socket";
import type { Server } from "socket.io";

export const emitToUser = (io: Server, userId: string, event: string, payload: any) => {
  const sockets = userSocket.get(userId);
  if (!sockets) return;

  console.log("[EMIT] to user:", userId,
    "sockets:", [...sockets]);
  for (const socketId of sockets) {
    io.to(socketId).emit(event, payload);
  }
}

export const sendMessageToChat = (
  io: Server,
  chatId: string,
  message: any
) => {
  const participants = chatParticipants.get(chatId);
  if (!participants) return;
  console.log("[ROUTING] chatId:", chatId,
    "participants:", [...participants]);


  for (const userId of participants) {
    emitToUser(io, userId, "chat:message", message);
  }
}
