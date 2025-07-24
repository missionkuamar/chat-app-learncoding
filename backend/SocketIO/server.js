import http from "http";
import express from "express";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

const users = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    users[userId] = socket.id;
  }

  io.emit("getOnlineUser", Object.keys(users));

  socket.on("disconnect", () => {
    if (userId) {
      delete users[userId];
    }
    io.emit("getOnlineUser", Object.keys(users));
  });
});

export const getReceiverSocketId = (receiverId) => users[receiverId];

export { app, io, server };
