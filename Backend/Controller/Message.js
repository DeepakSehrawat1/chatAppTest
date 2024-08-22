const Message = require("../Model/Messages");
const { io } = require("../app.js");

const postMessage = async (req, res) => {
  try {
    const { senderId, receiverId, text } = req.body;

    const message = await Message.create({ senderId, receiverId, text });
    if (!message) {
      res.status(500).json({ message: "message not send" });
    }
    global.socketServer.emit("newMessage", message); // Broadcast the message to all connected clients
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
};

const getMesaage = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;
    const messages = await Message.findAll({
      where: {
        senderId,
        receiverId,
      },
    });
    if (!messages) {
      res.status(400).json({ message: "message not retrieved" });
    }

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = {
  postMessage,
  getMesaage,
};
