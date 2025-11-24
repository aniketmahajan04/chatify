import { Server } from "socket.io";
import { verifyToken } from "@clerk/backend";


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
  io.on("connection", (socket) => {
    const userId = socket.data.userId;
    console.log(`socket connected: ${socket.id} user=${userId}`);



    socket.on("disconnect", (reason) => {
      console.log(`socket disconnect: ${socket.id} user=${userId} reason=${reason}`)
    });

    socket.emit("connected", {
      message: "Successfully  connected to socket server!",
      userId: userId
    });
  });
}
