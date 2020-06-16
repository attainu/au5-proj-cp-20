const express = require('express')
const app = express()
const registerRoute = require('./Routers/login/login')
const bodyParser = require('body-parser')

//For Enviornment 
const dotenv = require('dotenv')
dotenv.config()

// BODYPARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//MonogoDB Atlas connection
const mongoose = require('mongoose');
mongoose.connect(process.env.ATLAS, { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("DB connected")
    })
mongoose.connection.on('error', err => {
    console.log(err);
});

//Middlewears for Registrations
app.use('/register/', registerRoute)

//Others
app.listen(process.env.PORT || 8000, console.log("Server runnng "))