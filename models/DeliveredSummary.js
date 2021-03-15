const mongoose = require('mongoose')

const RowSchema = new mongoose.Schema({
    estqty: Number,
    item: String,
    total: Number
})

const DeliveredSchema = new mongoose.Schema({
    rows: [RowSchema],
    project_name: String,
    start: Date,
    end: Date,
    dates: [Date]
})

const Delivered = mongoose.model('delivered', DeliveredSchema)

module.exports = Delivered;