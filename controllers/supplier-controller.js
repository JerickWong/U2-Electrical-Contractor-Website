const Supplier = require('../models/Supplier')

const createSupplier = (req, res) => {
    const body = req.body

    if (!body) {
        console.log(error)
        return res.status(400).json({
            success: false,
            error: 'You must provide a Supplier',
        })
    }

    const supplier = new Supplier(body)

    if (!supplier) {
        console.log(err)
        return res.status(400).json({ success: false, error: err })
    }

    supplier
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: supplier._id,
                message: 'Supplier created!',
            })
        })
        .catch(error => {
            console.log(error)
            return res.status(400).json({
                error,
                message: 'Supplier not created!',
            })
        })
}

const updateSupplier = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Supplier.findOne({ _id: req.params.id }, (err, supplier) => {
        if (err) {            
            return res.status(404).json({
                err,
                message: 'Supplier not found!',
            })
        }
        
        supplier.name = body.name
        supplier.items = body.items
                
        supplier
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: supplier._id,
                    data: supplier,
                    message: 'Supplier updated!',
                })
            })
            .catch(error => {
                console.log(error)
                return res.status(404).json({
                    error,
                    message: 'Supplier not updated!',
                })
            })
    })
}

const deleteSupplier = async (req, res) => {
    await Supplier.findOneAndDelete({ _id: req.params.id }, (err, supplier) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!supplier) {
            return res
                .status(404)
                .json({ success: false, error: `Supplier not found` })
        }

        return res.status(200).json({ success: true, data: supplier })
    }).catch(err => console.log(err))
}

const getSupplierById = async (req, res) => {
    await Supplier.findOne({ _id: req.params.id }, (err, supplier) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!supplier) {
            return res
                .status(404)
                .json({ success: false, error: `Supplier not found` })
        }
        return res.status(200).json({ success: true, data: supplier })
    }).catch(err => console.log(err))
}

const getAllSupplier = async (req, res) => {
    await Supplier.find({}, (err, suppliers) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!suppliers.length) {
            return res
                .status(404)
                .json({ success: false, error: `Supplier not found` })
        }
        return res.status(200).json({ success: true, data: suppliers })
    }).catch(err => console.log(err))
}

module.exports = {
    createSupplier,
    updateSupplier,
    deleteSupplier,
    getAllSupplier,
    getSupplierById,
}