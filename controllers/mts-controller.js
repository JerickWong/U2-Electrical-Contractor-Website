const MTS = require('../models/MTS')

createMTS = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a MTS',
        })
    }

    const mts = new MTS(body)

    if (!mts) {
        return res.status(400).json({ success: false, error: err })
    }

    mts
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: mts._id,
                message: 'MTS created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'MTS not created!',
            })
        })
}

updateMTS = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    MTS.findOne({ _id: req.params.id }, (err, mts) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'MTS not found!',
            })
        }
        mts.pax = body.pax
        mts.po = body.po
        mts.date_created = body.date_created
        mts.last_modified = body.last_modified
        mts.paid_date = body.paid_date
        mts.particulars = body.particulars
        mts.php = body.php
        mts.usd = body.usd
        mts.total = body.total
        mts.prepared_by = body.prepared_by
        mts.approved_by = body.approved_by
        mts.received_by = body.received_by
        mts.recipient = body.recipient
        mts.conversion_rate = body.conversion_rate
        mts.is_cancelled = body.is_cancelled
        
        mts
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: mts._id,
                    message: 'MTS updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'MTS not updated!',
                })
            })
    })
}

deleteMTS = async (req, res) => {
    await MTS.findOneAndDelete({ _id: req.params.id }, (err, mts) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!mts) {
            return res
                .status(404)
                .json({ success: false, error: `mts not found` })
        }

        return res.status(200).json({ success: true, data: mts })
    }).catch(err => console.log(err))
}

getMTSById = async (req, res) => {
    await MTS.findOne({ _id: req.params.id }, (err, mts) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!mts) {
            return res
                .status(404)
                .json({ success: false, error: `MTS not found` })
        }
        return res.status(200).json({ success: true, data: mts })
    }).catch(err => console.log(err))
}

getAllMTS = async (req, res) => {
    await MTS.find({}, (err, mtss) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!mtss.length) {
            return res
                .status(404)
                .json({ success: false, error: `MTS not found` })
        }
        return res.status(200).json({ success: true, data: mtss })
    }).catch(err => console.log(err))
}

module.exports = {
    createMTS,
    updateMTS,
    deleteMTS,
    getAllMTS,
    getMTSById,
}