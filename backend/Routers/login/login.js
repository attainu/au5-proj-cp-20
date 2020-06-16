const express = require('express')
const route = express.Router()
const controller = require('../../Controller/loginsignup')

//Routes for Login Signup 
route.get('/signup', controller.signup)

module.exports = route