const mongoose = require('mongoose')

const rowSchema = new mongoose.Schema({
    qty: {
        type: Number,
        required: true
    },    
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    unit: String, 
    brand: String,
    model: String,
    remarks: String,
    
})

const MTSSchema = new mongoose.Schema({
    prepared_by: {
        type: String,
        required: true,
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
    requested_by: String,
    approved_by: String,
    takenout_by: String,
    received_by: String,
    status: String,
    date: Date,
    date_created: {
        type: Date,
        default: Date.now
    },
    rows: [rowSchema]
    
})

const MTS = mongoose.model('mts', MTSSchema)

module.exports = MTS;