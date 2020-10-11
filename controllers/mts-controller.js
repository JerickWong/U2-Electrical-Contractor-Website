const MTS = require('../models/MTS')

createMTS = (req, res) => {
    const body = req.body

    if (!body) {
        console.log(`body ${body}`)
        return res.status(400).json({
            success: false,
            error: 'You must provide a MTS',
        })
    }

    const mts = new MTS(body)

    if (!mts) {
        console.log(`mts ${mts}`)
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
        
        mts.prepared_by = body.prepared_by
        mts.project_name = body.project_name
        mts.MTS_number = body.MTS_number
        mts.delivered_from = body.delivered_from
        mts.total_amount = body.total_amount
        mts.requested_by = body.requested_by
        mts.approved_by = body.approved_by
        mts.takenout_by = body.takenout_by
        mts.received_by = body.received_by
        mts.status = body.status
        mts.date = body.date
        mts.rows = body.rows
                
        mts
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: mts._id,
                    data: mts,
                    message: 'MTS updated!',
                })
            })
            .catch(error => {
                console.log(error)
                console.log("dito")
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

getMTSProjects = async (req, res) => {
    await MTS.distinct('project_name', (err, mts) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!mts) {
            return res
                .status(404)
                .json({ success: false, error: `MTS not found` })
        }
        return res.status(200).json({ success: true, data: mts })
    })
}

getMTSByProject = async (req, res) => {
    if (req.body.status === "All") {

        await MTS.find({ project_name: req.body.project_name }, (err, mts) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }
    
            if (!mts.length) {
                return res
                    .status(404)
                    .json({ success: false, error: `MTS not found` })
            }
            return res.status(200).json({ success: true, data: mts })
        })
    }

    else {

        await MTS.find({ project_name: req.body.project_name, status: req.body.status }, (err, mts) => {
            if (err) {
                return res.status(400).json({ success: false, error: err })
            }
    
            if (!mts.length) {
                return res
                    .status(404)
                    .json({ success: false, error: `MTS not found` })
            }
            return res.status(200).json({ success: true, data: mts })
        })
    }
}

module.exports = {
    createMTS,
    updateMTS,
    deleteMTS,
    getAllMTS,
    getMTSById,
    getMTSByProject,
    getMTSProjects
}