const mongoose = require('mongoose')
const moment = require('moment')

const AccountSchema = new mongoose.Schema({
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

const Account = mongoose.model('account', AccountSchema)

module.exports = Account;