const express = require("express");
const app = express();
const registerRoute = require("./Routers/login/login");
const postsRoute = require("./Routers/posts/posts_route");
const main = require("./Routers/main");
const bodyParser = require("body-parser");
//Cros Error
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//For Enviornment
const dotenv = require("dotenv");
dotenv.config();

// BODYPARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//MonogoDB Atlas connection
const mongoose = require("mongoose");
mongoose.connect(
  process.env.ATLAS,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("DB connected");
  }
);
mongoose.connection.on("error", (err) => {
  console.log(err);
});

//Middlewears for Registrations
app.use("/register/", registerRoute);
app.use("/posts/", postsRoute);

//Middlewears After Registrations
app.use("/main/", main);
//Others
app.listen(process.env.PORT || 8000, console.log("Server runnng "));
