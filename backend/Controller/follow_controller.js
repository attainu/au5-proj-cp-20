const userModel = require("../model/auth");
const follow = {};

follow.all_users = async (req, res) => {
  const users = await userModel.signup.find({}, function (err, data) {
    res.send(data);
  });
};

follow.search_users = async (req, res) => {
  var search_query = req.body.search_query;
  var pattern = search_query
    .split("")
    .map((x) => {
      return `(?=.*${x})`;
    })
    .join("");
  var regex = new RegExp(`${pattern}`, "g");

  const users = await userModel.signup.find(
    { name: { $regex: regex } },
    function (err, data) {
      res.send(data);
      // console.log(data);
    }
  );
  // userModel.signup
  //   .find({ search_query })
  //   .then((user) => {
  //     res.json({ user });
  //     console.log(user);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

follow.follow = (req, res) => {
  const { logged_user_id, selected_user_id } = req.body;

  const users = userModel.signup.findByIdAndUpdate(
    selected_user_id,
    {
      $push: { followers: logged_user_id },
    },
    {
      new: true,
    },
    (err, result) => {
      if (err) {
        return res.status(422).json({ err: err });
      }
      userModel.signup
        .findByIdAndUpdate(
          logged_user_id,
          {
            $push: { following: selected_user_id },
          },
          { new: true }
        )
        .select("-password")
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          return res.status(422).json({ err: err });
        });
    }
  );
};

follow.unfollow = (req, res) => {
  const { logged_user_id, selected_user_id } = req.body;
  const users = userModel.signup.findByIdAndUpdate(
    selected_user_id,
    {
      $pull: { followers: logged_user_id },
    },
    {
      new: true,
    },
    (err, result) => {
      if (err) {
        return res.status(422).json({ err: err });
      }
      userModel.signup
        .findByIdAndUpdate(
          logged_user_id,
          {
            $pull: { following: selected_user_id },
          },
          { new: true }
        )
        .select("-password")
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          return res.status(422).json({ err: err });
        });
    }
  );
};

follow.get_following = async (req, res) => {
  const { _id } = req.body;
  const users = await userModel.signup
    .find({ _id: _id })
    .populate("following")
    .exec(function (err, data) {
      // console.log("event:", data);
      console.log("err:", err);
      res.send(data);
    });
};

follow.get_followers = async (req, res) => {
  const { _id } = req.body;
  console.log("SURA2:", _id);
  const users = await userModel.signup
    .find({ _id: _id })
    .populate("followers")
    .exec(function (err, data) {
      // console.log("event:", data);
      console.log("err:", err);
      res.send(data);
    });
};

follow.get_selected_following = async (req, res) => {
  const { _id } = req.body;
  const users = await userModel.signup
    .find({ _id: _id })
    .populate("following")
    .exec(function (err, data) {
      console.log("err:", err);
      res.send(data);
    });
};

follow.get_selected_followers = async (req, res) => {
  const { _id } = req.body;
  const users = await userModel.signup
    .find({ _id: _id })
    .populate("followers")
    .exec(function (err, data) {
      console.log("SURA:", data);
      console.log("err:", err);
      res.send(data);
    });
};

follow.user_profile = async (req, res) => {
  const { user_id } = req.body;
  console.log("search id", user_id);
  const users = await userModel.signup
    .find({ _id: user_id })
    .exec(function (err, data) {
      console.log("UP data:", data);
      console.log("err:", err);
      res.send(data);
    });
};

module.exports = follow;
