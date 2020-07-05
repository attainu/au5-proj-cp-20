const express = require("express");
const route = express.Router();
const userValid = require("../jwt");
const getcontrol = require("../../Controller/getapi");
//Routes for GET REQUEST
route.get("/all", getcontrol.all);
route.get("/comment/text", getcontrol.text);
route.get("/comment/image", getcontrol.image);

module.exports = route;
