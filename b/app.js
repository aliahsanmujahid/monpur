const express = require("express");
const dbCreate = require("./routes/dbcreate");
const userRouter = require("./routes/user");
const path = require('path');
require("dotenv").config();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.join('images')));


  app.use("/api/user", userRouter);
  app.use("/db", dbCreate);


  const port = process.env.PORT || 8000;

  const httpServer = http.Server(app);
  const io = new Server(httpServer, { cors: { origin: '*' } });
  let activeUsers = [];


  
io.on("connection", (socket) => {


  socket.on("new-user-add", (newUserId) => {
    if (!activeUsers.some((user) => user.userId == newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
    }
    //console.log("Joining",activeUsers)
    io.emit("get-users", activeUsers);
  });

  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    io.emit("get-users", activeUsers);
  });

  socket.on("disconnect2", (userId) => {
    console.log(userId);
    console.log(activeUsers);
    activeUsers = activeUsers.filter((user) => user.userId !== userId);
    io.emit("get-users", activeUsers);
  });

  socket.on("send-message", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId == receiverId);
    if (user) {
      io.to(user.socketId).emit("recieve-message", data);
    }
  });
  socket.on("chat-send", (data) => {
    const { receiverId } = data;
    const user = activeUsers.find((user) => user.userId == receiverId);
    if (user) {
      io.to(user.socketId).emit("chat-get", data);
    }
  });  


});



  httpServer.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`);
  });
  
  