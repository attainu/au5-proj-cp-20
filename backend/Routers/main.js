const express = require('express')
const route = express.Router()
const userValid = require('./jwt')
route.get('/home', userValid, (req, res) => {
    console.log(req.user)
    res.send(req.user)
})
module.exports = route