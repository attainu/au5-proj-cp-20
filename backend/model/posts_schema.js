const mongoose = require("mongoose");
const userPosts = {};

// text post schema
const textPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  up_count: { type: Number, required: true },
  dw_count: { type: Number, required: true },
  comments: { type: Array, required: true },
});

// text = mongoose.model("text_post", textPostSchema);

// image post schema
const imagePostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image_url: { type: String, required: true },
  up_count: { type: Number, required: true },
  dw_count: { type: Number, required: true },
  comments: { type: Array, required: true },
});

// image = mongoose.model("image_post", imagePostSchema);

// poll schema
const pollSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: { type: String, required: true },
  options: { type: Array, required: true },
  up_count: { type: Number, required: true },
  dw_count: { type: Number, required: true },
  comments: { type: Array, required: true },
});

// poll = mongoose.model("poll", pollSchema);

const usersPostsSchema = new mongoose.Schema({
  email: { type: String, required: true },
  text_post: [textPostSchema],
  image_post: [imagePostSchema],
  poll: [pollSchema],
  date: {
    type: Date,
    default: Date.now,
  },
});

const posts_model = mongoose.model("user_posts", usersPostsSchema);
module.exports = posts_model;
