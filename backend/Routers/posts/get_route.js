const express = require("express");
const route = express.Router();
const userValid = require("../jwt");
const getcontrol = require("../../Controller/getapi");
//Routes for GET REQUEST
route.get("/all", getcontrol.all);
route.get("/comment/text", getcontrol.text);
route.get("/comment/image", getcontrol.image);
route.delete('/delete/text', userValid, getcontrol.deltext)
route.delete('/delete/image', userValid, getcontrol.delimage)

module.exports = route;