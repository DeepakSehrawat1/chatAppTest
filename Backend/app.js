const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const sequelize = require("./util/db.js");
const User = require("./Model/User.js");
const Message = require("./Model/Messages.js");
const userRoute = require("./Routes/User.js");
const messageRoute = require("./Routes/Message.js");
const server = http.createServer(app);

require("dotenv").config();

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use(cors());
io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
global.socketServer = io;

app.use(userRoute);
app.use(messageRoute);

User.hasMany(Message, { as: "sentMessages", foreignKey: "senderId" });
User.hasMany(Message, { as: "receivedMessages", foreignKey: "receiverId" });

sequelize
  .sync()
  .then(() => console.log("Database & tables created!"))
  .catch((err) => console.error("Unable to connect to the database:", err));

server.listen(4000);
