const mongoose = require("mongoose");
var register = {};
const { ObjectId } = mongoose.Schema.Types;

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
  username: { type: String, required: false },
  mobile: { type: String, required: false },
  bio: {
    type: String,
    required: false,
  },
  image_url: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  token: {
    type: String,
    default: "",
  },
  followers: [{ type: ObjectId, ref: "user" }],
  following: [{ type: ObjectId, ref: "user" }],
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
