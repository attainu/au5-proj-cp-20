const express = require('express')
const route = express.Router()
const controller = require('../Controller/protected')
const userValid = require('./jwt')
route.get('/home', userValid, controller.main)
module.exports = route