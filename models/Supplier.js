const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({    
    unit: {
        type: String,
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    brand_name: String,
    model_name: String,
    list_price: {
        type: Number,
        default: 0
    },
    price_adjustment: {
        type: Number,
        default: 0
    },
    net_price: {
        type: Number,
        default: 0
    },
    remarks: String,
})

const SupplierSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    date_created: {
        type: Date,
        default: Date.now
    },
    items: [itemSchema]
    
})

const Supplier = mongoose.model('supplier', SupplierSchema)

module.exports = Supplier;