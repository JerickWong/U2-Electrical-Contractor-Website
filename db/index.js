const mongoose = require('mongoose')

mongoose
    .connect('mongodb://127.0.0.1:27017/MTS', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, autoIndex: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = {connection: mongoose.connection, secretOrKey: "secret"}

module.exports = db