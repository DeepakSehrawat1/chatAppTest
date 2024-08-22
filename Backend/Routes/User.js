const express = require("express");

const route = express.Router();
const Register = require("../Controller/Register");
const UserInfo = require("../Controller/UserInfo");

route.post("/signup", Register.signUp);
route.post("/login", Register.login);
route.get("/users", UserInfo.getUser);

module.exports = route;
