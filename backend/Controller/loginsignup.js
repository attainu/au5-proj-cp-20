const userModel = require('../model/auth')
var controller = {}
controller.signup = async (req, res) => {
    let { name, email, password } = req.body
    let user = new userModel({ name, email, password })
    res.send("HElo")
}
module.exports = controller