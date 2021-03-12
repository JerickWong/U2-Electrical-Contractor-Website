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
    list_price: Number,
    price_adjustment: Number,
    net_price: Number,
    remarks: String,
})

const SupplierSchema = new mongoose.Schema({
    name: String,
    date_created: {
        type: Date,
        default: Date.now
    },
    items: [itemSchema]
    
})

const Supplier = mongoose.model('supplier', SupplierSchema)

module.exports = Supplier;