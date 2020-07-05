const userModel = require("../model/auth");
const post = require("../model/post");
var controller = {};
controller.main = async (req, res) => {
  console.log(req.user);
  data = await userModel.signup.findById(req.user);
  res.send(data);
};
controller.textposts = async (req, res) => {
  console.log("TEXT post");
  var found = await post.main.findOne({ email: req.body.email });
  if (found) {
    console.log("exist");
    let ba = await new post.textposts({
      title: req.body.title,
      text: req.body.text,
      postedBy: req.user._id,
    });
    ba.save();
    found.textposts.push(ba);
    found.save((err, text) => {
      if (err) console.log(err);
      res.json(text);
    });
  } else {
    console.log("NEw");
    let da = await new post.main({ email: req.body.email });
    let ba = await new post.textposts({
      title: req.body.title,
      text: req.body.text,
    });
    ba.save();
    da.textposts.push(ba);
    da.save(function (rest, err) {
      if (err) console.log(err);
      res.json(rest);
    });
  }
};
controller.imageposts = async (req, res) => {
  console.log("IMAGE post");
  const { email, title, pic } = req.body;
  console.log(email, title, pic);

  var found = await post.main.findOne({ email: req.body.email });
  if (found) {
    console.log("exists");
    let ba = await new post.imageposts({
      title: req.body.title,
      pic: req.body.pic,
    });
    ba.save();
    found.imageposts.push(ba);
    found.save((err, result) => {
      if (err) console.log(err);
      res.json(result);
    });
  } else {
    console.log("new Image post");
    let min = await new post.main({ email: req.body.email });
    let img = await new post.imageposts({
      title: req.body.title,
      pic: req.body.pic,
    });
    img.save();
    min.imageposts.push(img);
    min.save(function (err, result) {
      if (err) console.log(err);
      res.json(result);
    });
  }
};
controller.pollposts = async (req, res) => {
  console.log("POLL post");
  var found = await post.main.findOne({ email: req.body.email });
  if (found) {
    console.log("exists");
    let ba = await new post.pollposts({
      title: req.body.title,
      option: req.body.option,
    });
    ba.save();
    found.pollposts.push(ba);
    found.save((err, result) => {
      if (err) console.log(err);
      res.json(result);
    });
  } else {
    console.log("new poll post");
    let min = await new post.main({ email: req.body.email });
    let img = await new post.pollposts({
      title: req.body.title,
      option: req.body.option,
    });
    img.save();
    minpost.pollposts.push(img);
    min.save(function (err, result) {
      if (err) console.log(err);
      res.json(result);
    });
  }
};
controller.upvote_text = async (req, res) => {
  let text = await post.textposts.findById({ _id: req.body.id });
  text.upvote.push({ email: req.body.email });
  text.save(function (err, result) {
    if (err) return res.json(err);
    res.json(result);
  });
};
controller.dvote_text = async (req, res) => {
  let text = await post.textposts.findById({ _id: req.body.id });
  text.dvote.push({ email: req.body.email });
  text.save(function (err, result) {
    if (err) return res.json(err);
    res.json(result);
  });
};
controller.upvote_img = async (req, res) => {
  let img = await post.imageposts.findById({ _id: req.body.id });
  img.upvote.push({ email: req.body.email });
  img.save(function (err, result) {
    if (err) return res.json(err);
    res.json(result);
  });
};
controller.dvote_img = async (req, res) => {
  let img = await post.imageposts.findById({ _id: req.body.id });
  img.dvote.push({ email: req.body.email });
  img.save(function (err, result) {
    if (err) return res.json(err);
    res.json(result);
  });
};

controller.comment_text = async (req, res) => {
  const { user_id, text_id, text } = req.body;
  console.log("data comment", user_id, text_id, text);
  const comment = {
    text: text,
    postedBy: user_id,
  };

  post.textposts
    .findByIdAndUpdate(
      { _id: text_id },
      {
        $push: { comments: comment },
      },
      { new: true }
    )
    .populate("comments.postedBy", "_id name image_url")
    .populate("postedBy", "_id name image_url")
    .exec(function (err, data) {
      // console.log("event:", data);
      console.log("err:", err);
      res.send(data);
    });
};

controller.comment_image = async (req, res) => {
  const { user_id, image_id, text } = req.body;
  const comment = {
    text: text,
    postedBy: user_id,
  };

  post.imageposts
    .findByIdAndUpdate(
      { _id: image_id },
      {
        $push: { comments: comment },
      },
      { new: true }
    )
    .populate("comments.postedBy", "_id name image_url")
    .populate("postedBy", "_id name image_url")
    .exec(function (err, data) {
      // console.log("event:", data);
      console.log("err:", err);
      res.send(data);
    });
};
controller.userposts = async (req, res) => {
  console.log("WWW", req.body);
  post.main
    .find({ email: req.body.email })
    .populate("textposts")
    .populate("imageposts")
    .populate({
      path: "textposts",
      populate: {
        path: "postedBy",
        model: "user",
      },
    })
    .populate({
      path: "imageposts",
      populate: {
        path: "postedBy",
        model: "user",
      },
    })
    .populate({
      path: "imageposts",
      populate: {
        path: "comments",
        populate: {
          path: "postedBy",
          model: "user",
        },
      },
    })
    .populate({
      path: "textposts",
      populate: {
        path: "comments",
        populate: {
          path: "postedBy",
          model: "user",
        },
      },
    })
    .exec((err, result) => {
      if (err) console.log(err);
      let array = [];
      console.log(result);
      result.forEach((el) => {
        array.push(...el.textposts);
        array.push(...el.imageposts);
        array.push(...el.pollposts);
      });
      res.json(array);
    });
};
controller.userdown = async (req, res) => {
  console.log("WWW", req.body);
  post.main
    .find({ email: req.body.email })
    .populate("textposts")
    .populate("imageposts")
    .exec((err, result) => {
      if (err) console.log(err);
      let array = [];
      console.log(result);
      result.forEach((el) => {
        array.push(...el.textposts);
        array.push(...el.imageposts);
        array.push(...el.pollposts);
      });
      let dvote = [];
      array.forEach((el) => {
        if (el.upvote.length - el.dvote.length < 0) {
          dvote.push(el);
        }
      });
      res.json(dvote);
    });
};
controller.userup = async (req, res) => {
  console.log("WWW", req.body);
  post.main
    .find({ email: req.body.email })
    .populate("textposts")
    .populate("imageposts")
    .exec((err, result) => {
      if (err) console.log(err);
      let array = [];
      console.log(result);
      result.forEach((el) => {
        array.push(...el.textposts);
        array.push(...el.imageposts);
        array.push(...el.pollposts);
      });
      let upvote = [];
      array.forEach((el) => {
        if (el.upvote.length - el.dvote.length >= 0) {
          upvote.push(el);
        }
      });
      res.json(upvote);
    });
};
module.exports = controller;
