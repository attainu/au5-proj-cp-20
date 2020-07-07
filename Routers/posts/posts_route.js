const express = require("express");
const route = express.Router();
const userValid = require("../jwt");
const controller = require("../../Controller/protected");
//Routes POST REQUESTS
route.post("/image", userValid, controller.imageposts);
route.post("/text", userValid, controller.textposts);
route.post("/poll", userValid, controller.pollposts);
route.post("/upvote/text", userValid, controller.upvote_text);
route.post("/dvote/text", userValid, controller.dvote_text);
route.post("/upvote/img", userValid, controller.upvote_img);
route.post("/dvote/img", userValid, controller.dvote_img);
route.put("/comment/text", controller.comment_text);
route.put("/comment/image", controller.comment_image);
route.post('/userposts', userValid, controller.userposts)
route.post('/userup', userValid, controller.userup)
route.post('/userdown', userValid, controller.userdown)
module.exports = route;
controller.comment_image;
