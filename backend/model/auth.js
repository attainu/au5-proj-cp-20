const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 4
    },
    email: {
        type: String,
        required: true,
        max: 70,
        min: 4
    },
    password: {
        type: String,
        required: true,
        min: 5
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('user', userSchema)