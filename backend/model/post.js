const mongoose = require('mongoose');
const textpost = mongoose.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    upvote: [{ _id: false, email: String }],
    dvote: [{ _id: false, email: String }],
    comments: { type: String, required: false }
})
const imagepost = mongoose.Schema({
    title: { type: String, required: true },
    pic: { type: String, required: true },
    upvote: [{ _id: false, email: String }],
    dvote: [{ _id: false, email: String }],
    comments: { type: String, required: false }
})
const pollpost = mongoose.Schema({
    title: { type: String, required: true },
    option: [{ type: String, required: true }],
    upvote: { type: Number, required: false },
    dvote: { type: Number, required: false },
    comments: { type: String, required: false }
})
const main = mongoose.Schema({
    email: { type: String, required: true },
    textposts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'textposts' }],
    imageposts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'imageposts' }],
    pollposts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'imageposts' }]
})
var object = {}
object.textposts = mongoose.model('textposts', textpost)
object.imageposts = mongoose.model('imageposts', imagepost)
object.pollposts = mongoose.model('pollposts', pollpost)
object.main = mongoose.model('userposts', main)
module.exports = object