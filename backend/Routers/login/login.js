const express = require('express')
const route = express.Router()
const controller = require('../../Controller/loginsignup')

//Routes for Login Signup 
route.post('/signup', controller.signup)
route.post('/login', controller.login)

module.exports = route