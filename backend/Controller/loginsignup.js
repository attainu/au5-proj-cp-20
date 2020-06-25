const userModel = require("../model/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var controller = {};
var nodemailer = require("nodemailer");

//SignUP Controller
controller.signup = async (req, res) => {
  let { name, email, password } = req.body;
  //Checking if User Already Exists
  let found = await userModel.signup.findOne({ email });
  if (found) return res.send("User already Exists");
  //Hashing Password
  let salt = await bcrypt.genSalt(5);
  const hashed = await bcrypt.hash(password, salt);
  password = hashed;
  //Creating a User
  let user = await new userModel.signup({ name, email, password });
  try {
    let userSaved = await user.save();
    res.send(userSaved);
  } catch (error) {
    console.log(error);
  }
};

//Login Controller
controller.login = async (req, res) => {
  let { email, password } = req.body;
  const user = await userModel.signup.findOne({ email });
  if (user) {
    valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      res.status(400).send("Password not matched");
    } else {
      console.log("user loged in");
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN);
      res.header("auth-token", token).send({ token, user });
    }
  } else {
    res.status(401).send("Email not found");
  }
};

// User Profile update
controller.profileUpdate = async (req, res) => {
  let { email, name, username, mobile, bio, new_email } = req.body;
  console.log(req.body);
  const user = await userModel.signup.update(
    { email },
    {
      name,
      username,
      mobile,
      bio,
      email: new_email,
    },
    function (error, updatedData) {
      res.send(updatedData);
      console.log(updatedData);
    }
  );
};

// Password reset
controller.reset = async (req, res) => {
  console.log("data from frontend", req.body);
  const user = await userModel.signup.findOne(
    { email: req.body.email },
    function (error, userData) {
      var transporter = nodemailer.createTransport({
        // service: 'gmail',//smtp.gmail.com  //in place of service use host...
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "cc09533413fdbc",
          pass: "1fd42b985f6311",
        },
      });
      var currentDateTime = new Date();
      var mailOptions = {
        from: "admin@gmail.com",
        to: req.body.email,
        subject: "Password Reset",
        html:
          "<h1>Welcome To Daily Task Report ! </h1><p>\
        <h3>Hello " +
          userData.name +
          "</h3>\
        If You are requested to reset your password then click on below link<br/>\
        <a href='http://localhost:3000/change-password/" +
          currentDateTime +
          "+++" +
          userData.email +
          "'>Click On This Link</a>\
        </p>",
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          userModel.signup.updateOne(
            { email: userData.email },
            {
              token: currentDateTime,
            },
            { multi: true },
            function (err, affected, resp) {
              return res.status(200).json({
                success: false,
                msg: info.response,
                userlist: resp,
              });
            }
          );
        }
      });
    }
  );
};

// update password
controller.update_password = async (req, res) => {
  const user = await userModel.signup.findOne(
    { email: req.body.email },
    function (errorFind, userData) {
      if (
        userData.token == req.body.linkDate &&
        req.body.password == req.body.confirm_password
      ) {
        bcrypt.genSalt(10, (errB, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            let newPassword = hash;
            let condition = { _id: userData._id };
            let dataForUpdate = {
              password: newPassword,
              updatedDate: new Date(),
            };
            userModel.signup.findOneAndUpdate(
              condition,
              dataForUpdate,
              { new: true },
              function (error, updatedUser) {
                if (error) {
                  if (err.name === "MongoError" && error.code === 11000) {
                    return res
                      .status(500)
                      .json({ msg: "Mongo Db Error", error: error.message });
                  } else {
                    return res.status(500).json({
                      msg: "Unknown Server Error",
                      error: "Unknow server error when updating User",
                    });
                  }
                } else {
                  if (!updatedUser) {
                    return res.status(404).json({
                      msg: "User Not Found.",
                      success: false,
                    });
                  } else {
                    return res.status(200).json({
                      success: true,
                      msg: "Your password are Successfully Updated",
                      updatedData: updatedUser,
                    });
                  }
                }
              }
            );
          });
        });
      }
      if (errorFind) {
        return res.status(401).json({
          msg: "Something Went Wrong",
          success: false,
        });
      }
    }
  );
};
module.exports = controller;
