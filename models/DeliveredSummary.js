const mongoose = require('mongoose')

const RowSchema = new mongoose.Schema({
    estqty: Number,
    item: String,
    total: Number
})

const DeliveredSchema = new mongoose.Schema({
    rows: [RowSchema]
})

const Delivered = mongoose.model('delivered', DeliveredSchema)

module.exports = Delivered;