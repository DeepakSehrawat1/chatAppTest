const express = require("express");

const route = express.Router();
const messageController = require("../Controller/Message");
const authenticationMiddleware = require("../Middleware/auth.js");

route.post(
  "/messages",
  authenticationMiddleware.authenticate,
  messageController.postMessage
);

route.get(
  "/messages/:senderId/:receiverId",
  authenticationMiddleware.authenticate,
  messageController.getMesaage
);

module.exports = route;
