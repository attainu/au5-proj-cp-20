const express = require("express");
const route = express.Router();
const follow = require("../../Controller/follow_controller");

//Routes for Login Signup
route.get("/all_users", follow.all_users);
route.put("/follow", follow.follow);
route.put("/unfollow", follow.unfollow);
route.post("/search_users", follow.search_users);
route.post("/following", follow.get_following);
route.post("/followers", follow.get_followers);
route.post("/user-profile", follow.user_profile);
route.post("/selected/following", follow.get_selected_following);
route.post("/selected/followers", follow.get_selected_followers);

module.exports = route;
