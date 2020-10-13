const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    date_created: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('account', UserSchema)

module.exports = User;