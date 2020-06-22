const postsModel = require("../model/posts_schema");
var posts = {};

posts.user_post_submit = async (req, res) => {
  console.log(req.body);
  let { text_post } = req.body;
  let post_data = await new postsModel({ text_post });
  try {
    let postDataSaved = await post_data.save();
    res.send(postDataSaved);
    console.log("Post data saved");
  } catch (error) {
    console.log(error);
  }
};

posts.user_post_display = async (req, res) => {
  let { email } = req.body;
};

module.exports = posts;
