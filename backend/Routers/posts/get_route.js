const express = require("express");
const route = express.Router();
const userValid = require('../jwt');
const getcontrol = require('../../Controller/getapi')
//Routes for GET REQUEST
route.get('/text', userValid, getcontrol.textpost);
module.exports = route;