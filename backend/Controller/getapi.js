const post = require('../model/post')
var getcontrol = {}
// Text post Get API
getcontrol.all = async (req, res) => {
    post.main.find()
        .populate('textposts').populate('imageposts').populate('pollposts').exec((err, result) => {
            if (err) console.log(err)
            res.json(result)
        })
}
module.exports = getcontrol