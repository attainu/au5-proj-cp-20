const express = require("express");
const route = express.Router();
const posts = require("../../Controller/posts_controller");

//Routes for Login Signup
route.post("/send", posts.user_post_submit);
route.get("/display", posts.user_post_display);

module.exports = route;
