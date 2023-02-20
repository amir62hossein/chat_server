const express = require("express");
const http = require("http");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8080;
const server = http.createServer(app);
const io = require("socket.io")(server);
const db = require("./db/index");
const users = [];
const userApi = require("./api/user.routes");

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log(`user: ${userId} connected`);
  const socketId = socket.id;
  users.push({
    userId,
    socketId,
  });

  // send message to single Person or in Room
  /*
    message json
    {
      "message" : "some message",
      "to" : "socketId"
    }

  */
  socket.on("send-message", (event) => {
    if (!event.roomId) {
      // send to room
      io.to(event.roomId).emit("onMessage", {
        message: event.message,
        from: userId,
        room: event.roomId,
      });
    } else {
      // send message to person
      const filteredUser = users.filter((elem) => elem.userId === event.to);
      if (filteredUser.length > 0) {
        const receiverSocketId = filteredUser[0].socketId;
        socket.broadcast
          .to(receiverSocketId)
          .emit("onMessage", { message: event.message, from: userId });
      }
      // define emit in client
    }
  });

  // Join person to new Room
  socket.on("join-room", (event) => {
    socket.join(`ROOM ${event.roomId}`);
    console.log(`user ${userId} join room `);
  });
  // Leave person from Room
  socket.on("leave-room", (event) => {
    socket.leave(`ROOM ${event.roomId}`);
    console.log(`user ${userId} left the room `);
  });

  // disconnect user from server
  socket.on("disconnect", (event) => {
    console.log("userId: " + userId + "   disconnect");
    const index = users.indexOf((elem) => elem.userId === userId);
    users.slice(index, 1);
  });
});
app.use(express.json())
app.use(userApi);

server.listen(port, () => {
  console.log("server listening on port 8080");
});
