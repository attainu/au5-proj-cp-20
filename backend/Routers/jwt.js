const jwt = require('jsonwebtoken')
module.exports = function (req, res, next) {
    const token = req.header('auth-token')
    if (!token) {
        res.status(401).send("Can't Access")
    }
    try {
        const verify = jwt.verify(token, process.env.TOKEN)
        req.user = verify
        next()
    } catch (err) {
        console.log(err)
        res.status(400).send('Invalid Token')
    }
}