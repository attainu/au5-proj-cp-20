const express = require('express')
const route = express.Router()
const controller = require('../../Controller/loginsignup')

//Routes for Login Signup 
route.post('/signup', controller.signup)

module.exports = route