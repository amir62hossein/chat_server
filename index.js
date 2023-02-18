const express = require("express");
const http = require("http");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8080;
const server = http.createServer(app);
const io = require("socket.io")(server);
const users = [];

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log(`user: ${userId} connected`);
  const socketId = socket.id;
  users.push({
    userId,
    socketId,
  });

  socket.on("send-message", (message) => {
    const filteredUser = users.filter((elem) => elem.userId === message.to);
    const receiverSocketId = filteredUser[0].socketId;
    socket.broadcast
      .to(receiverSocketId)
      .emit("onMessage", { message: message.message, from: userId });
  });

  socket.on("disconnect", (event) => {
    console.log("userId: " + userId + "   disconnect");
    const index = users.indexOf((elem) => elem.userId === userId);
    users.slice(index, 1);
  });
});

server.listen(port, () => {
  console.log("server listening on port 8080");
});
