const userModel = require("../model/auth");
var controller = {}
controller.main = async (req, res) => {
    console.log(req.user)
    data = await userModel.signup.findById(req.user)
    res.send(data)
}
module.exports = controller