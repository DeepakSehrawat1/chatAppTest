const { DataTypes } = require("sequelize");
const sequelize = require("../util/db.js");

const Message = sequelize.define("Message", {
  senderId: DataTypes.INTEGER,
  receiverId: DataTypes.INTEGER,
  text: DataTypes.TEXT,
});

module.exports = Message;
