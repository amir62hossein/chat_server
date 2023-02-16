const express = require("express");
const http = require("http");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8080;
const server = http.createServer(app);
const io = require("socket.io")(server);

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  const socketId = socket.id;
  console.log(userId);

  socket.on("disconnect", (event) => {
    console.log("userId: " + userId + "disconnect");
  });
  
});

server.listen(port, () => {
  console.log("server listening on port 8080");
});
