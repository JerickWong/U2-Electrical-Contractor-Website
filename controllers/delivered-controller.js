const moment = require('moment')
const Delivered = require('../models/DeliveredSummary')

createDelivered = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Delivered',
        })
    }

    const delivered = new Delivered(body)

    if (!delivered) {
        return res.status(400).json({ success: false, error: err })
    }

    delivered
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: delivered._id,
                message: 'Delivered created!',
            })
        })
        .catch(error => {            
            return res.status(400).json({
                error,
                message: 'Delivered not created!',
            })
        })
}

updateDelivered = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Delivered.findOne({ _id: req.params.id }, (err, delivered) => {
        if (err) {            
            return res.status(404).json({
                err,
                message: 'Delivered not found!',
            })
        }
        
        delivered.start = body.start
        delivered.end = body.end
        delivered.rows = body.rows
                
        delivered
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: delivered._id,
                    data: delivered,
                    message: 'Delivered updated!',
                })
            })
            .catch(error => {
                console.log(error)
                return res.status(404).json({
                    error,
                    message: 'Delivered not updated!',
                })
            })
    })
}

deleteDelivered = async (req, res) => {
    await Delivered.findOneAndDelete({ _id: req.params.id }, (err, delivered) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!delivered) {
            return res
                .status(404)
                .json({ success: false, error: `Delivered not found` })
        }

        return res.status(200).json({ success: true, data: delivered })
    }).catch(err => console.log(err))
}

getDeliveredById = async (req, res) => {
    await Delivered.findOne({ _id: req.params.id }, (err, delivered) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!delivered) {
            return res
                .status(404)
                .json({ success: false, error: `Delivered not found` })
        }
        return res.status(200).json({ success: true, data: delivered })
    }).catch(err => console.log(err))
}

getAllDelivered = async (req, res) => {
    await Delivered.find({}, (err, delivereds) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!delivereds.length) {
            return res
                .status(404)
                .json({ success: false, error: `Delivered not found` })
        }
        return res.status(200).json({ success: true, data: delivereds })
    }).catch(err => console.log(err))
}

getDeliveredByProject = async (req, res) => {
    await Delivered.find({ project_name: req.body.project_name }, (err, delivered) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!delivered.length) {
            return res
                .status(404)
                .json({ success: false, error: `Delivered not found` })
        }
        return res.status(200).json({ success: true, data: delivered })
    }).catch(err => console.log(err))
}

module.exports = {
    createDelivered,
    updateDelivered,
    deleteDelivered,
    getAllDelivered,
    getDeliveredById,
}