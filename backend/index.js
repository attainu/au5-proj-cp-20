const express = require('express')
const app = express()
const registerRoute = require('./Routers/login/login')
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//Middlewears for Registrations
app.use('/register/', registerRoute)
//Others
app.listen(process.env.PORT || 3000, console.log("Server runnng "))