const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const rooms = {}; // roomId: { clients: [{ userId, socketID, userName }], adminId }

io.on("connection", (socket) => {
  console.log("A new socket connected:", socket.id);

  socket.on("join", ({ roomId, userName, userId }) => {
    console.log(`user joined room: ${roomId}\nUserName: ${userName}`);

    if (!rooms[roomId]) {
      rooms[roomId] = {
        clients: [],
        adminId: userId,
      };
    }

    const alreadyExists = rooms[roomId].clients.some(user => user.userId === userId);
    if (!alreadyExists) {
      rooms[roomId].clients.push({
        socketID: socket.id,
        userName,
        userId,
      });
    }

    socket.join(roomId);

    io.to(roomId).emit("userJoined", {
      clients: rooms[roomId].clients,
      adminId: rooms[roomId].adminId,
    });

    socket.emit("joined-successfully", { roomId, userName });
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
    for (const roomId in rooms) {
      rooms[roomId].clients = rooms[roomId].clients.filter(
        user => user.socketID !== socket.id
      );

      if (rooms[roomId].clients.length === 0) {
        delete rooms[roomId];
      } else {
        io.to(roomId).emit("userJoined", {
          clients: rooms[roomId].clients,
          adminId: rooms[roomId].adminId,
        });
      }
    }
  });

    // code changing
    socket.on("codeChange", ({roomId, code})=>{
      console.log(`code changed in room: ${roomId}\nCode: ${code}`); // Uncommented for logging
      socket.to(roomId).emit('codeUpdate', code)
    })

  socket.in('disconnect', ()=>{
    console.log('socket disconnected', socket.id)
  })
});









app.get("/", (req, res) => {
  res.json({ message: "Server is running." });
});










const port = process.env.PORT || 6948;
server.listen(port, () => console.log("Server started on:", port));
