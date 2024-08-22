const { Sequelize } = require("sequelize");
require("dotenv").config();

// Initialize Sequelize with your MySQL database
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASS,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

module.exports = sequelize;
