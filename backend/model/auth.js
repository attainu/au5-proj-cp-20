const mongoose = require("mongoose");
var register = {};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 4,
  },
  email: {
    type: String,
    required: true,
    max: 70,
    min: 4,
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  token: {
    type: String,
    default: "",
  },
  updatedDate: {
    type: Date,
    default: null,
  },
  deletedDate: {
    type: Date,
    default: null,
  },
});
register.signup = mongoose.model("user", userSchema);
module.exports = register;
