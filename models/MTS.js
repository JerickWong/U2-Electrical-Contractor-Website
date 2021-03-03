const mongoose = require('mongoose')

const rowSchema = new mongoose.Schema({
    qty: Number,
    description: String,
    price: Number,
    unit: String, 
    brand: String,
    model: String,
    remarks: String,
    total: Number
})

const MTSSchema = new mongoose.Schema({
    requested_by: {
        type: String,
        required: true
    },
    project_name: {
        type: String,
        required: true
    },
    MTS_number: {
        type: Number,
        required: true,
        unique: true
    },
    delivered_from: String,
    total_amount: Number,
    prepared_by: String,
    approved_by: String,
    takenout_by: String,
    received_by: String,
    address: String,
    status: {
        type: String,
        default: "For Approval"
    },
    date: Date,
    date_created: {
        type: Date,
        default: Date.now
    },
    rows: [rowSchema]
    
})

const MTS = mongoose.model('mts', MTSSchema)

module.exports = MTS;