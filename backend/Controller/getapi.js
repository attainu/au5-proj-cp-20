const mongoose = require("mongoose");
const post = require("../model/post");
var getcontrol = {};
// Text post Get API
getcontrol.all = async (req, res) => {
  post.main
    .find()
    .populate("textposts")
    .populate("imageposts")
    .populate("pollposts")
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
    .exec((err, result) => {
      if (err) console.log(err);
      res.json(result);
    });
};

getcontrol.text = async (req, res) => {
  post.textposts
    .find()
    .populate("comments.postedBy", "_id name image_url")
    .populate("postedBy", "_id name image_url")
    .exec((err, result) => {
      if (err) console.log(err);
      res.json(result);
    });
};

getcontrol.image = async (req, res) => {
  post.imageposts
    .find()
    .populate("comments.postedBy", "_id name image_url")
    .populate("postedBy", "_id name image_url")
    .exec((err, result) => {
      if (err) console.log(err);
      res.json(result);
    });
};
getcontrol.delimage = async (req, res) => {
  console.log("s", req.body)
  post.imageposts.findByIdAndRemove({ _id: req.body.id }, function (err, result) {
    if (err) return console.log(err)
    res.json(result)
  })
}
getcontrol.deltext = (req, res) => {
  post.textposts.findByIdAndRemove({ _id: req.body.id }, function (err, result) {
    if (err) return console.log(err)
    res.json(result)
  })
}
module.exports = getcontrol;
