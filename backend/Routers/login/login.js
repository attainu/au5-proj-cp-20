const express = require("express");
const route = express.Router();
const controller = require("../../Controller/loginsignup");

//Routes for Login Signup
route.post("/signup", controller.signup);
route.post("/login", controller.login);
route.post("/reset", controller.reset);
route.post("/update_password", controller.update_password);
route.put("/update_profile", controller.profileUpdate);
route.put("/update_profile_pic", controller.profilePicUpdate);

module.exports = route;
