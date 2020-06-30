const express = require("express");
const route = express.Router();
const userValid = require('../jwt');
const controller = require("../../Controller/protected");
//Routes POST REQUESTS
route.post("/image", userValid, controller.imageposts);
route.post("/text", userValid, controller.textposts);
route.post("/poll", userValid, controller.pollposts)
module.exports = route;